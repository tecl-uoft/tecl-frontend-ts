import React, { useEffect, useRef, useReducer } from "react";
import { IWebgazer, WebgazerPredictionObject } from "./IWebgazerType";

interface IEyeTrackingAccuracyCheck {
  webgazer: IWebgazer;
}

type HitActionType = {
  type: "hit" | "miss";
};

type HitStateType = {
  hit: number;
  miss: number;
  total: number;
};
const initalHitState = { hit: 0, miss: 0, total: 0 };

function EyeTrackingAccuracyCheck(props: IEyeTrackingAccuracyCheck) {
  const { webgazer } = props;
  const lookTargetRef = useRef<HTMLImageElement>(null);
  const [hitState, hitStateDispatch] = useReducer(
    hitStateReducer,
    initalHitState
  );

  useEffect(() => {
    if (webgazer && lookTargetRef) {
      const lookTargetEl = lookTargetRef.current as HTMLImageElement;
      displayCalibration(webgazer, lookTargetEl, hitStateDispatch);
      return () => {
        webgazer.params.showVideoPreview = false;
        webgazer.end();
      };
    }
  }, [webgazer]);

  return (
    <div className="h-full w-screen">
      <h5 className="text-xl font-bold text-center text-gray-800 mt-8">
        {hitState.total &&  `Accuracy: ${
          Math.round((hitState.hit / hitState.total) * 1000) / 10
        }%`}
      </h5>
      <div className="flex justify-center mt-64">
        <img
          ref={lookTargetRef}
          id="look-target"
          className="cursor-pointer bg-orange-800 h-64"
          style={{ userSelect: "none" }}
          src="/assets/eye_tracking/color_circle.gif"
          alt="rattle"
        />
      </div>
    </div>
  );
}

function hitStateReducer(state: HitStateType, action: HitActionType) {
  switch (action.type) {
    case "hit":
      console.log(state.hit, state.total);
      return { miss: state.miss, hit: state.hit + 1, total: state.total + 1 };
    case "miss":
      return { miss: state.miss + 1, hit: state.hit, total: state.total + 1 };
    default:
      throw new Error();
  }
}

async function displayCalibration(
  webgazer: any,
  lookTargetEl: HTMLImageElement,
  hitStateDispatch: Function
) {
  console.log("look tgt", lookTargetEl);
  webgazer.params.showVideoPreview = true;

  //start the webgazer tracker
  await webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    .setGazeListener(function (data: WebgazerPredictionObject, clock: Date) {
      const targetBox = lookTargetEl.getBoundingClientRect();
      if (
        data &&
        targetBox.left <= data.x &&
        targetBox.right >= data.x &&
        targetBox.top <= data.y &&
        targetBox.bottom >= data.y
      ) {
        hitStateDispatch({ type: "hit" });
      } else if (data) {
        hitStateDispatch({ type: "miss" });
      }

      /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
    })
    .begin();
  webgazer.showPredictionPoints(
    true
  ); /* shows a square every 100 milliseconds where current prediction is */

  // Kalman Filter defaults to on. Can be toggled by user.
  webgazer.applyKalmanFilter = true;
  await webgazer.resume();

  // Set to true if you want to save the data even if you reload the page.
  webgazer.saveDataAcrossSessions = false;

  setTimeout(() => {
    webgazer.pause();
  }, 4000);
}

export default EyeTrackingAccuracyCheck;

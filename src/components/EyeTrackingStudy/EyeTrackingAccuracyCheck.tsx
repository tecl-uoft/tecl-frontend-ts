import React, { useEffect, useRef, useReducer, useState } from "react";
import { IWebgazer, WebgazerPredictionObject } from "./IWebgazerType";
import { useWebgazerCalibration } from "./webgazerHooks";
import StudyNextButton from "../common/StudyNextButton";

interface IEyeTrackingAccuracyCheck {
  webgazer: IWebgazer;
  nextState(): void;
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
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [imgJustify, setImageJustify] = useState("end");
  function switchImgJustify() {
    switch (imgJustify) {
      case "end":
        setImageJustify("start");
        break;
      case "start":
        setImageJustify("center");
        break;
      default:
        props.nextState();
      /* setImageJustify("end"); */
    }
  }

  useWebgazerCalibration(webgazer);
  useEffect(() => {
    const lookTargetEl = lookTargetRef.current as HTMLImageElement;
    displayCalibration(webgazer, lookTargetEl, hitStateDispatch);
    setShowNextBtn(false);
    setTimeout(() => {
      webgazer.pause();
      setShowNextBtn(true);
    }, 4000);
    // eslint-disable-next-line
  }, [imgJustify]);

  useEffect(() => {
    if (webgazer && lookTargetRef) {
      const lookTargetEl = lookTargetRef.current as HTMLImageElement;
      displayCalibration(webgazer, lookTargetEl, hitStateDispatch);
      setShowNextBtn(false);
      setTimeout(() => {
        webgazer.pause();
        setShowNextBtn(true);
      }, 4000);
    }
  }, [webgazer]);

  return (
    <div className="h-full w-screen">
      <h5 className="text-xl font-bold text-center text-gray-800 mt-8">
        {hitState.total &&
          `Accuracy: ${
            Math.round((hitState.hit / hitState.total) * 1000) / 10
          }%`}
      </h5>
      <div className={`flex justify-${imgJustify} mt-64`}>
        <img
          ref={lookTargetRef}
          id="look-target"
          className="cursor-pointer bg-orange-800 h-64"
          style={{ userSelect: "none" }}
          src="/assets/eye_tracking/color_circle.gif"
          alt="rattle"
        />
      </div>
      <div className="container mx-auto">
        {hitState.hit / hitState.total < 0.6 &&
          imgJustify === "center" &&
          showNextBtn &&
          "Your score was below 60%. Please go through the recalibration process again."}
        {showNextBtn && (
          <StudyNextButton
            nextStateFunc={
              hitState.hit / hitState.total < 0.6
                ? switchImgJustify
                : () => true
            }
          />
        )}{" "}
      </div>
    </div>
  );
}

function hitStateReducer(state: HitStateType, action: HitActionType) {
  switch (action.type) {
    case "hit":
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
  //start the webgazer tracker
  webgazer.setGazeListener(function (
    data: WebgazerPredictionObject,
    clock: Date
  ) {
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
  });
  webgazer.showPredictionPoints(
    true
  ); /* shows a square every 100 milliseconds where current prediction is */
  await webgazer.resume();
}

export default EyeTrackingAccuracyCheck;

import React, { useState, useRef, MouseEvent } from "react";
import { WebgazerPredictionObject, IWebgazer } from "./IWebgazerType";
import StudyNextButton from "../common/StudyNextButton";
import { useWebgazerCalibration } from "./webgazerHooks";

interface IEyeTrackingCalibrationProps {
  nextState(): void;
  webgazer: IWebgazer;
}

function EyeTrackingCalibration(props: IEyeTrackingCalibrationProps) {
  const { nextState, webgazer } = props;
  const ROUND_COUNT = 2;
  useWebgazerCalibration(webgazer);

  const [justifyCalRemoveEl, setJustifyCalRemoveEl] = useState("justify-end");
  const [clickColor, setClickColor] = useState(200);
  const [showButton, setShowButton] = useState(false);
  const [calCount, setCalCount] = useState(0);
  const calibrationContainerRef = useRef<HTMLDivElement>(null);

  async function activateWebgazer(event: MouseEvent<HTMLImageElement>) {
    const calibrationContainerEl = calibrationContainerRef.current as HTMLDivElement;
    const claibrationImageEl = event.target as HTMLImageElement;
    claibrationImageEl.classList.remove(`bg-orange-${clickColor - 100}`);

    if (clickColor < 800) {
      setClickColor(clickColor + 100);
      claibrationImageEl.classList.add(`bg-orange-${clickColor}`);
      await webgazer.resume();
    } else {
      await webgazer.pause();
      claibrationImageEl.classList.remove(`bg-orange-800`);
      setClickColor(100);
      calibrationContainerEl.classList.remove(justifyCalRemoveEl);
      let nextJustify = justifyCalRemoveEl;
      switch (justifyCalRemoveEl) {
        case "justify-end":
          nextJustify = "justify-center";
          break;
        case "justify-center":
          nextJustify = "justify-end";
          break;
      }
      setCalCount(calCount + 1);
      calibrationContainerEl.classList.add(nextJustify);
      setJustifyCalRemoveEl(nextJustify);
      if (calCount >= ROUND_COUNT) {
        finishCalibrationRound(calibrationContainerEl);
      }
    }
  }

  function finishCalibrationRound(el: HTMLDivElement) {
    /* el.classList.add("hidden"); */
    setShowButton(true);
  }

  return (
    <div className="h-screen w-screen">
      {/* <canvas id="plotting_canvas" width="100%" height="100%"></canvas> */}
      <div className="flex  justify-end" ref={calibrationContainerRef}>
        <img
          className="cursor-pointer bg-orange-100 rounded-full h-64"
          onClick={activateWebgazer}
          style={{ userSelect: "none" }}
          src="/assets/eye_tracking/color_circle.gif"
          alt="rattle"
        />
      </div>
      {showButton ? (
        <div className="container mx-auto hidden">
          <StudyNextButton nextStateFunc={nextState} />
        </div>
      ) : null}
    </div>
  );
}

async function displayCalibration(webgazer: any) {
  webgazer.params.showVideoPreview = true;

  //start the webgazer tracker
  await webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    .setGazeListener(function (data: WebgazerPredictionObject, clock: Date) {
      //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
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
}

export default EyeTrackingCalibration;

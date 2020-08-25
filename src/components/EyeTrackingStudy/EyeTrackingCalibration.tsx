import React, { useEffect, useState, useRef } from "react";
import { WebgazerPredictionObject, IWebgazer } from "./IWebgazerType";

interface IEyeTrackingCalibrationProps {
  nextState(): void;
  webgazer: IWebgazer;
}

function EyeTrackingCalibration(props: IEyeTrackingCalibrationProps) {
  const { nextState, webgazer } = props;

  const [justifyCalEl, setJustifyCalEl] = useState("justify-start");
  const [justifyCalRemoveEl, setJustifyCalRemoveEl] = useState("justify-end");
  const [calCount, setCalCount] = useState(0);
  const calibrationContainerEl = useRef<HTMLDivElement>(null);

  async function resumeWebgazer() {
    /* await webgazer.resume(); */
    setTimeout(() => {
      const calibrationContainer = calibrationContainerEl.current as HTMLDivElement;
      calibrationContainer.classList.remove(justifyCalRemoveEl);
      calibrationContainer.classList.add(justifyCalEl);
      setJustifyCalEl(justifyCalRemoveEl);
      setJustifyCalRemoveEl(justifyCalEl);
      setCalCount(calCount + 1);
      if (calCount < 10) {
        webgazer.pause()
      } else {
        calibrationContainer.classList.add("hidden");
      }
    }, 5000);
  }

  useEffect(() => {
    if (webgazer) {
      displayCalibration(webgazer);
      console.log(webgazer);
      return () => {
        webgazer.params.showVideoPreview = false;
        webgazer.end();
      };
    }
  }, [webgazer]);

  return (
    <div className="">
      {/* <canvas id="plotting_canvas" width="100%" height="100%"></canvas> */}
      <div className="flex  justify-end mt-64" ref={calibrationContainerEl}>
        <img
          id="rattler-pt1"
          className="cursor-pointer hover:bg-orange-200"
          onClick={() => resumeWebgazer()}
          src="/assets/eye_tracking/rattle.gif"
          alt="rattle"
        />
      </div>
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
  /* webgazer.saveDataAcrossSessions = true; */
}

export default EyeTrackingCalibration;

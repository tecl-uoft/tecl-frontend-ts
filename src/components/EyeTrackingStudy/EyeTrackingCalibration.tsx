import React, { useState, useRef, MouseEvent } from "react";
import { IWebgazer } from "./IWebgazerType";
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
          nextJustify = "justify-start";
          break;
        case "justify-start":
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
    el.classList.add("hidden");
    setShowButton(true);
  }

  return (
    <div className="">
      {/* <canvas id="plotting_canvas" width="100%" height="100%"></canvas> */}
      <div className="flex  justify-end mt-64" ref={calibrationContainerRef}>
        <img
          className="cursor-pointer w-64 bg-orange-100 rounded-full"
          onClick={activateWebgazer}
          style={{ userSelect: "none" }}
          src="/assets/eye_tracking/rattle.gif"
          alt="rattle"
        />
      </div>
      {showButton && (
        <div className="container mx-auto mt-64">
          <StudyNextButton nextStateFunc={nextState} />
        </div>
      )}
    </div>
  );
}

export default EyeTrackingCalibration;

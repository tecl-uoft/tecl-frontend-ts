import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { IWebgazer } from "./IWebgazerType";
import StudyNextButton from "../common/StudyNextButton";
import { displayCalibration } from "./calibrationScript";

interface IEyeTrackingCalibrationProps {
  nextState(): void;
  webgazer: IWebgazer;
}

function EyeTrackingCalibration(props: IEyeTrackingCalibrationProps) {
  const { nextState, webgazer } = props;
  const ROUND_COUNT = 1;

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
    el.classList.add("hidden");
    setShowButton(true);
  }

  useEffect(() => {
    console.log(showButton);
  }, [showButton]);

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
    <div className="h-screen w-screen">
      <div className="flex  justify-end" ref={calibrationContainerRef}>
        <img
          className="cursor-pointer bg-orange-100 rounded-full h-64"
          onClick={activateWebgazer}
          style={{ userSelect: "none" }}
          src="/assets/eye_tracking/dancing_baby.gif"
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

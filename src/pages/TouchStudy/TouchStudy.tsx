import React, { useEffect, useRef, useState } from "react";
import { useElementsReducer } from "./ElementReducer";
import { VideoLinks } from "./videoLinks.json";
import "./touchStudy.css";

function TouchStudy() {
  const touchStudyRef = useRef<HTMLDivElement>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [touchArr, setTouchArr] = useState<any | undefined>(undefined);
  /* const [hiddenElements, setHiddenElements] = useState<{
    right: boolean;
    left: boolean;
    video: boolean;
  }>({ right: true, left: true, video: true }); */
  const [taskOrder, setTaskOrder] = useState({});
  const { elementState, elementDispatch } = useElementsReducer();

  useEffect(() => {
    elementDispatch({ type: "setupTraining", progress: 1, version: "B" });
  }, [elementDispatch]);

  return (
    <div
      ref={touchStudyRef}
      onTouchStart={handleTouchStart(touchArr, setTouchArr)}
      onTouchEnd={handleTouchStart(touchArr, setTouchArr)}
      id="touch-study"
      className="w-screen h-screen bg-gray-200"
    >
      <div
        onTouchEnd={(e) => {}}
        id="left-screen"
        className={`flex flex-col w-full h-full bg-${
          elementState.leftBar.color
        }-600 ${elementState.leftBar.isHidden ? "hidden" : ""}`}
      >
        <div
          id="left-btn"
          className={`justify-center w-16 h-16 m-auto bg-${elementState.leftBar.color}-800 md:w-32 md:h-32 outline`}
        />
      </div>
      <div
        id="middle-screen"
        className={`flex w-full h-full mx-auto bg-gray-200 ${
          elementState.video.isHidden ? "hidden" : ""
        }`}
      >
        <video src={elementState.video.url} id="video" className="my-auto" width="100%">
          <source type="video/mp4" src={elementState.video.url} />
        </video>
      </div>
      <div
        /* onTouchStart={(e) => {
          setVideoURL(
            "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/touchexp/Reward_Haylee_Left_FF.mov"
          );
        }} */
        id="right-screen"
        className={`flex w-full h-full bg-${elementState.rightBar.color}-600 ${
          elementState.rightBar.isHidden ? "hidden" : ""
        }`}
      >
        <div
          id="right-btn"
          className={`justify-center w-16 h-16 m-auto bg-${elementState.rightBar.color}-800 rounded-full md:w-32 md:h-32 outline`}
        />
      </div>
    </div>
  );
}

function handleTouchStart(touchArr: any, setTouchArr: (touchArr: any) => void) {
  return (e: React.TouchEvent<HTMLDivElement>) => {
    const targetEl = e.target;
    let touchType = "start";
    if (e.touches.length === 0) {
      touchType = "end";
    }
    const touchInfo = {
      target: (targetEl as HTMLDivElement).id,
      timestamp: e.timeStamp,
      numTouch: e.touches.length,
      touchType: touchType,
    };
    if (!touchArr) {
      setTouchArr([touchInfo]);
    } else {
      setTouchArr([...touchArr, touchInfo]);
    }

    console.log(touchInfo, touchArr);
  };
}

export default TouchStudy;

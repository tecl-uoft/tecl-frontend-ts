import React, { useEffect, useRef, useState } from "react";
import { useElementsReducer } from "./ElementReducer";
import { VideoLinks } from "./videoLinks.json";

function TouchStudy() {
  const touchStudyRef = useRef<HTMLDivElement>(null);
  const [videoURL, setVideoURL] = useState<string>("");
  const [touchArr, setTouchArr] = useState<any | undefined>(undefined);
  const [hiddenElements, setHiddenElements] = useState<{
    right: boolean;
    left: boolean;
    video: boolean;
  }>({ right: true, left: true, video: true });
  const [taskOrder, setTaskOrder] = useState({});
  const [elementState, ElementDispatch] = useElementsReducer();

  useEffect(() => {
    setVideoURL(VideoLinks.AlexPunishLeft);
  }, []);

  return (
    <div
      ref={touchStudyRef}
      onTouchStart={handleTouchStart(touchArr, setTouchArr)}
      onTouchEnd={handleTouchStart(touchArr, setTouchArr)}
      id="touch-study"
      className="flex w-screen h-screen bg-gray-200"
    >
      <div
        onTouchEnd={(e) => {}}
        id="left-screen"
        className={`flex flex-col w-3/12 h-full bg-orange-600 ${
          hiddenElements.left ? "hidden" : ""
        }`}
      >
        <div
          id="left-btn"
          className="justify-center w-16 h-16 m-auto bg-orange-800 md:w-32 md:h-32 outline"
        />
      </div>
      <div
        id="middle-screen"
        className={`flex w-6/12 h-full mx-auto bg-gray-200 ${
          hiddenElements.video ? "hidden" : ""
        }`}
      >
        <video
          key={videoURL}
          id="video"
          className="my-auto"
          width="100%"
        >
          <source type="video/mp4" src={videoURL} />
        </video>
      </div>
      <div
        onTouchStart={(e) => {
          setVideoURL(
            "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/touchexp/Reward_Haylee_Left_FF.mov"
          );
        }}
        id="right-screen"
        className={`flex w-3/12 h-full bg-green-600 ${
          hiddenElements.right ? "hidden" : ""
        }`}
      >
        <div
          id="right-btn"
          className="justify-center w-16 h-16 m-auto bg-green-800 rounded-full md:w-32 md:h-32 outline"
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

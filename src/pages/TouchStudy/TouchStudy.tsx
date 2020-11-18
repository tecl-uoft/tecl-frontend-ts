import React, { useEffect, useRef, useState } from "react";
import { useElementsReducer } from "./ElementReducer";
import "./touchStudy.css";
import { VideoLinks } from "./videoLinks.json";

function TouchStudy() {
  const touchStudyRef = useRef<HTMLDivElement>(null);
  const [touchArr, setTouchArr] = useState<any | undefined>(undefined);
  const [currentVersion, setCurrentVersion] = useState<"A" | "B">("A");
  const [currentProgress, setCurrentProgress] = useState<0 | 1 | 2 | 3>(0);
  const { elementState, elementDispatch } = useElementsReducer();
  const [finalTouches, setFinalTouches] = useState(0);

  useEffect(() => {
    if (finalTouches === 0) {
      setCurrentVersion("B");
      setCurrentProgress(1);
      elementDispatch({
        type: "setupTraining",
        progress: 1,
        version: currentVersion,
      });
    }
  }, [elementDispatch, currentVersion]);

  useEffect(() => {
    if (finalTouches === 2) {
      console.log("aaaax");
    }
  }, [finalTouches]);

  return (
    <div
      ref={touchStudyRef}
      onTouchStart={handleTouchStart(touchArr, setTouchArr)}
      onTouchEnd={handleTouchStart(touchArr, setTouchArr)}
      id="touch-study"
      className="w-screen h-screen bg-gray-200"
    >
      <div
        onTouchEnd={(e) => {
          if (currentProgress === 3) {
            elementDispatch({
              type: "showVideo",
              url:
                currentVersion === "A"
                  ? VideoLinks.HayleePunishRight
                  : VideoLinks.HayleeRewardLeft,
            });
            setFinalTouches(finalTouches + 1);
          } else {
            elementDispatch({
              type: "showVideo",
            });
          }
        }}
        id="left-screen"
        className={`flex w-full h-full bg-${elementState.leftBar.color}-600 ${
          elementState.leftBar.isHidden ? "hidden" : ""
        }`}
      >
        <div
          id="left-btn"
          className={`justify-center w-16 h-16 m-auto bg-${elementState.leftBar.color}-800 md:w-32 md:h-32 outline`}
        />
      </div>
      <div
        id="middle-screen"
        className={`flex flex-col w-full h-full ${
          elementState.video.isHidden ? "hidden" : ""
        }`}
      >
        <video
          onEnded={(e) => {
            if (currentProgress === 1 || currentProgress === 0) {
              console.log(currentVersion);
              elementDispatch({
                type: "setupTraining",
                progress: 2,
                version: currentVersion,
              });
              setCurrentProgress(2);
            }

            if (currentProgress === 2) {
              elementDispatch({
                type: "setupTraining",
                progress: 3,
                version: currentVersion,
              });
              setCurrentProgress(3);
              console.log(currentProgress);
            }

            if (finalTouches === 2 && currentProgress === 3) {
              elementDispatch({
                type: "setupTraining",
                progress: 1,
                version: "A",
              });
              setCurrentProgress(1);
              setCurrentVersion("A");
            }

            if (finalTouches === 4 && currentProgress === 3) {
              /* setCurrentProgress(1)
              elementDispatch({
                type: "setupExp",
                progress: 1,
                version: currentVersion === "A" ? "B" : "A",
              }); */
            }
          }}
          key={elementState.video.url}
          controls
          id="video"
          className="my-auto"
        >
          <source type="video/mp4" src={elementState.video.url} />
        </video>
      </div>
      <div
        onTouchEnd={(e) => {
          if (currentProgress === 3) {
            elementDispatch({
              type: "showVideo",
              url:
                currentVersion === "A"
                  ? VideoLinks.HayleeRewardLeft
                  : VideoLinks.HayleePunishRight,
            });
            setFinalTouches(finalTouches + 1);
          } else {
            elementDispatch({
              type: "showVideo",
            });
          }
        }}
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

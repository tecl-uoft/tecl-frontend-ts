import React, { useEffect, useRef, useState } from "react";
import { useElementsReducer } from "./ElementReducer";
import "./touchStudy.css";
import { VideoLinks } from "./videoLinks.json";

function TouchStudy() {
  const touchStudyRef = useRef<HTMLDivElement>(null);
  const [touchArr, setTouchArr] = useState<any | undefined>(undefined);
  const [currentVersion, setCurrentVersion] = useState<"A" | "B">("A");
  const [currentType, setCurrentType] = useState<
    "setupTraining" | "setupExpOne"
  >("setupTraining");
  const [currentProgress, setCurrentProgress] = useState<0 | 1 | 2 | 3>(0);
  const { elementState, elementDispatch } = useElementsReducer();
  const [finalTouches, setFinalTouches] = useState(
    process.env.NODE_ENV === "development" ? 0 : 0
  );
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (finalTouches === 0) {
      setCurrentVersion("B");
      setCurrentProgress(1);
      elementDispatch({
        type: "setupTraining",
        progress: 1,
        version: currentVersion,
      });
    } else if (false && finalTouches === 4 && process.env.NODE_ENV === "development") {
      /* setCurrentProgress(3); */
      setCurrentType("setupExpOne");
      elementDispatch({
        type: "setupExpOne",
        progress: 0,
      });
    }
  }, [elementDispatch, currentVersion, finalTouches]);

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
            if (finalTouches === 8) {
              setFinalTouches(9);
              elementDispatch({
                type: "showVideo",
                url: VideoLinks.HayleePunishLeft,
              });
            } else if (finalTouches === 9) {
              setFinalTouches(10);
              elementDispatch({
                type: "showVideo",
                url: VideoLinks.RachelPunishRight,
              });
            } else {
              elementDispatch({
                type: "showVideo",
              });
            }
          }
          if (videoRef.current) {
            videoRef.current.play();
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
        className={`flex flex-col w-full h-full `}
      >
        <video
          ref={videoRef}
          onEnded={(e) => {
            if (currentType === "setupTraining") {
              if (currentProgress === 1 || currentProgress === 0) {
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
                console.log("aa");
                setCurrentType("setupExpOne")
                setCurrentProgress(0);
                elementDispatch({
                  type: "setupExpOne",
                  progress: 0,
                });
              }
            } else if (currentType === "setupExpOne") {
              if (finalTouches === 4) {
                setFinalTouches(5);
                elementDispatch({
                  type: "showVideo",
                  url: VideoLinks.UnfairSnacksB,
                });
              } else if (finalTouches === 5) {
                setFinalTouches(6);
                elementDispatch({
                  type: "showVideo",
                  url: VideoLinks.UnfairToysA,
                });
              } else if (finalTouches === 6) {
                console.log("aaaa12");
                setFinalTouches(7);
                elementDispatch({
                  type: "showVideo",
                  url: VideoLinks.UnfairToysB,
                });
              } else if (finalTouches === 7) {
                setFinalTouches(8);
                elementDispatch({
                  type: "setupExpOne",
                  progress: 1,
                });
              }
            }
          }}
          key={elementState.video.url}
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
            if (finalTouches === 8) {
              setFinalTouches(9);
              elementDispatch({
                type: "showVideo",
                url: VideoLinks.HayleePunishLeft,
              });
            } else if (finalTouches === 9) {
              setFinalTouches(10);
              elementDispatch({
                type: "showVideo",
                url: VideoLinks.RachelPunishRight,
              });
            } else {
              elementDispatch({
                type: "showVideo",
              });
            }
          }
          if (videoRef.current) {
            videoRef.current.play();
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

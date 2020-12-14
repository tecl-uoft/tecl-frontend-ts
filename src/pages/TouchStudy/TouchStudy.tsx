import React, { useEffect, useReducer, useRef, useState } from "react";
import { reducer, initialState, State, Bar } from "./StudyReducer";
import "./touchStudy.css";

function TouchStudy() {
  const [studyState, dispatchStudy] = useReducer(reducer, initialState);
  const [touchArr, setTouchArr] = useState<any | undefined>(undefined);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (studyState.video.url) {
      setCurrentVideoSrc(studyState.video.url);
    }
  }, [studyState.video.url]);

  useEffect(() => {
    if (studyState.currentDispatch.type === "finish") {
      fetch("/api/v1/touch-study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ touchStudy: { trialInformation: studyState } }),
      });
    }
  }, [studyState.currentDispatch.type, studyState]);

  /* Set video src based on what bar was clicked */
  const videoSrcPromise = (bar: Bar) => {
    return new Promise<void>((res, rej) => {
      setCurrentVideoSrc(bar.videoOnClick);
      res();
    });
  };

  const onBarClick = (bar: Bar) => () => {
    videoSrcPromise(bar).then(() => {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.play();
      }
    });
  };

  return (
    <div
      onTouchStart={handleTouchStart(studyState, touchArr, setTouchArr)}
      id="touch-study"
      className="w-screen h-screen bg-gray-200"
    >
      <div
        onTouchEnd={onBarClick(studyState.leftBar)}
        id="left-screen"
        className={`flex w-full h-full bg-${
          studyState?.leftBar.barType === "A" ? "orange" : "green"
        }-600 ${studyState.leftBar.isHidden && "hidden"}`}
      >
        <div
          id="left-btn"
          className={`justify-center w-16 h-16 m-auto bg-${
            studyState.leftBar.barType === "A" ? "orange" : "green"
          }-800 md:w-32 md:h-32 outline`}
        />
      </div>
      <div
        id="middle-screen"
        className={`flex flex-col ${
          studyState.currentDispatch.type === "distribution"
            ? "w-screen h-screen"
            : "w-full h-full"
        }  ${studyState?.video.isHidden ? "hidden" : ""}`}
        style={{
          gridColumn:
            studyState.currentDispatch.type === "distribution"
              ? "first / last"
              : "line2 / line3",
        }}
      >
        <video
          onLoadedMetadata={() => {
            if (studyState.currentDispatch.type === "test") {
              /* Show bars after 3 seconds */
              setTimeout(() => {
                dispatchStudy(studyState.nextDispatch);
              }, 3000);
            }
          }}
          onEnded={(e) => {
            if (studyState.currentDispatch.type === "distribution") {
              dispatchStudy(studyState.nextDispatch);
            }
          }}
          ref={videoRef}
          autoPlay={
            studyState.currentDispatch.type === "distribution" ? true : false
          }
          key={currentVideoSrc}
          id="video"
          className="px-2 my-auto"
        >
          <source type="video/mp4" src={currentVideoSrc} />
        </video>
        <button
          id="next-button"
          className={
            "bg-gray-300 rounded-lg text-md " +
            `${studyState.currentDispatch.type !== "training" ? "" : ""}`
          }
          onClick={() => {
            dispatchStudy(studyState.nextDispatch);
          }}
        >
          Next
        </button>
      </div>
      <div
        onTouchEnd={onBarClick(studyState.rightBar)}
        id="right-screen"
        className={`flex w-full h-full bg-${
          studyState.rightBar.barType === "A" ? "orange" : "green"
        }-600 ${studyState.rightBar.isHidden && "hidden"}`}
      >
        <div
          id="right-btn"
          className={`justify-center w-16 h-16 m-auto bg-${
            studyState.rightBar.barType === "A" ? "orange" : "green"
          }-800 rounded-full md:w-32 md:h-32 outline`}
        />
      </div>
    </div>
  );
}

function handleTouchStart(
  studyState: State,
  touchArr: any,
  setTouchArr: (touchArr: any) => void
) {
  return (e: React.TouchEvent<HTMLDivElement>) => {
    const targetEl = e.target;
    let touchType = "start";
    if (e.touches.length === 0) {
      touchType = "end";
    }
    const touchPosition = Array.from(
      { length: e.targetTouches.length },
      (_, idx) => {
        return {
          x: e.targetTouches.item(idx).clientX,
          y: e.targetTouches.item(idx).clientY,
        };
      }
    );
    console.log(touchArr)
    const touchInfo = {
      target: (targetEl as HTMLDivElement).id,
      timestamp: Math.round(e.timeStamp) / 1000,
      numTouches: e.touches.length,
      touchType: touchType,
      trialType: {
        trialNum: studyState.currentDispatch.trial,
        trialType: studyState.currentDispatch.type,
      },
      touchPosition,
      currentVideo: studyState.video.url ? studyState.video.url.substr(66) : "",
    };
    if (!touchArr) {
      setTouchArr([touchInfo]);
    } else {
      setTouchArr([...touchArr, touchInfo]);
    }
  };
}

export default TouchStudy;

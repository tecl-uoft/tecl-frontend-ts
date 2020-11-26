import React, { useReducer, useRef } from "react";
import { reducer, initialState } from "./StudyReducer";
import "./touchStudy.css";

function TouchStudy() {
  const [studyState, dispatchStudy] = useReducer(reducer, initialState);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onBarClick = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.play();
    }
  };

  return (
    <div id="touch-study" className="w-screen h-screen bg-gray-200">
      <div
        onTouchEnd={onBarClick}
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
          onLoad={(e) => {
            console.log(e);
          }}
          onEnded={(e) => {
            if (studyState) {
            }
          }}
          onTouchEnd={(e) => {
            if (
              studyState.currentDispatch.type === "distribution" ||
              studyState.currentDispatch.type === "test"
            ) {
              e.currentTarget.play();
            }
          }}
          ref={videoRef}
          key={studyState?.video.url}
          id="video"
          className="px-2 my-auto"
        >
          <source type="video/mp4" src={studyState?.video.url} />
        </video>
        <button
          className="bg-gray-400"
          onClick={() => {
            dispatchStudy(studyState.nextDispatch);
          }}
        >
          Next
        </button>
      </div>
      <div
        onTouchEnd={onBarClick}
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

export default TouchStudy;

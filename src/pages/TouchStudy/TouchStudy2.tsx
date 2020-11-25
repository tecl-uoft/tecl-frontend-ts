import React, { useEffect, useRef, useState } from "react";
import { useStudyReducer, Action, State } from "./StudyReducer";
import "./touchStudy.css";

function TouchStudy() {
  const [studyReduceState, studyDispatch] = useStudyReducer();
  const [studyState, setStudyState] = useState<State | undefined>(undefined);
  const [studyAction, setStudyAction] = useState<Action>({
    type: "training",
    trial: 1,
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  /* Set inital config */
  /*  useEffect(() => {
    studyDispatch({ type: "training", trial: 1 });
  }, [studyDispatch]); */
  useEffect(() => {
    studyDispatch(studyAction);
  }, [studyAction, studyDispatch]);

  /* Update local state when reducer changes */
  useEffect(() => {
    setStudyState(studyReduceState);
  }, [studyReduceState]);

  const onBarClick = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.play();
    }
  };

  return (
    <div
      /* onTouchStart={}
      onTouchEnd={} */
      id="touch-study"
      className="w-screen h-screen bg-gray-200"
    >
      <div
        onTouchEnd={onBarClick}
        id="left-screen"
        className={`flex w-full h-full bg-${
          studyState?.leftBar.barType === "A" ? "orange" : "green"
        }-600 ${studyState?.leftBar.isHidden && "hidden"}`}
      >
        {console.log(studyState)}
        <div
          id="left-btn"
          className={`justify-center w-16 h-16 m-auto bg-${
            studyState?.leftBar.barType === "A" ? "orange" : "green"
          }-800 md:w-32 md:h-32 outline`}
        />
      </div>
      <div
        id="middle-screen"
        className={`flex flex-col w-full h-full ${
          studyState?.video.isHidden ? "hidden" : ""
        }`}
      >
        <video
          onEnded={(e) => {
            if (studyState) {
                setStudyAction({ type: "training", trial: 2 })
              /* studyDispatch({ type: "training", trial: studyAction.trial + 1 }); */
            }
          }}
          ref={videoRef}
          key={studyState?.video.url}
          id="video"
          className="my-auto"
        >
          <source type="video/mp4" src={studyState?.video.url} />
        </video>
      </div>
      <div
        onTouchEnd={onBarClick}
        id="right-screen"
        className={`flex w-full h-full bg-${
          studyState?.rightBar.barType === "A" ? "orange" : "green"
        }-600 ${studyState?.rightBar.isHidden && "hidden"}`}
      >
        <div
          id="right-btn"
          className={`justify-center w-16 h-16 m-auto bg-${
            studyState?.rightBar.barType === "A" ? "orange" : "green"
          }-800 rounded-full md:w-32 md:h-32 outline`}
        />
      </div>
    </div>
  );
}

export default TouchStudy;

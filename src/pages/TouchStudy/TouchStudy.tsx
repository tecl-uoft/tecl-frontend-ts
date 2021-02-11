import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  reducer,
  initialState,
  State,
  Bar,
  ITouchStudySetup,
} from "./StudyReducer";
import "./touchStudy.css";

function TouchStudy() {
  const [studyState, dispatchStudy] = useReducer(reducer, initialState);
  const [touchArr, setTouchArr] = useState<any | undefined>(undefined);
  const [currentVideoSrc, setCurrentVideoSrc] = useState("");
  const [manualMode, setManualMode] = useState(false);

  const defaultSetup: ITouchStudySetup = {
    leftPanel: "orange",
    orangePanelValance: "positive",
    fairOrder: "first",
    fairActor: "A",
  };
  const [studySetup, setStudySetup] = useState<ITouchStudySetup>(defaultSetup);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("mode") === "manual") {
      setManualMode(true);
    } else {
      fetch("/api/v1/touch-study/setup", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((getSetup) => {
          setStudySetup(getSetup);
        });
    }
  }, []);

  useEffect(() => {
    if (studyState.video.url) {
      setCurrentVideoSrc(studyState.video.url);
    }
  }, [studyState.video.url]);

  useEffect(() => {
    if (touchArr && studyState.currentDispatch.type === "finish") {
      fetch("/api/v1/touch-study", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ touchStudy: { trialInformation: touchArr } }),
      });
    }
  }, [studyState.currentDispatch.type, touchArr]);

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

  const onVideoEnded = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (
      studyState.currentDispatch.type === "distribution" ||
      studyState.currentDispatch.type === "test"
    ) {
      dispatchStudy(studyState.nextDispatch);
    }
  };

  const onVideoLoadedMetaData = () => {
    if (
      studyState.currentDispatch.type === "test" &&
      studyState.currentDispatch.trial % 2 === 1
    ) {
      /* Show bars after 3 seconds */
      setTimeout(() => {
        dispatchStudy(studyState.nextDispatch);
      }, 3000);
    }
  };

  const onVideoTouchStart = (e: React.TouchEvent<HTMLVideoElement>) => {
    if (studyState.currentDispatch.type === "distribution") {
      e.currentTarget.play();
    }
  };

  const onNextBtnClick = () => {
    if (!studyState.studySetup) {
      new Promise((res, _) => {
        res(
          dispatchStudy({ type: "setup", trial: -1, studySetup: studySetup })
        );
      }).then(() => {
        dispatchStudy(studyState.nextDispatch);
      });
    } else {
      dispatchStudy(studyState.nextDispatch);
    }
  };

  const handleLeftPanelSettingChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const leftPanel = e.currentTarget.value;
    if (leftPanel !== "orange" && leftPanel !== "green") {
      return;
    }
    setStudySetup({ ...studySetup, leftPanel });
  };

  const handleValanceSettingChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const orangePanelValance = e.currentTarget.value;
    if (
      orangePanelValance !== "positive" &&
      orangePanelValance !== "negative"
    ) {
      return;
    }
    setStudySetup({ ...studySetup, orangePanelValance });
  };

  const handleFairClipSettingChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const fairOrder = e.currentTarget.value;
    if (fairOrder !== "first" && fairOrder !== "second") {
      return;
    }
    setStudySetup({ ...studySetup, fairOrder });
  };
  const handleActorSettingChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const fairActor = e.currentTarget.value;
    if (fairActor !== "A" && fairActor !== "B") {
      return;
    }
    setStudySetup({ ...studySetup, fairActor });
  };

  return (
    <div
      onTouchStart={handleTouchStart(studyState, touchArr, setTouchArr)}
      id="touch-study"
      className="bg-gray-200"
    >
      <div
        onTouchEnd={onBarClick(studyState.leftBar)}
        id="left-screen"
        className={`flex ${
          studyState?.leftBar.barType === "orange"
            ? "bg-orange-600"
            : "bg-green-600"
        } ${studyState.leftBar.isHidden && "hidden"}`}
      >
        <div
          id="left-btn"
          className={`justify-center w-16 h-16 m-auto ${
            studyState.leftBar.barType === "orange"
              ? "bg-orange-800 rounded-full" /* Orange Circle */
              : "bg-green-800 rounded-md" /* Green Square */
          } md:w-32 md:h-32 outline`}
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
        {manualMode && studyState.currentDispatch.trial === 0 && (
          <div className="flex flex-col space-y-6">
            <h2 className="mt-12 text-xl text-center">
              Manul Mode: <br /> Please choose your specfic condition.
            </h2>
            <div className="flex flex-col justify-between mt-24 space-y-4">
              <label className="block">
                <span className="text-gray-700">Left Panel</span>
                <select
                  onChange={handleLeftPanelSettingChange}
                  value={studySetup.leftPanel}
                  className="block w-full p-2 mt-1 rounded-sm form-select"
                >
                  <option value="orange">Orange Circle</option>
                  <option value="green">Green Square</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Orange panel valence</span>
                <select
                  onChange={handleValanceSettingChange}
                  value={studySetup.orangePanelValance}
                  className="block w-full p-2 mt-1 form-select"
                >
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                </select>
              </label>
            </div>
            <div className="flex flex-col justify-between mt-16 space-y-4">
              <label className="block">
                <span className="text-gray-700">
                  Order of fair/unfair clips
                </span>
                <select
                  onChange={handleFairClipSettingChange}
                  value={studySetup.fairOrder}
                  className="block w-full p-2 mt-1 form-select"
                >
                  <option value="first">Fair Clips First</option>
                  <option value="second">Unfair Clips First</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Fair actor identity</span>
                <select
                  onChange={handleActorSettingChange}
                  value={studySetup.fairActor}
                  className="block w-full p-2 mt-1 form-select"
                >
                  <option value="A">Actor A</option>
                  <option value="B">Actor B</option>
                </select>
              </label>
            </div>
          </div>
        )}
        <video
          onLoadedMetadata={onVideoLoadedMetaData}
          onEnded={onVideoEnded}
          ref={videoRef}
          autoPlay={
            studyState.currentDispatch.type === "distribution" ? true : false
          }
          onTouchStart={onVideoTouchStart}
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
          onClick={onNextBtnClick}
        >
          Next
        </button>
      </div>
      <div
        onTouchEnd={onBarClick(studyState.rightBar)}
        id="right-screen"
        className={`flex ${
          studyState.rightBar.barType === "orange"
            ? "bg-orange-600"
            : "bg-green-600"
        } ${studyState.rightBar.isHidden && "hidden"}`}
      >
        <div
          id="right-btn"
          className={`justify-center w-16 h-16 m-auto ${
            studyState.rightBar.barType === "orange"
              ? "bg-orange-800 rounded-full" /* Orange Circle */
              : "bg-green-800 rounded-md" /* Green Square */
          }  md:w-32 md:h-32 outline`}
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
    const target = (targetEl as HTMLDivElement).id;
    let barType = "";
    if (target === "right-screen" || target === "right-btn") {
      barType = studyState?.rightBar.barType === "orange" ? "Punish" : "Reward";
    } else if (target === "left-screen" || target === "left-btn") {
      barType = studyState?.leftBar.barType === "orange" ? "Punish" : "Reward";
    }
    /* console.log(touchArr); */

    const touchInfo = {
      target,
      timestamp: Math.round(e.timeStamp) / 1000,
      numTouches: e.touches.length,
      touchType: touchType,
      trialType: {
        trialNum: studyState.currentDispatch.trial,
        trialType: studyState.currentDispatch.type,
      },
      barType,
      touchPosition,
      currentVideo: studyState.video.url ? studyState.video.url.substr(66) : "",
      studySetup: studyState.studySetup
    };
    if (!touchArr) {
      setTouchArr([touchInfo]);
    } else {
      console.log(studyState.video.url.substr(66));
      setTouchArr([...touchArr, touchInfo]);
    }
  };
}

export default TouchStudy;

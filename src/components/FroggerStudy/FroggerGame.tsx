import React, { useState } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { useEffect } from "react";
import streamRecorder from "./streamRecorder";
import StudyTitleText from "../common/StudyTitleText";

interface IFroggerGameProps {
  nextState(): void;
}

function FroggerGame(props: IFroggerGameProps) {
  
  const timerStartTime = {
    minutes: 7,
    seconds: 0,
  };

  const [timerSec, setTimerSec] = useState(timerStartTime.seconds);
  const [timerMin, setTimerMin] = useState(timerStartTime.minutes);
  const [timeOver, setTimeOver] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loadingProgress === 1) {
      setTimeout(() => {
        if (timerSec === 0 && timerMin > 0) {
          setTimerSec(59);
          setTimerMin(timerMin - 1);
        } else if (timerSec > 0) {
          setTimerSec(timerSec - 1);
        } else if (timerSec === 0 && timerMin === 0) {
          setTimeOver(true);
        }
      }, 1000);
    }
  }, [timerSec, timerMin, loadingProgress]);

  useEffect(() => {
    if (loadingProgress === 1) {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement;
      streamRecorder(canvas, 2000);
    }
  }, [loadingProgress]);

  const { nextState } = props;
  const unityContent = new UnityContent(
    "/scripts/unity/Frogger_RealGame_v5.json",
    "/scripts/unity/UnityLoader.js"
  );
  unityContent.on("progress", (progression: number) => {
    setLoadingProgress(progression);
  });

  return (
    <div className="container mt-6 mx-auto px-2 pt-4 mb-16">
      <StudyTitleText text={"Complete the objective as shown."} />
      <h4 className="text-2xl text-center text-gray-800 mb-4 mt-4">
        You have:{" "}
        <b className="bold">
          {" "}
          {`${timerMin}:${
            timerSec > 9 ? timerSec : "0" + timerSec
          }`} minutes{" "}
        </b>{" "}
        remaining.
      </h4>
      {loadingProgress !== 1 ? (
        <div>{`Loading ${Math.floor(loadingProgress * 100)} percent...`}</div>
      ) : null}
      {!timeOver ? (
        <Unity unityContent={unityContent} />
      ) : (
        <div className="text-6xl text-center text-gray-800 bg-gray-500 py-64 rounded-lg">
          {" "}
          Time is up!{" "}
        </div>
      )}
      <div className="flex justify-around mt-6">
        {timeOver ? (
          <button
            onClick={() => nextState()}
            className="bg-orange-200 hover:bg-orange-400 font-bold w-full rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default FroggerGame;

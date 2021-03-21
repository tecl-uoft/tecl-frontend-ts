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
  const [isMod, setIsMod] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const pathString = window.location.pathname;
    if (pathString.includes("/mod")) {
      setIsMod(true);
    }

    if (loadingProgress === 1 && !pathString.includes("/mod")) {
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

  useEffect(() => {
    const oldLog = window.console.log;
    window.console = {
      ...window.console,
      log: function (msg: string) {
        if (msg) {
          try {
            let coordArr = msg.split(" -- ");
            if (coordArr.length === 4) {
              if (coordArr[3].includes("imitate")) {
                coordArr[3] = "imitate";
              } else if (coordArr[3].includes("explore")) {
                coordArr[3] = "explore";
              } else {
                coordArr[3] = "";
              }
            }
          } catch (e) {
            oldLog(e);
          }
        }
      },
    };
    return () => {
      window.console = {
        ...window.console,
        log: oldLog,
      };
    };
  }, []);

  const { nextState } = props;

  const unityContent = new UnityContent(
    "/scripts/frogger_real_2/FunctioningBuild_3.19.21.json",
    "/scripts/frogger_real_2/UnityLoader.js"
  );
  unityContent.on("progress", (progression: number) => {
    setLoadingProgress(progression);
  });

  unityContent.on("GameOver", function (x: any, y: any, time: any, area: any) {
    setTimerSec(0);
    setTimerMin(0);
    setTimeOver(true);
  });

  return (
    <div className="container px-2 pt-4 mx-auto mt-6 mb-16">
      <StudyTitleText text={"Complete the objective as shown."} />
      {!isMod && <h4 className="mt-4 mb-4 text-2xl text-center text-gray-800">
        You have:{" "}
        <b className="bold">
          {" "}
          {`${timerMin}:${
            timerSec > 9 ? timerSec : "0" + timerSec
          }`} minutes{" "}
        </b>{" "}
        remaining.
      </h4>}
      {loadingProgress !== 1 ? (
        <div>{`Loading ${Math.floor(loadingProgress * 100)} percent...`}</div>
      ) : null}
      {!timeOver ? (
        <div className="px-32">
          <Unity unityContent={unityContent} />
        </div>
      ) : (
        <div className="py-64 text-6xl text-center text-gray-800 bg-gray-500 rounded-lg">
          {" "}
          Time is up!{" "}
        </div>
      )}
      <div className="flex justify-around mt-6">
        {timeOver ? (
          <button
            onClick={() => nextState()}
            className="w-full px-8 py-4 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default FroggerGame;

import React, { useState } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import { useEffect } from "react";
import streamRecorder from "./streamRecorder";
import StudyTitleText from "../common/StudyTitleText";
import { IFroggerParticipant, IFroggerResponse } from "./FroggerStudy";
import { DateTime } from "luxon";

interface IFroggerGameProps {
  nextState(): void;
  setPlayerMovements?: React.Dispatch<React.SetStateAction<string[][]>>;
  participant?: IFroggerParticipant;
  setResponse: React.Dispatch<React.SetStateAction<IFroggerResponse>>;
  webcamStartTime?: number;
}

const FroggerGame: React.FC<IFroggerGameProps> = ({
  nextState,
  setPlayerMovements,
  participant,
  setResponse,
  webcamStartTime,
}) => {
  const timerStartTime = {
    minutes: 7,
    seconds: 2,
  };

  const [timerSec, setTimerSec] = useState(timerStartTime.seconds);
  const [timerMin, setTimerMin] = useState(timerStartTime.minutes);
  const [timeOver, setTimeOver] = useState(false);
  const [unityContent, setUnityContent] = useState<UnityContent>();
  const [isMod, setIsMod] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
    startTime: number;
  }>();
  const [fruits, setFruits] = useState({
    cherry: 0,
    pinapple: 0,
    watermelon: 0,
    orange: 0,
  });

  useEffect(() => {
    // const pathString = window.location.pathname;
    // const IS_TIME_STOPPED = true
    // if (pathString.includes("/mod")) {
     // setIsMod(IS_TIME_STOPPED);
    // }
    // const countDownTimer = !pathString.includes("/mod") && !IS_TIME_STOPPED
    if (loadingProgress === 1 ) {
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
      const canvas = document.querySelector<HTMLCanvasElement>("canvas");
      window.scrollTo(0, window.innerHeight)
      if (canvas) {
        streamRecorder(canvas, 0).then((res) => setMediaRecorder(res));
      }
    }
  }, [loadingProgress, isMod]);

  useEffect(() => {
    const oldLog = window.console.log;
    window.console = {
      ...window.console,
      log: function (msg: string) {
        if (msg) {
          try {
            let coordArr = msg.split(" -- ");
            if (coordArr.length >= 4) {
              if (coordArr[3].includes("imitate")) {
                coordArr[3] = "imitate";
              } else if (coordArr[3].includes("explore")) {
                coordArr[3] = "explore";
              } else {
                coordArr[3] = "none";
              }
              if (setPlayerMovements) {
                setPlayerMovements((o) => [...o, coordArr.slice(0, 4)]);
              }
            }
          } catch (e) {
            oldLog(msg);
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
  }, [setPlayerMovements]);

  useEffect(() => {
    const urlParas = new URLSearchParams(window.location.search)
    const part_type = urlParas.get("p_type") || urlParas.get("type") ||  "child"
    const build =
      part_type === "adult"
        ? "/scripts/FroggerAdult_Arnav_5.17.21/Build/FroggerAdult_Arnav_5.17.21.json"
        : "/scripts/FroggerChild_Arnav_5.17.21/Build/FroggerChild_Arnav_5.17.21.json";

    const loader =
      part_type === "adult"
        ? "/scripts/FroggerAdult_Arnav_5.17.21/Build/UnityLoader.js"
        : "/scripts/FroggerChild_Arnav_5.17.21/Build/UnityLoader.js";

    const unityContent = new UnityContent(build, loader);
    unityContent.on("progress", (progression: number) => {
      setLoadingProgress(progression);
    });

    unityContent.on("GotCherry", () => {
      setFruits((f) => ({ ...f, cherry: f.cherry + 1 }));
    });
    unityContent.on("GotPinapple", () => {
      setFruits((f) => ({ ...f, pinapple: f.pinapple + 1 }));
    });
    unityContent.on("GotWatermelon", () => {
      setFruits((f) => ({ ...f, watermelon: f.watermelon + 1 }));
    });
    unityContent.on("GotOrange", () => {
      setFruits((f) => ({ ...f, orange: f.orange + 1 }));
    });

    unityContent.on("GameOver", () => {
      setTimerSec(0);
      setTimerMin(0);
      setTimeOver(true);
    });

    setUnityContent(unityContent);
  }, [participant]);

  const onNextClick = () => {
    if (mediaRecorder && mediaRecorder.mediaRecorder) {
      mediaRecorder.mediaRecorder.stop();
    }
    setResponse((r) => {
      r.fruits = fruits;
      if (webcamStartTime && mediaRecorder?.startTime) {
        const webcamStartTimeLuxon = DateTime.fromMillis(webcamStartTime);
        const currVideoEndLuxon = DateTime.fromMillis(Date.now());
        const currVideoStartLuxon = DateTime.fromMillis(
          mediaRecorder.startTime
        );
        r.realGameWebcamInfo = {
          startTime: currVideoStartLuxon
            .diff(webcamStartTimeLuxon)
            .toFormat("HH:mm:ss:SSS"),
          endTime: currVideoEndLuxon
            .diff(webcamStartTimeLuxon)
            .toFormat("HH:mm:ss:SSS"),
        };
      }
      return r;
    });
    nextState();
  };

  return (
    <div className="px-2 pt-4 mx-auto mt-6" id="frogger-game">
      {!isMod && !timeOver && (
        <StudyTitleText text={"Complete the objective as shown."} />
      )}
      {!timeOver && (
        <h4 className="mt-4 mb-4 text-2xl text-center text-gray-800">
          You have:{" "}
          <b className="bold">
            {" "}
            {`${timerMin}:${
              timerSec > 9 ? timerSec : "0" + timerSec
            }`} minutes{" "}
          </b>{" "}
          remaining.
        </h4>
      )}

      {loadingProgress !== 1 ? (
        <div className="w-full py-2 text-2xl font-bold text-center bg-red-300">{`Loading ${Math.floor(loadingProgress * 100)} percent...`}</div>
      ) : null}
      {(!timeOver ) && unityContent ? (
        <div onClick={() => window.scrollTo(0, window.innerHeight)} className="mx-16 mx-auto md:mx-32">
          <Unity unityContent={unityContent} />
        </div>
      ) : (
        <div className="py-64 text-6xl text-center text-gray-800 bg-gray-500 rounded-lg">
          {" "}
          Game Completed!{" "}
        </div>
      )}

      <div className="flex justify-around mt-2">
        {timeOver ? (
          <button
            onClick={onNextClick}
            className="w-full px-8 py-4 my-6 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 "
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default FroggerGame;

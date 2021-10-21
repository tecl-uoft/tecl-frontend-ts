import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import StudyTitleText from "../common/StudyTitleText";
import { IFroggerResponse } from "./FroggerStudy";
import streamRecorder from "./streamRecorder";

interface IFroggerPracticeProps {
  nextState(): void;
  webcamStartTime?: number;
  setResponse?: React.Dispatch<React.SetStateAction<IFroggerResponse>>;
}

const FroggerPractice: React.FC<IFroggerPracticeProps> = ({
  nextState,
  webcamStartTime,
  setResponse,
}) => {
  const [gameOver, setGameOver] = useState(false);
  const [isMod, setIsMod] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [unityContent, setUnityContent] = useState<UnityContent>();
  const [mediaRecorder, setMediaRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
    startTime: number;
  }>();

  useEffect(() => {
    if (!window.location.pathname.includes("mod")) {
      setIsMod(false);
    }

    const unityContent = new UnityContent(
      "/scripts/Frogger_Practice_5.7.21/Frogger_Practice_5.7.21.json",
      "/scripts/Frogger_Practice_5.7.21/UnityLoader.js"
    );
    unityContent.on("progress", (progression: number) => {
      setLoadingProgress(progression);
    });
    unityContent.on("GameOver", () => {
      setGameOver(true);
      window.scrollTo(0, document.body.scrollHeight);
    });
    setUnityContent(unityContent);
  }, []);

  useEffect(() => {
    if (loadingProgress !== 1) return;

    // async function startCapture(displayMediaOptions: any) {
    //   let captureStream = null;

    //   try {
    //     // @ts-ignore
    //     captureStream = await navigator.mediaDevices.getDisplayMedia(
    //       displayMediaOptions
    //     );
    //   } catch (err) {
    //     console.error("Error: " + err);
    //   }
    //   return captureStream;
    // }
    // startCapture({
    //   video: true,
    //   audio: true,
    // });
    window.scrollTo(0, window.innerHeight)
    const canvas = document.querySelector<HTMLCanvasElement>("canvas");
    if (canvas) {
      streamRecorder(canvas, 0).then((res) => setMediaRecorder(res));
    }
  }, [loadingProgress]);

  const onNextClick = () => {
    if (mediaRecorder && mediaRecorder.mediaRecorder) {
      mediaRecorder.mediaRecorder.stop();
    }
    if (setResponse && webcamStartTime && mediaRecorder?.startTime) {
      setResponse((r) => {
        if (webcamStartTime && mediaRecorder?.startTime) {
          const webcamStartTimeLuxon = DateTime.fromMillis(webcamStartTime);
          const currVideoEndLuxon = DateTime.fromMillis(Date.now());
          const currVideoStartLuxon = DateTime.fromMillis(
            mediaRecorder.startTime
          );
          r.practiceWebcamInfo = {
            startTime: currVideoStartLuxon
              .diff(webcamStartTimeLuxon)
              .toFormat("hh:mm:ss:SSS"),
            endTime: currVideoEndLuxon
              .diff(webcamStartTimeLuxon)
              .toFormat("hh:mm:ss:SSS"),
          };
        }
        return r;
      });
    }
    nextState();
  };

  return (
    <div className="px-2 pt-4 mx-auto mb-4">
      <StudyTitleText
        text={"Before starting, let's get familiar with the game..."}
      />

      <h2 className="container py-2 mx-auto mb-5 text-2xl font-bold text-center bg-red-200">
        You much complete the practice (find the trophy) in order to continue.
      </h2>
      <h4 className="mt-6 mb-2 text-2xl text-center text-gray-800">
        Use the{" "}
        <img
          src="/assets/arrow_keys.png"
          alt="arrow"
          className="inline h-20 mx-2 -mt-4"
        />{" "}
        keys to move around.
      </h4>
      {loadingProgress !== 1 ? (
        <div className="py-4 text-2xl text-center bg-red-400">{`Loading ${Math.floor(
          loadingProgress * 100
        )} percent...`}</div>
      ) : null}
      {unityContent && (
        <div
          onClick={() => window.scrollTo(0, window.innerHeight)}
          style={{ width: 960, height: window.innerHeight - 100 }}
          className="mx-auto "
        >
          <Unity unityContent={unityContent} />
        </div>
      )}
      {(gameOver || isMod) && (
        <div className="flex justify-around ">
          <button
            onClick={onNextClick}
            className="w-full px-8 py-4 mt-24 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default FroggerPractice;

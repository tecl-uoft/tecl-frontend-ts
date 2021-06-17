import React, { useEffect, useState } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import StudyTitleText from "../common/StudyTitleText";
import streamRecorder from "./streamRecorder";

interface IFroggerPracticeProps {
  nextState(): void;
}

function FroggerPractice(props: IFroggerPracticeProps) {
  const { nextState } = props;
  const [gameOver, setGameOver] = useState(false);
  const [isMod, setIsMod] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [unityContent, setUnityContent] = useState<UnityContent>();
  const [mediaRecorder, setMediaRecorder] =
    useState<{
      mediaRecorder: MediaRecorder;
      recordedChunks: Blob[];
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
    if (loadingProgress === 1) {
      const canvas = document.querySelector<HTMLCanvasElement>("canvas");
      if (canvas) {
        streamRecorder(canvas, 0).then((res) => setMediaRecorder(res));
      }
    }
  }, [loadingProgress]);

  const onNextClick = () => {
    if (mediaRecorder && mediaRecorder.mediaRecorder) {
      mediaRecorder.mediaRecorder.stop();
    }
    nextState();
  };

  return (
    <div className="px-2 pt-4 mx-auto mb-16">
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
        <div className="px-32">
          <Unity unityContent={unityContent} />
        </div>
      )}
      {(gameOver || isMod) && (
        <div className="flex justify-around mt-6">
          <button
            onClick={onNextClick}
            className="w-full px-8 py-4 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default FroggerPractice;

import React, { useEffect, useState } from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import StudyTitleText from "../common/StudyTitleText";

interface IFroggerPracticeProps {
  nextState(): void;
}

function FroggerPractice(props: IFroggerPracticeProps) {
  const { nextState } = props;
  const [gameOver, setGameOver] = useState(false);
  const [isMod, setIsMod] = useState(true);
  // only on mod study ortrue
  const unityContent = new UnityContent(
    "/scripts/Frogger_Practice_5.7.21/Frogger_Practice_5.7.21.json",
    "/scripts/Frogger_Practice_5.7.21/UnityLoader.js"
    //"/scripts/frogger_practice/Frogger_Practice_v2.json",
    //"/scripts/frogger_practice/UnityLoader.js"
  );

  useEffect(() => {
    if (!window.location.pathname.includes("mod")) {
      setIsMod(false);
    }
  }, []);

  unityContent.on("GameOver", () => {
    setGameOver(true);
  });

  return (
    <div className="px-2 pt-4 mx-auto mb-16">
      <StudyTitleText
        text={"Before starting, let's get familiar with the game..."}
      />
      <h4 className="mt-6 mb-2 text-2xl text-center text-gray-800">
        Use the{" "}
        <img
          src="/assets/arrow_keys.png"
          alt="arrow"
          className="inline h-20 mx-2 -mt-4"
        />{" "}
        keys to move around.
      </h4>
      <div className="px-32">
        <Unity unityContent={unityContent} />
      </div>
      {(gameOver || isMod) && (
        <div className="flex justify-around mt-6">
          <button
            onClick={() => nextState()}
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

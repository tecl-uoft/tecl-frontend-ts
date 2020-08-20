import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";
import StudyTitleText from "../common/StudyTitleText";

interface IFroggerPracticeProps {
  nextState(): void;
}

function FroggerPractice(props: IFroggerPracticeProps) {
  const { nextState } = props;
  const unityContent = new UnityContent(
    "/scripts/unity/Frogger_RealGame_v5.json",
    "/scripts/unity/UnityLoader.js"
  );

  return (
    <div className="container mx-auto px-2 pt-4 mb-16">
      <StudyTitleText
        text={"Before starting, let's get familiar with the game..."}
      />
      <h4 className="text-2xl text-center text-gray-800 mb-2 mt-6">
        Use the{" "}
        <img
          src="/assets/arrow_keys.png"
          alt="arrow"
          className="inline h-20 mx-2 -mt-4"
        />{" "}
        keys to move around.
      </h4>
      <Unity unityContent={unityContent} />
      <div className="flex justify-around mt-6">
        <button
          onClick={() => nextState()}
          className="bg-orange-200 hover:bg-orange-400 font-bold w-full rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FroggerPractice;

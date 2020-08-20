import React from "react";
import StudyTitleText from "../common/StudyTitleText";

interface IFroggerInstructionsProps {
  nextState(): void;
}

function FroggerInstructions(props: IFroggerInstructionsProps) {
  const { nextState } = props;
  return (
    <div className="container mt-4 mx-auto px-2 pt-4 mb-16">
      <StudyTitleText text={"Watch the instructional video below."} />
      <h4 className="text-2xl text-center text-gray-800 mb-4 mt-4">
        Make sure to learn the objective of the game.
      </h4>
      <video className="px-6 focus:outline-none" controls>
        <source
          src="https://tecl-online-assets.s3.ca-central-1.amazonaws.com/Frogger_Instructions_v6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video.
      </video>
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

export default FroggerInstructions;

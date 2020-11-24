import React from "react";
import StudyTitleText from "../common/StudyTitleText";

interface IFroggerInstructionsProps {
  nextState(): void;
}

function FroggerInstructions(props: IFroggerInstructionsProps) {
  const { nextState } = props;
  return (
    <div className="container px-2 pt-4 mx-auto mt-4 mb-16">
      <StudyTitleText text={"Watch the instructional video below."} />
      <h4 className="mt-4 mb-4 text-2xl text-center text-gray-800">
        Make sure to learn the objective of the game.
      </h4>
      <video className="px-32 focus:outline-none" controls>
        <source
          src="https://tecl-online-assets.s3.ca-central-1.amazonaws.com/Frogger_Instructions_v6.mp4"
          type="video/mp4"
        />
        Your browser does not support the video.
      </video>
      <div className="flex justify-around mt-6">
        <button
          onClick={() => nextState()}
          className="w-full px-8 py-4 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FroggerInstructions;

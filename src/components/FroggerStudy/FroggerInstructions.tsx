import React, { useEffect, useState } from "react";
import FroggerStudyService from "../../services/FroggerStudyService";
import StudyTitleText from "../common/StudyTitleText";

interface IFroggerInstructionsProps {
  nextState(): void;
}

function FroggerInstructions(props: IFroggerInstructionsProps) {
  const [videoSrc, setVideoSrc] = useState(
    "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/Frogger_Instructions_v6.mp4"
  );

  useEffect(() => {
    const queryString = window.location.search;
    const isMod = queryString.includes("/mod");
    const urlParams = new URLSearchParams(queryString);
    const study_type = urlParams.get("study_type");
    const studyFor = urlParams.get("studyFor");

    if (isMod) {
      const videoSrcLink =
        study_type === "1"
          ? "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/frogger/Frogger_Instructions_Female.mp4"
          : "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/frogger/Frogger_Instructions_Male.mp4";
      setVideoSrc(videoSrcLink);
    } else {
      if (studyFor === "child" || studyFor === "adult") {
        
      }
    }
  }, []);

  const { nextState } = props;
  return (
    <div className="container px-2 mx-auto mb-12">
      <StudyTitleText text={"Watch the instructional video below."} />
      <h4 className="mb-4 text-2xl text-center text-gray-800">
        Make sure to learn the objective of the game.
      </h4>
      {console.log(videoSrc)}
      <video className="px-32 min-h-64 focus:outline-none" controls>
        <source src={videoSrc} type="video/mp4" />
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

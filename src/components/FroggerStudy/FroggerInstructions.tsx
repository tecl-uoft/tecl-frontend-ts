import React, { useEffect, useState } from "react";
import StudyTitleText from "../common/StudyTitleText";
import { IFroggerParticipant } from "./FroggerStudy";

interface IFroggerInstructionsProps {
  nextState(): void;
  participant?: IFroggerParticipant;
}

function FroggerInstructions(props: IFroggerInstructionsProps) {
  const { participant } = props;
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const isMod = window.location.pathname.includes("/mod");
    const urlParams = new URLSearchParams(queryString);
    const study_type = urlParams.get("study_type");
    if (isMod) {
      const videoSrcLink =
        study_type === "1"
          ? "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/frogger/Frogger_Instructions_Female.mp4"
          : "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/frogger/Frogger_Instructions_Male.mp4";
      setVideoSrc(videoSrcLink);
    } else if (participant) {
      const { type, study } = participant;
      const mainURL =
        "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/frogger_videos/";
      let videoFile = "";
      if (type === "child") {
        videoFile =
          study === "playful"
            ? "Infrognito_Playful_Child.mp4"
            : "Infrognito_Pedogagical_Child.mp4";
      } else if (type === "adult") {
        videoFile =
          study === "playful"
            ? "Infrognito_Playful_Adult.mp4"
            : "Infrognito_Pedogagical_Adult.mp4";
      }
      setVideoSrc(mainURL + videoFile);
    }
  }, [videoSrc, participant]);

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

import React, { useEffect, useRef, useState } from "react";
import StudyTitleText from "../common/StudyTitleText";
import { notify } from "../Notification";
import { IFroggerParticipant } from "./FroggerStudy";

interface IFroggerInstructionsProps {
  nextState(): void;
  participant?: IFroggerParticipant;
}

function FroggerInstructions(props: IFroggerInstructionsProps) {
  const { participant, nextState } = props;
  const [videoSrc, setVideoSrc] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const isMod = window.location.pathname.includes("/mod");
    const urlParams = new URLSearchParams(queryString);
    const study_type = urlParams.get("study_type");
    if (isMod) {
      const videoSrcLink =
        "https://tecl-frogger-exp-videos.s3.ca-central-1.amazonaws.com/" +
        (study_type === "1"
          ? "Frogger_Instructions_Female.mp4"
          : "Frogger_Instructions_Male.mp4");
      setVideoSrc(videoSrcLink);
    } else if (participant) {
      // const { type, study } = participant;
      const mainURL =
        "https://tecl-frogger-exp-videos.s3.ca-central-1.amazonaws.com/";
      let videoFile = "";

      const type = urlParams.get("vid_t") === "ad_exp" ? "adult" : "child";
      const study =
        urlParams.get("vid_desc") === "pl_exp" ? "playful" : "pedagogical";

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

  const onVideoFinish = () => {
    setIsFinished(true);
  };

  const onNextClick = () => {
    const isMod = window.location.pathname.includes("/mod");
    if (isMod || isFinished) {
      nextState();
    } else {
      notify.error("Please finish the video before proceeding");
    }
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const onPause = () => {
    const videoEl = videoRef.current;
    if (videoEl && videoSrc) {
      videoEl.pause();
    }
  };

  const onPlay = () => {
    const videoEl = videoRef.current;
    if (videoEl && videoSrc) {
      videoEl.play();
    }
  };

  return (
    <div className="container px-2 mx-auto mb-12">
      <StudyTitleText text={"Watch the instructional video below."} />
      <h4 className="mb-4 text-2xl text-center text-gray-800">
        Make sure to learn the objective of the game.
      </h4>
     
      <h3 className="flex flex-col justify-between w-full mb-4 text-2xl text-center rounded-lg">
        <div className="underline">Note: Parents should not help their children at all</div>
        
      </h3>
  
      {videoSrc && (
        <div className="flex flex-col">
          <video
            onEnded={onVideoFinish}
            className="px-32 min-h-64 "
            ref={videoRef}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video.
          </video>
          <div className="flex mt-4 space-x-4">
            <button
              onClick={onPlay}
              className="w-1/2 px-4 py-3 font-bold tracking-wider uppercase bg-green-200 rounded-lg shadow-lg hover:bg-green-400 "
            >
              Play
            </button>
            <button
              onClick={onPause}
              className="w-1/2 px-4 py-3 font-bold tracking-wider uppercase bg-yellow-200 rounded-lg shadow-lg hover:bg-yellow-400 "
            >
              Pause
            </button>
          </div>
        </div>
      )}
      {isFinished && (
        <div className="flex justify-around mt-6">
          <button
            onClick={onNextClick}
            className="w-full px-8 py-4 font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default FroggerInstructions;

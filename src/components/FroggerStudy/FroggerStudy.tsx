import React, { useEffect, useRef, useState } from "react";
import FroggerConsentForm from "./FroggerConsentForm";
import FroggerGame from "./FroggerGame";
import FroggerPractice from "./FroggerPractice";
import FroggerInstructions from "./FroggerInstructions";
import ErrorNotFound from "../../pages/ErrorNotFound";

enum FroggerStudyStates {
  AskConsent = "askConsent",
  PracticeGame = "practiceGame",
  InstructionVideo = "instructionVideo",
  StudyGame = "studyGame",
  NoConsent = "noConsent",
}

function FroggerStudy() {
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.AskConsent
      : FroggerStudyStates.AskConsent
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(function (error) {
          console.log("Something went wrong!");
        });
    }
  }, [videoRef]);

  function cycleStudyStates(froggerStudyState: FroggerStudyStates) {
    let state = null;
    switch (froggerStudyState) {
      case FroggerStudyStates.AskConsent:
        state = (
          <FroggerConsentForm
            consentFunc={() => setStudyState(FroggerStudyStates.PracticeGame)}
            noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
          />
        );
        break;
      case FroggerStudyStates.PracticeGame:
        state = (
          <FroggerPractice
            nextState={() => setStudyState(FroggerStudyStates.InstructionVideo)}
          />
        );
        break;
      case FroggerStudyStates.InstructionVideo:
        state = (
          <FroggerInstructions
            nextState={() => setStudyState(FroggerStudyStates.StudyGame)}
          />
        );
        break;
      case FroggerStudyStates.StudyGame:
        state = (
          <FroggerGame
            nextState={() => setStudyState(FroggerStudyStates.InstructionVideo)}
          />
        );
        break;
      default:
        state = <ErrorNotFound />;
    }
    return state;
  }

  return (
    <div>
      {
        <video
          className="absolute w-1/2 h-64 mx-auto"
          ref={videoRef}
          autoPlay={true}
          id="videoElement"
        ></video>
      }{" "}
      {cycleStudyStates(studyState)}
    </div>
  );
}

export default FroggerStudy;

import React, { useEffect, useRef, useState } from "react";
import FroggerConsentForm from "./FroggerConsentForm";
import FroggerVideoConsentForm from "./FroggerVideoConsentForm";
import FroggerGame from "./FroggerGame";
import FroggerPractice from "./FroggerPractice";
import FroggerInstructions from "./FroggerInstructions";
import ErrorNotFound from "../../pages/ErrorNotFound";
import FroggerImgInstructions from "./FroggerImgInstructions";
import FroggerPostQuestions from "./FroggerPostQuestions";

enum FroggerStudyStates {
  AskConsent = "askConsent",
  AskVideoConsent = "askVideoConsent",
  PracticeGame = "practiceGame",
  InstructionVideo = "instructionVideo",
  StudyGame = "studyGame",
  PostQuestions = "postQuestions",
  NoConsent = "noConsent",
  ImgInstructions = "imgInstructions",
}

function FroggerStudy() {
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.PostQuestions
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
            consentFunc={() =>
              setStudyState(FroggerStudyStates.AskVideoConsent)
            }
            noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
          />
        );
        break;
      case FroggerStudyStates.AskVideoConsent:
        state = (
          <FroggerVideoConsentForm
            consentFunc={() =>
              setStudyState(FroggerStudyStates.ImgInstructions)
            }
            noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
          />
        );
        break;
      case FroggerStudyStates.ImgInstructions:
        state = (
          <FroggerImgInstructions
            nextState={() => setStudyState(FroggerStudyStates.PracticeGame)}
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
      case FroggerStudyStates.PostQuestions:
        state = <FroggerPostQuestions />;
        break;
      default:
        state = <ErrorNotFound />;
    }
    return state;
  }

  return <div>{cycleStudyStates(studyState)}</div>;
}

export default FroggerStudy;

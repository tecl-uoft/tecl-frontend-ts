import React, { useState } from "react";
import FroggerConsentForm from "./FroggerConsentForm";
import FroggerVideoConsentForm from "./FroggerVideoConsentForm";
import FroggerGame from "./FroggerGame";
import FroggerPractice from "./FroggerPractice";
import FroggerInstructions from "./FroggerInstructions";
import ErrorNotFound from "../../pages/ErrorNotFound";
import FroggerImgInstructions from "./FroggerImgInstructions";
import FroggerPostQuestions from "./FroggerPostQuestions";
import FroggerCameraTest from "./FroggerCameraTest";
import DemographicQuestions from "./DemographicQuestions";

enum FroggerStudyStates {
  AskConsent = "askConsent",
  AskVideoConsent = "askVideoConsent",
  PracticeGame = "practiceGame",
  InstructionVideo = "instructionVideo",
  StudyGame = "studyGame",
  PostQuestions = "postQuestions",
  NoConsent = "noConsent",
  ImgInstructions = "imgInstructions",
  CameraTest = "camTest",
  DemoQuestions = "DemoQ",
}

function FroggerStudy() {
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.AskVideoConsent
      : FroggerStudyStates.AskConsent
  );
  const [videoRecorder, setVideoRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
  }>();

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
            consentFunc={() => setStudyState(FroggerStudyStates.CameraTest)}
            noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
          />
        );
        break;
      case FroggerStudyStates.CameraTest:
        state = (
          <FroggerCameraTest
            setVideoRecorder={setVideoRecorder}
            nextState={() => setStudyState(FroggerStudyStates.ImgInstructions)}
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
            nextState={() => setStudyState(FroggerStudyStates.PostQuestions)}
          />
        );
        break;
      case FroggerStudyStates.PostQuestions:
        state = (
          <FroggerPostQuestions
            nextState={() => setStudyState(FroggerStudyStates.DemoQuestions)}
          />
        );
        break;
      case FroggerStudyStates.DemoQuestions:
        state = (
          <DemographicQuestions
            nextState={() => setStudyState(FroggerStudyStates.InstructionVideo)}
          />
        );
        break;
      default:
        state = <ErrorNotFound />;
    }
    return state;
  }

  return <div>{cycleStudyStates(studyState)}</div>;
}

export default FroggerStudy;

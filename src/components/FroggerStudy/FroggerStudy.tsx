import React, { useEffect, useState } from "react";
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
import RestrictionScreen from "./RestrictionScreen";

enum FroggerStudyStates {
  RestrictionScreen = "resScreen",
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

export interface IFroggerParticipant {
  id: string;
  type: string;
  study: "playful" | "pedogagical" | "";
}
export interface IFroggerResponse {
  [key: string]: { [key: string]: string | boolean };
}

function FroggerStudy() {
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.RestrictionScreen
      : FroggerStudyStates.RestrictionScreen
  );
  const [participant, setParticipant] = useState<IFroggerParticipant>({
    id: "",
    type: "",
    study: "",
  });
  const [videoRecorder, setVideoRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
  }>();
  const [response, setResponse] = useState<IFroggerResponse>({});
  
  useEffect(() => {
    console.log(response)
  }, [response])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("participant_id");
    const type = urlParams.get("type");
    const study = Math.random() < 0.5 ? "playful" : "pedogagical";
    if (id && type) {
      setParticipant({ id, type, study });
      process.env.NODE_ENV === "development"
        ? setStudyState(FroggerStudyStates.PostQuestions)
        : setStudyState(FroggerStudyStates.AskConsent);
    }
  }, []);

  function cycleStudyStates(froggerStudyState: FroggerStudyStates) {
    let state = null;
    switch (froggerStudyState) {
      case FroggerStudyStates.RestrictionScreen:
        state = <RestrictionScreen />;
        break;

      case FroggerStudyStates.AskConsent:
        state = (
          <FroggerConsentForm
            consentFunc={() =>
              setStudyState(FroggerStudyStates.AskVideoConsent)
            }
            noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
            setResponse={setResponse}
          />
        );
        break;
      case FroggerStudyStates.AskVideoConsent:
        state = (
          <FroggerVideoConsentForm
            consentFunc={() => setStudyState(FroggerStudyStates.CameraTest)}
            noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
            setResponse={setResponse}
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
            participant={participant}
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
            setResponse={setResponse}
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

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
import ThanksNote from "./ThanksNote";
import FroggerStudyService from "../../services/FroggerStudyService";
import { notify } from "../Notification";
import NoConsent from "./NoConsent";
import { QualtricsLink } from "./QualtricsLink";
import { Selection } from "./Selection";
import ParentWarning from "./ParentWarning";
import GoalReminder from "./GoalReminder";

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
  ThanksNote = "ThankNote",
  QualtricsLink = "QualLink",
  ParentWarning = "ParentWarning",
  GoalReminder = "GoalReminder"
}

export interface IFroggerParticipant {
  id: string;
  type: string;
  study: "playful" | "pedagogical" | "";
}
export interface IFroggerResponse {
  [key: string]: { [key: string]: string | boolean | Object };
}

function FroggerStudy() {
  const [studyState, setStudyState] = useState(
    FroggerStudyStates.RestrictionScreen
  );
  const [participant, setParticipant] = useState<IFroggerParticipant>({
    id: "",
    type: "",
    study: "",
  });
  const [videoRecorder, setVideoRecorder] = useState<{
    mediaRecorder: MediaRecorder;
    recordedChunks: Blob[];
    startTime: number;
  }>();
  const [response, setResponse] = useState<IFroggerResponse>({});

  const submitStudyResults = () => {
    FroggerStudyService.results(participant, response)
      .then(() => {
        videoRecorder?.mediaRecorder.stop();
        setStudyState(FroggerStudyStates.ThanksNote);
      })
      .catch((err) => notify.error(err.message));
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("participant_id");
    const typeParam = urlParams.get("vid_t");
    const type = typeParam === "ad_exp" ? "adult" : "child";
    const study =
      urlParams.get("vid_desc") === "pl_exp" ? "playful" : "pedagogical";

    if (id && type && typeParam) {
      setParticipant({ id, type, study });
      process.env.NODE_ENV === "development"
        ? setStudyState(FroggerStudyStates.ImgInstructions)
        : setStudyState(FroggerStudyStates.ImgInstructions);
    } else {
      setStudyState(FroggerStudyStates.RestrictionScreen);
    }
  }, []);

  const cycleStudyStates = (froggerStudyState: FroggerStudyStates) => {
    let state = null;
    switch (froggerStudyState) {
      case FroggerStudyStates.RestrictionScreen:
        // state = <RestrictionScreen />;
        state = (
          <Selection
            nextState={() => setStudyState(FroggerStudyStates.ImgInstructions)}
          />
        );
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
      // case FroggerStudyStates.AskVideoConsent:
      //   state = (
      //     <FroggerVideoConsentForm
      //       consentFunc={() => setStudyState(FroggerStudyStates.CameraTest)}
      //       noConsentFunc={() => setStudyState(FroggerStudyStates.NoConsent)}
      //       setResponse={setResponse}
      //     />
      //   );
      //   break;
      // case FroggerStudyStates.CameraTest:
      //   state = (
      //     <FroggerCameraTest
      //       setVideoRecorder={setVideoRecorder}
      //       nextState={() => setStudyState(FroggerStudyStates.ImgInstructions)}
      //     />
      //   );
      //   break;
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
            webcamStartTime={videoRecorder?.startTime}
            nextState={
              new URLSearchParams(window.location.search).get("prac") === "y"
                ? () => setStudyState(FroggerStudyStates.InstructionVideo)
                : () => setStudyState(FroggerStudyStates.ParentWarning)
            }
            setResponse={setResponse}
          />
        );
        break;
      case FroggerStudyStates.InstructionVideo:
        state = (
          <FroggerInstructions
            participant={participant}
            nextState={() => setStudyState(FroggerStudyStates.ParentWarning)}
          />
        );
        break;
      case FroggerStudyStates.ParentWarning:
        state = (
          <ParentWarning
            nextState={() => setStudyState(FroggerStudyStates.GoalReminder)}
          />
        );
        break;
      case FroggerStudyStates.GoalReminder:
        state = (
          <GoalReminder nextState={() => setStudyState(FroggerStudyStates.StudyGame)} />
        );
        break;
      case FroggerStudyStates.StudyGame:
        state = (
          <FroggerGame
            webcamStartTime={videoRecorder?.startTime}
            nextState={() => setStudyState(FroggerStudyStates.ThanksNote)}
            participant={participant}
            setResponse={setResponse}
          />
        );
        break;
      case FroggerStudyStates.PostQuestions:
        state = (
          <FroggerPostQuestions
            nextState={() => setStudyState(FroggerStudyStates.QualtricsLink)}
            setResponse={setResponse}
          />
        );
        break;
      case FroggerStudyStates.QualtricsLink:
        state = (
          <QualtricsLink
            nextState={() => setStudyState(FroggerStudyStates.DemoQuestions)}
          />
        );
        break;
      case FroggerStudyStates.DemoQuestions:
        state = (
          <DemographicQuestions
            nextState={submitStudyResults}
            setResponse={setResponse}
          />
        );
        break;
      case FroggerStudyStates.ThanksNote:
        state = <ThanksNote />;
        break;
      case FroggerStudyStates.NoConsent:
        state = <NoConsent />;
        break;
      default:
        state = <ErrorNotFound />;
    }
    return state;
  };

  return <div>{cycleStudyStates(studyState)}</div>;
}

export default FroggerStudy;

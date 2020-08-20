import React, { useState } from "react";
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
  const [studyState, setStudyState] = useState(FroggerStudyStates.AskConsent);

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

  return <div>{cycleStudyStates(studyState)}</div>;
}

export default FroggerStudy;

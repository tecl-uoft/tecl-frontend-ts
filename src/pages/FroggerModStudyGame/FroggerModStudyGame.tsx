import React, { useState } from "react";
import FroggerGame from "../../components/FroggerStudy/FroggerGame";
import FroggerInstructions from "../../components/FroggerStudy/FroggerInstructions";
import FroggerPractice from "../../components/FroggerStudy/FroggerPractice";
import ErrorNotFound from "../ErrorNotFound";

enum FroggerStudyStates {
  PracticeGame = "practiceGame",
  InstructionVideo = "instructionVideo",
  StudyGame = "studyGame",
}

function FroggerModStudyGame() {
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.StudyGame
      : FroggerStudyStates.InstructionVideo
  );

  function cycleStudyStates(froggerStudyState: FroggerStudyStates) {
    let state = null;
    switch (froggerStudyState) {
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

export default FroggerModStudyGame;

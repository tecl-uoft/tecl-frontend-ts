import React, { useState } from "react";
import FroggerGame from "../../components/FroggerStudy/FroggerGame";
import FroggerInstructions from "../../components/FroggerStudy/FroggerInstructions";
import FroggerPractice from "../../components/FroggerStudy/FroggerPractice";
import ErrorNotFound from "../ErrorNotFound";
import EndScreen from "./EndScreen";

enum FroggerStudyStates {
  PracticeGame = "practiceGame",
  InstructionVideo = "instructionVideo",
  StudyGame = "studyGame",
  EndScreen = "endScreen",
}

function FroggerModStudyGame() {
  const [playerMovements, setPlayerMovements] = useState<string[][]>([]);

  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.StudyGame
      : FroggerStudyStates.PracticeGame
  );

  const onFinishClick = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const studyType = urlParams.get("study_type");
    const participantId = urlParams.get("participant_id")
    fetch("/api/v1/frogger-study/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerMovements, studyType, participantId }),
    });
    setStudyState(FroggerStudyStates.EndScreen);
  };

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
            setPlayerMovements={setPlayerMovements}
            nextState={onFinishClick}
          />
        );
        break;
      case FroggerStudyStates.EndScreen:
        state = <EndScreen />;
        break;
      default:
        state = <ErrorNotFound />;
    }
    return state;
  }

  return <div>{cycleStudyStates(studyState)}</div>;
}

export default FroggerModStudyGame;

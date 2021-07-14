import React, { useEffect, useState } from "react";
import FroggerGame from "../../components/FroggerStudy/FroggerGame";
import FroggerInstructions from "../../components/FroggerStudy/FroggerInstructions";
import FroggerPractice from "../../components/FroggerStudy/FroggerPractice";
import { IFroggerResponse } from "../../components/FroggerStudy/FroggerStudy";
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
   const [response, setResponse] = useState<IFroggerResponse>({});
  
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? FroggerStudyStates.PracticeGame
      : FroggerStudyStates.PracticeGame
  );
  useEffect(() => {
    console.log(playerMovements.length);
  }, [playerMovements]);

  const onFinishClick = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const studyType = urlParams.get("study_type");
    const participantId = urlParams.get("participant_id");
    await fetch("/api/v1/frogger-study/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerMovements, studyType, participantId, fruits: response.fruits }),
    });
    /* try {
      const csvArr = playerMovements.map((e) => e.join(",")).join("\n");
      const csvContent = "x,y,time,area\n" + csvArr;

      const link = document.createElement("a");
      link.download =
        participantId + "_" + studyType + "_" + new Date().getTime() + ".csv";
      link.href =
        "data:text/plain;charset=utf-8," + encodeURIComponent(csvContent);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Sorry, cannot dowload file.");
    } */

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
            setResponse={setResponse}
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

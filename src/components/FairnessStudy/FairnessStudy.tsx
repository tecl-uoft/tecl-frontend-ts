import React, { useState, useEffect } from "react";
import BallTossGame from "./BallTossGame";

import FairnessStudyConsent from "./FairnessStudyConsent";
import FairnessStudyAttention from "./FairnessStudyAttention";
import FairnessStudyFeedback from "./FairnessStudyFeedback";
import FairnessStudyNoConsent from "./FairnessStudyNoConsent";
import FairnessStudyMachine from "./FairnessStudyMachine";
import FairnessStudyFinishedKids from "./FairnessStudyFinishedKids";

import BallTossTransition from "./BallTossTransition";

import Aliens from "./Aliens";
import { getSetup } from "./apiCalls";

enum FairnessStudyStates {
  AskConsent = 0,
  TransitionToMain = 1,
  GameOne = 2,
  GameTwo = 3,
  GameThree = 4,
  GameFour = 5,
  AttentionQuestions = 6,
  FeedbackQuestions = 7,
  NoConsent = 8,
  Machine = 9,
  FinishedKids = 10
}

function FairnessStudy() {
  const [trialNum, setTrialNum] = useState(
    process.env.NODE_ENV === "development"
      ? FairnessStudyStates.AskConsent
      : FairnessStudyStates.AskConsent
  );
  const [randomizedElements, setRandomizedElements] = useState(null as any);

  const [trialInfo, setTrialInfo] = useState(null as any);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [isKidMode, setIsKidMode] = useState(
    process.env.NODE_ENV === "development" ? false : false
  );

  // sets game mode for kids only
  useEffect(() => {
    /* console.log(alienCharNames.trial1, alienCharNames) */
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("game_type") === "kids") {
      setIsKidMode(true);
    }
  }, []);  

  // to load in the startup api and set up all information and random information
  // for the experiments
  useEffect(() => {
    // don't call GET request after first load
    if (!isLoaded) {
      getSetup(setRandomizedElements, console.error, null);
    }

    // after we have recived random elements from the server
    if (randomizedElements) {
      // all possible choices for the inital trial
      const trialEqualPlayerAlienChoices = [Aliens.H, Aliens.L, Aliens.N];

      // all possible determined alien choices for a user in the one type of trial
      const trialOnePlayerAlienChoices = [Aliens.A, Aliens.B, Aliens.G];

      // all possible determined alien choices for a second type of trial
      const trialTwoPlayerAlienChoices = [Aliens.C, Aliens.D, Aliens.I];

      // all possible determined alien choices for a third type of trial
      const trialThreePlayerAlienChoices = [Aliens.E, Aliens.F, Aliens.M];

      const trialEvents = [
        {
          // Just trial
          event1: "selfPlay",
          event2: "selfPlay",
          event3: "betweenPlay",
        },
        {
          // Unjust trial
          event1: "otherPlay",
          event2: "otherPlay",
          event3: "betweenPlay",
        },
        {
          // unknown trial
          event1: "betweenPlay",
          event2: "betweenPlay",
          event3: "betweenPlay",
        },
      ];

      // array that has 0-2 ordered randomly
      // represent Just, Unjust, Unknown trials
	  const urlParams = new URLSearchParams(window.location.search);
	  const inputTrialArr = urlParams.get("t");
      const randIdxArr = 
      (inputTrialArr === "0") ? [0, 1, 2] :
      (inputTrialArr === "1") ? [1, 2, 0] :
      (inputTrialArr === "2") ? [2, 0, 1] : 
      randomizedElements.trialSequence;

      const inputPc = parseInt(urlParams.get("pc") || "");   
      const inputThrow = parseInt(urlParams.get("throw") || "");

      // trial where all but one alien is thrown to equally
      const trialEqual = {
        alienA: trialEqualPlayerAlienChoices[0],
        alienB: trialEqualPlayerAlienChoices[1],
        alienC: trialEqualPlayerAlienChoices[2],
        alienUser:
          trialEqualPlayerAlienChoices[isNaN(inputPc) ? randomizedElements.playerCharacter : inputPc],
        allThrowEvents: {
          event1: "allPlay",
          event2: "allPlay",
          event3: "allPlay",
        },
      };

      // Trial 1: ALWAYS ABGH (whether it is unjust/just/unknown)
      const trialOne = {
        alienA: trialOnePlayerAlienChoices[0],
        alienB: trialOnePlayerAlienChoices[1],
        alienC: trialOnePlayerAlienChoices[2],
        alienUser:
          trialOnePlayerAlienChoices[isNaN(inputPc) ? randomizedElements.playerCharacter : inputPc],
        allThrowEvents: trialEvents[randIdxArr[0]], // pick random unjust/just/unknown
      };

      // Trial 2: ALWAYS CDIL (whether it is unjust/just/unknown)
      const trialTwo = {
        alienA: trialTwoPlayerAlienChoices[0],
        alienB: trialTwoPlayerAlienChoices[1],
        alienC: trialTwoPlayerAlienChoices[2],
        alienUser:
          trialTwoPlayerAlienChoices[isNaN(inputPc) ? randomizedElements.playerCharacter : inputPc],
        allThrowEvents: trialEvents[randIdxArr[1]], // pick random unjust/just/unknown
      };

      // Trial 3: ALWAYS EFMN (whether it is unjust/just/unknown)
      const trialThree = {
        alienA: trialThreePlayerAlienChoices[0],
        alienB: trialThreePlayerAlienChoices[1],
        alienC: trialThreePlayerAlienChoices[2],
        alienUser:
          trialThreePlayerAlienChoices[isNaN(inputPc) ? randomizedElements.playerCharacter : inputPc],
        allThrowEvents: trialEvents[randIdxArr[2]], // pick random unjust/just/unknown
      };

      const trialOrder: any = [];
      randIdxArr.map((trialNum: any) => {
        if (trialNum === 0) {
          trialOrder.push("just");
        } else if (trialNum === 1) {
          trialOrder.push("unjust");
        } else if (trialNum === 2) {
          trialOrder.push("unknown");
        }
        return trialNum;
      });

      let participantAlienType = "";
      switch (isNaN(inputPc) ? randomizedElements.playerCharacter : inputPc) {
        case 0:
          participantAlienType = "excluding";
          break;
        case 1:
          participantAlienType = "excluded";
          break;
        case 2:
          participantAlienType = "unseen";
          break;
        default:
          participantAlienType = "";
      }
      
      let getsToThrow = null;
      getsToThrow = (isNaN(inputThrow) ? randomizedElements.getsToThrow : (inputThrow === 1))
      console.log(getsToThrow)
      
      setTrialInfo({
        trialEqual,
        trialOne,
        trialTwo,
        trialThree,
        finalQuestions: randomizedElements.finalQuestions,
        trialOrder,
        participantAlienType,
        getsToThrow,
      });
      setIsLoaded(true);
    }
  }, [isLoaded, randomizedElements]);

  return (
    <div>
      {isLoaded
        ? {
            0: (
              <FairnessStudyConsent
                setTrialFunc={() => setTrialNum(1)}
                setEndFunc={() => setTrialNum(8)}
              />
            ),
            1: (
              <BallTossTransition
                endText={
                  "First, you're going to learn about some aliens that all live on the planet Bep."
                }
                planet={"/assets/fairness_img/bep.png"}
                isKidMode={isKidMode}
                nextFunc={() => setTrialNum(2)}
              />
            ),
            2: (
              <BallTossGame
                alienA={trialInfo.trialEqual.alienA}
                alienB={trialInfo.trialEqual.alienB}
                alienC={trialInfo.trialEqual.alienC}
                alienUser={trialInfo.trialEqual.alienUser}
                alienCharNames={{
                  A1: "", //"David",
                  A2: "", //"Julia",
                  B: "", //"Maya",
                }}
                allThrowEvents={trialInfo.trialEqual.allThrowEvents}
                setTrialFunc={() => setTrialNum(3)}
                getsToThrow={trialInfo.getsToThrow}
                endText={
                  "Now, you're going to learn about some other aliens that live on the planet Merm."
                }
                planet={"/assets/fairness_img/merm.png"}
              />
            ),
            // each ball toss game consists 3 different types of throwing events, just/unjust/unknown
            3: (
              <BallTossGame
                alienA={trialInfo.trialOne.alienA}
                alienB={trialInfo.trialOne.alienB}
                alienC={trialInfo.trialOne.alienC}
                alienUser={trialInfo.trialOne.alienUser}
                alienCharNames={{
                  A1: "", //"Josh",
                  A2: "", //"Yegor",
                  B: "", //"Brian",
                }}
                allThrowEvents={trialInfo.trialOne.allThrowEvents}
                setTrialFunc={() => setTrialNum(4)}
                trialOrder={trialInfo.trialOrder}
                getsToThrow={trialInfo.getsToThrow}
                participantAlienType={trialInfo.participantAlienType}
                endText={
                  "Now, you're going to learn about some other aliens that live on the planet Wunx."
                }
                planet={"/assets/fairness_img/wunx.png"}
              />
            ),
            4: (
              <BallTossGame
                alienA={trialInfo.trialTwo.alienA}
                alienB={trialInfo.trialTwo.alienB}
                alienC={trialInfo.trialTwo.alienC}
                alienUser={trialInfo.trialTwo.alienUser}
                alienCharNames={{
                  A1: "", //"Celine",
                  A2: "", //"Tracey",
                  B: "", //"Sean",
                }}
                allThrowEvents={trialInfo.trialTwo.allThrowEvents}
                setTrialFunc={() => setTrialNum(5)}
                trialOrder={trialInfo.trialOrder}
                getsToThrow={trialInfo.getsToThrow}
                participantAlienType={trialInfo.participantAlienType}
                endText={
                  "Let's visit a fourth planet and learn about another set of aliens from the planet Freg."
                }
                planet={"/assets/fairness_img/freg.png"}
              />
            ),
            5: (
              <BallTossGame
                alienA={trialInfo.trialThree.alienA}
                alienB={trialInfo.trialThree.alienB}
                alienC={trialInfo.trialThree.alienC}
                alienUser={trialInfo.trialThree.alienUser}
                alienCharNames={{
                  A1: "", //"Omar",
                  A2: "", //"Arpit",
                  B: "", //"Rebecca",
                }}
                allThrowEvents={trialInfo.trialThree.allThrowEvents}
                setTrialFunc={() => setTrialNum(6)}
                trialOrder={trialInfo.trialOrder}
                getsToThrow={trialInfo.getsToThrow}
                participantAlienType={trialInfo.participantAlienType}
                endText={
                  isKidMode ? "Just a few more questions!" :
                  "Now, please answer some general questions about the game."
                }
                responseReady={true}
              />
            ),
            6: <FairnessStudyAttention 
            	  setTrialFunc={() => isKidMode ? setTrialNum(9) : setTrialNum(7)}
            	  isKidMode={isKidMode} />,
            7: <FairnessStudyFeedback />,
            8: <FairnessStudyNoConsent />,
            9: <FairnessStudyMachine
            	  setTrialFunc={() => setTrialNum(10)}
                  alienA={trialInfo.trialThree.alienA}
                  alienB={trialInfo.trialThree.alienB}
                  alienC={trialInfo.trialThree.alienC}
                  alienUser={trialInfo.trialThree.alienUser}          	  
            	   />,
            10: <FairnessStudyFinishedKids />,
          }[trialNum]
        : null}
    </div>
  );
}

export default FairnessStudy;

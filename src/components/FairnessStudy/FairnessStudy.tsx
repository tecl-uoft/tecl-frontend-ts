import React, { useState, useEffect } from "react";
import BallTossGame from "./BallTossGame";

import FairnessStudyConsent from "./FairnessStudyConsent";
import FairnessStudyAttention from "./FairnessStudyAttention";
import FairnessStudyFeedback from "./FairnessStudyFeedback";
import FairnessStudyNoConsent from "./FairnessStudyNoConsent";

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
}

function FairnessStudy() {
  const [trialNum, setTrialNum] = useState(
    process.env.NODE_ENV === "development"
      ? FairnessStudyStates.GameTwo
      : FairnessStudyStates.AskConsent
  );
  const [randomizedElements, setRandomizedElements] = useState(null as any);

  const [trialInfo, setTrialInfo] = useState(null as any);
  const [isLoaded, setIsLoaded] = useState(false);

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
      const randIdxArr = randomizedElements.trialSequence;

      // trial where all but one alien is thrown to equally
      const trialEqual = {
        alienA: trialEqualPlayerAlienChoices[0],
        alienB: trialEqualPlayerAlienChoices[1],
        alienC: trialEqualPlayerAlienChoices[2],
        alienUser:
          trialEqualPlayerAlienChoices[randomizedElements.playerCharacter],
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
          trialOnePlayerAlienChoices[randomizedElements.playerCharacter],
        allThrowEvents: trialEvents[randIdxArr[0]], // pick random unjust/just/unknown
      };

      // Trial 2: ALWAYS CDIL (whether it is unjust/just/unknown)
      const trialTwo = {
        alienA: trialTwoPlayerAlienChoices[0],
        alienB: trialTwoPlayerAlienChoices[1],
        alienC: trialTwoPlayerAlienChoices[2],
        alienUser:
          trialTwoPlayerAlienChoices[randomizedElements.playerCharacter],
        allThrowEvents: trialEvents[randIdxArr[1]], // pick random unjust/just/unknown
      };

      // Trial 3: ALWAYS EFMN (whether it is unjust/just/unknown)
      const trialThree = {
        alienA: trialThreePlayerAlienChoices[0],
        alienB: trialThreePlayerAlienChoices[1],
        alienC: trialThreePlayerAlienChoices[2],
        alienUser:
          trialThreePlayerAlienChoices[randomizedElements.playerCharacter],
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
      switch (randomizedElements.playerCharacter) {
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

      setTrialInfo({
        trialEqual,
        trialOne,
        trialTwo,
        trialThree,
        finalQuestions: randomizedElements.finalQuestions,
        trialOrder,
        participantAlienType,
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
                  "Now, you're going to learn about some aliens that all live on the planet Bep."
                }
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
                  A1: "David",
                  A2: "Julia",
                  B: "Maya",
                }}
                allThrowEvents={trialInfo.trialEqual.allThrowEvents}
                setTrialFunc={() => setTrialNum(3)}
                endText={
                  "Now, you're going to learn about some other aliens that live on the planet Merm."
                }
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
                  A1: "Josh",
                  A2: "Yegor",
                  B: "Brian",
                }}
                allThrowEvents={trialInfo.trialOne.allThrowEvents}
                setTrialFunc={() => setTrialNum(4)}
                trialOrder={trialInfo.trialOrder}
                participantAlienType={trialInfo.participantAlienType}
                endText={
                  "Now, you're going to learn about some other aliens that live on the planet Wunx."
                }
              />
            ),
            4: (
              <BallTossGame
                alienA={trialInfo.trialTwo.alienA}
                alienB={trialInfo.trialTwo.alienB}
                alienC={trialInfo.trialTwo.alienC}
                alienUser={trialInfo.trialTwo.alienUser}
                alienCharNames={{
                  A1: "Marko",
                  A2: "Kacey",
                  B: "Sean",
                }}
                allThrowEvents={trialInfo.trialTwo.allThrowEvents}
                setTrialFunc={() => setTrialNum(5)}
                trialOrder={trialInfo.trialOrder}
                participantAlienType={trialInfo.participantAlienType}
                endText={
                  "Let's visit a fourth planet and learn about another set of aliens from the planet Freg."
                }
              />
            ),
            5: (
              <BallTossGame
                alienA={trialInfo.trialThree.alienA}
                alienB={trialInfo.trialThree.alienB}
                alienC={trialInfo.trialTwo.alienC}
                alienUser={trialInfo.trialThree.alienUser}
                alienCharNames={{
                  A1: "Omar",
                  A2: "Arpit",
                  B: "Celine",
                }}
                allThrowEvents={trialInfo.trialThree.allThrowEvents}
                setTrialFunc={() => setTrialNum(6)}
                trialOrder={trialInfo.trialOrder}
                participantAlienType={trialInfo.participantAlienType}
                endText={
                  "Now, please answer some general questions about the game."
                }
              />
            ),
            6: <FairnessStudyAttention setTrialFunc={() => setTrialNum(7)} />,
            7: <FairnessStudyFeedback />,
            8: <FairnessStudyNoConsent />,
          }[trialNum]
        : null}
    </div>
  );
}

export default FairnessStudy;

import React, { useState, useEffect, useContext } from "react";

import "./ballTossGame.css";

// import AlienBall from "./aliens/AlienBall";

import BallTossIntro from "./BallTossIntro";
import BallTossGivenAlien from "./BallTossGivenAlien";
import BallTossPickAlien from "./BallTossPickAlien";
import BallTossNewAlien from "./BallTossNewAlien";
import BallTossAlienQuestion from "./BallTossAlienQuestion";
import BallTossPlay from "./BallTossPlay";
import BallTossContext from "../BallTossContext";
import BallTossTransition from "../BallTossTransition";
import BallTossGivenAlienKids from "./BallTossGivenAlienKids";

function BallTossGame(props) {
  const playerTime = useContext(BallTossContext);
  const {
    alienA,
    alienB,
    alienC,
    alienUser,
    alienCharNames,
    allThrowEvents,
    setTrialFunc,
    endText,
    trialOrder,
    participantAlienType,
    getsToThrow,
    planet,
  } = props;

  const [frameCount, setFrameCount] = useState(0);
  const [ingameQuestions, setIngameQuestions] = useState([]);
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

  useEffect(() => {
    // send q&a to server after finishing all set of ingame questions
    if (ingameQuestions.length === 4 * 6) {
      const currDate = new Date();
      // get prolific information
      let search = window.location.search;
      let params = new URLSearchParams(search);
      const prolificInfo = {
        pid: params.get("PROLIFIC_PID"),
        sessionId: params.get("SESSION_ID"),
        studyId: params.get("STUDY_ID"),
      };

      fetch("/api/v1/fairness-study/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prolificInfo: prolificInfo,
          participantStartTime: playerTime,
          participantFinishTime: currDate.getTime(),
          studyQuestionsInGameResponse: ingameQuestions,
          trialOrder: trialOrder,
          participantAlienType: participantAlienType,
        }),
      });
    }

    // disabling no dep warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingameQuestions, playerTime]);

  // reset as we change to a new frame
  useEffect(() => {
    // TODO double check as setframecount is set to 0 twice
    // by the previous use effect i.e change ingameq updates setTrialFun

    setFrameCount(process.env.NODE_ENV === "development" ? 1 : 0);
  }, [setTrialFunc]);

  return (
    <div id="ball-toss-game" class="container mt-32 mx-auto px-2 pt-4">
      {
        {
          0: (
            <BallTossIntro
              isKidMode={isKidMode}
              alienA={alienA}
              alienB={alienB}
              alienC={alienC}
              nextFunc={setFrameCount}
            />
          ),
          // Event One
          1: (
            <BallTossPlay
              trialNum="1"
              gameNum="1"
              throwEvent={allThrowEvents.event1}
              leftAlien={alienA}
              leftAlienFirstName={alienCharNames.A1}
              middleAlien={
                allThrowEvents.event1 === "selfPlay" ? alienA : alienB
              }
              middleAlienFirstName={
                allThrowEvents.event1 === "selfPlay"
                  ? alienCharNames.A2
                  : alienCharNames.B
              }
              rightAlien={
                {
                  selfPlay: alienB,
                  allPlay: alienA,
                  betweenPlay: alienA,
                  otherPlay: alienA,
                }[allThrowEvents.event1]
              }
              rightAlienFirstName={
                allThrowEvents.event1 === "selfPlay"
                  ? alienCharNames.B
                  : alienCharNames.A2
              }
              nextFunc={() => setFrameCount(2)}
            />
          ),
          // Event Two
          2: (
            <BallTossPlay
              trialNum="1"
              gameNum="2"
              throwEvent={allThrowEvents.event2}
              alienTrialCharNames={alienCharNames}
              leftAlien={alienA}
              leftAlienFirstName={alienCharNames.A1}
              middleAlien={
                allThrowEvents.event2 === "selfPlay" ? alienA : alienB
              }
              middleAlienFirstName={
                allThrowEvents.event2 === "selfPlay"
                  ? alienCharNames.A2
                  : alienCharNames.B
              }
              rightAlien={
                {
                  selfPlay: alienB,
                  allPlay: alienA,
                  betweenPlay: alienA,
                  otherPlay: alienA,
                }[allThrowEvents.event2]
              }
              rightAlienFirstName={
                allThrowEvents.event2 === "selfPlay"
                  ? alienCharNames.B
                  : alienCharNames.A2
              }
              nextFunc={() => setFrameCount(3)}
            />
          ),
          // Event Three
          3: (
            <BallTossPlay
              trialNum="1"
              gameNum="3"
              throwEvent={allThrowEvents.event3}
              leftAlien={alienA}
              leftAlienFirstName={alienCharNames.A1}
              middleAlien={alienB}
              middleAlienFirstName={alienCharNames.B}
              rightAlien={alienA}
              rightAlienFirstName={alienCharNames.A2}
              nextFunc={() => setFrameCount(4)}
            />
          ),
          // "We're going to find out what kind of alien you would be on this planet. ...You're an A/B/C!"
          4: isKidMode ? (
            <BallTossGivenAlienKids
              playerAlien={alienUser}
              nextFunc={() => setFrameCount(5)}
            />
          ) : (
            <BallTossGivenAlien
              playerAlien={alienUser}
              nextFunc={() => getsToThrow ? setFrameCount(5) : setFrameCount(8)}
            />
          ),
          // “Who will you throw to?” A/B
          // if kid mode only ask throw question once
          5: (
            <BallTossPickAlien
              alienA={alienA}
              alienB={alienB}
              isKidMode={isKidMode}
              rep={1}
              nextFunc={
                isKidMode ? () => setFrameCount(8) : () => setFrameCount(6)
              }
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          // “Who will you throw to?” B/A
          6: (
            <BallTossPickAlien
              alienA={alienA}
              alienB={alienB}
              rep={2}
              nextFunc={() => setFrameCount(7)}
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          // “Who will you throw to?” A/B
          7: (
            <BallTossPickAlien
              alienA={alienA}
              alienB={alienB}
              rep={3}
              nextFunc={() => setFrameCount(8)}
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          // You threw to X and Y. Why?
          8: (
            <BallTossPickAlien
              alienA={alienA}
              alienB={alienB}
              rep={0}
              isKidMode={isKidMode}
              nextFunc={() => setFrameCount(9)}
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          // “Do you like A/B?”
          9: (
            <BallTossNewAlien
              set={0} // acts like unique ids to refresh component and the set number of the questions
              adj="like"
              alienA={alienA}
              alienB={alienB}
              isKidMode={isKidMode}
              nextFunc={
                isKidMode ? () => setFrameCount(11) : () => setFrameCount(10)
              }
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          // “Do you trust A/B?”
          10: (
            <BallTossNewAlien
              set={1}
              adj="trust"
              alienA={alienA}
              alienB={alienB}
              isKidMode={isKidMode}
              nextFunc={() => setFrameCount(11)}
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          // “A says that Bs are bad. Do you like/trust B?”
          11: (
            <BallTossAlienQuestion
              set="1-3"
              alienA={alienA}
              alienB={alienB}
              isKidMode={isKidMode}
              playerAlien={alienUser}
              nextFunc={() => setFrameCount(12)}
              setIngameQuestions={setIngameQuestions}
              ingameQuestions={ingameQuestions}
            />
          ),
          12: <BallTossTransition endText={endText} planet={planet} nextFunc={setTrialFunc} />,
        }[frameCount]
      }
    </div>
  );
}

export default BallTossGame;

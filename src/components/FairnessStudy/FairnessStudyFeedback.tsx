import React, { useState, useEffect, useContext } from "react";
import BallTossContext from "./BallTossContext";

import Aliens from "./Aliens";

function FairnessStudyFeedback() {
  const [feedback, setFeedback] = useState("");
  const [submitFeedback, setSubmitFeedback] = useState(false);

  const playerTime = useContext(BallTossContext);
  useEffect(() => {
    window.setTimeout(() => {
      window.open(
        "https://app.prolific.co/submissions/complete?cc=5BA4CA97",
        "_blank"
      );
    }, 1000);
  }, []);

  return (
    <div className="container flex flex-col mx-auto my-32">
      <p
        id="ball-toss-game-play-text"
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
        Thank you for completing the study!
      </p>
      <p
        id="ball-toss-game-play-text"
        className="text-xl  text-center text-gray-800 mb-6"
      >
        Note: A link to the Prolific website will open in a new tab within 5
        seconds... <br />
        If it does not, please click{" "}
        <a
          className="text-orange-500"
          href="https://app.prolific.co/submissions/complete?cc=5BA4CA97"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          here{" "}
        </a>{" "}
        to complete the study.
      </p>
      <p
        id="ball-toss-game-play-text"
        className="text-2xl  text-center text-gray-800 mb-6"
      >
        You have played a significant part in the contribution of our research!{" "}
        <br />
        The study you just participated in was designed to study how people
        react to social exclusion. All participants were shown some aliens
        excluding others, but the relationship of the player's character to the
        aliens could be different. Past research suggests that when we belong to
        the same group as someone engaging in social exclusion, we are often
        more motivated to justify or explain away this exclusion.
      </p>
      <p
        id="ball-toss-game-play-text"
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
        Questions or comments?
      </p>
      <p
        id="ball-toss-game-play-text"
        className="text-2xl text-center text-gray-800 mb-6"
      >
        Was anything unclear or confusing about this experiment? Feel free to
        share any questions or comments you have about it in the space below.
      </p>
      {submitFeedback ? (
        <div className="mt=4 ">
          {" "}
          <p
            id="ball-toss-game-play-text"
            className="text-2xl text-center text-orange-500 mb-6"
          >
            Thank you for your comments!
          </p>{" "}
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap text-lg -mx-3 mb-2">
            <div className="w-full px-3">
              <textarea
                onChange={(e) => setFeedback(e.target.value)}
                className="appearance-none block w-full h-64 bg-gray-100 placeholder-gray-600 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Add your thoughts here..."
              />
              <p className="text-gray-800 text-xs italic">
                Make it as long as you'd like!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitFeedback(true);
              fetch("/api/v1/fairness-study/results", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  participantStartTime: playerTime,
                  feedback: feedback,
                }),
              });
            }}
            className="bg-orange-100 hover:bg-orange-300 w-full mb-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
          >
            Submit
          </button>
        </div>
      )}
      <p
        id="ball-toss-game-play-text"
        className="text-2xl  text-center text-gray-800 mb-6"
      >
        If you would like to receive a report of the findings of this study when
        it is completed, feel free to contact Dr. Cunningham and his team at{" "}
        <a
          className="text-orange-500"
          href="mailto:teamstudy@socialneuro.psych.utoronto.ca"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          teamstudy@socialneuro.psych.utoronto.ca{" "}
        </a>{" "}
        .
        <br />
        <br />
        If you have concerns about this study or your rights as a participant of
        this experiment, you are encouraged to contact the Office of Research
        Ethics at{" "}
        <a
          className="text-orange-500"
          href="mailto:ethics.review@utoronto.ca"
          rel="noopener noreferrer"
          target="_blank"
        >
          {" "}
          ethics.review@utoronto.ca{" "}
        </a>{" "}
        or (416) 946-3273.
      </p>
      <div className="flex justify-around mx-16 my-32 -ml-4">
        <Aliens.A.Front />
        <Aliens.B.Front />
        <Aliens.G.Front />
      </div>
      <div className="flex justify-around mx-16 my-32 -ml-4">
        <Aliens.C.Front />
        <Aliens.D.Front />
        <Aliens.L.Front />
      </div>
      <div className="flex justify-around mx-16 my-32 -ml-4">
        <Aliens.E.Front />
        <Aliens.F.Front />
        <Aliens.N.Front />
      </div>
      <div className="flex justify-around mx-16  my-32 -ml-4">
        <Aliens.H.Front />
        <Aliens.M.Front />
        <Aliens.I.Front />
      </div>

      <div className="flex mb-10"></div>
    </div>
  );
}

export default FairnessStudyFeedback;

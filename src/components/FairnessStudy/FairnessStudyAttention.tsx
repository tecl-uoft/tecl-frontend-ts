import React, { useState, useContext } from "react";
import BallTossContext from "./BallTossContext";
import SingleFairnessQuestion from "./FairnessStudyQuestions/SingleFairnessQuestion";

interface IFairnessStudyAttentionProps {
  setTrialFunc(): void;
}

function FairnessStudyAttention(props: IFairnessStudyAttentionProps) {
  const [alienName, setAlienName] = useState("");
  const [ballColor, setBallColor] = useState("");
  const [questionSol, setQuestionSol] = useState(0);
  const playerTime = useContext(BallTossContext);
  const { setTrialFunc } = props;

  return (
    <div className="container flex flex-col mx-auto my-32">
      <div className="flex flex-col mb-16">
        <h3 className="text-2xl text-center text-gray-800 ">
          Pick the color that closely matches the color of the ball that the
          aliens were throwing around.
        </h3>

        <div className="flex flex-col mb-4 px-32">
          <button
            onClick={() => {
              setBallColor("red");
            }}
            className={`bg-red-100 hover:bg-red-300 w-full mt-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider ${
              ballColor === "red" ? "bg-red-300" : ""
            }`}
          >
            Red
          </button>
          <button
            onClick={() => {
              setBallColor("blue");
            }}
            className={`bg-blue-100 hover:bg-blue-300 w-full mt-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider ${
              ballColor === "blue" ? "bg-blue-300" : ""
            }`}
          >
            Blue
          </button>
          <button
            onClick={() => {
              setBallColor("green");
            }}
            className={`bg-green-100 hover:bg-green-300 w-full mt-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider ${
              ballColor === "green" ? "bg-green-300" : ""
            }`}
          >
            Green
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-2xl text-center mb-6 text-gray-800">
          Name one of the aliens that you saw playing the game.
        </h3>
        <input
          type="text"
          onChange={(e) => setAlienName(e.target.value)}
          className="appearance-none block w-1/2 mx-auto h-12 bg-gray-100 placeholder-gray-600 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder="Write the name here here..."
        />
      </div>
      <SingleFairnessQuestion
        questionSol={questionSol}
        setQuestionSol={setQuestionSol}
        key={1}
        setNum={3}
        scale={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        number={1}
        question={{
          text:
            "How much do you think it's the rule that aliens throw to their own kind?",
        }}
      />

      {ballColor && alienName && questionSol ? (
        <button
          onClick={() => {
            fetch("/api/v1/fairness-study/results", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                participantStartTime: playerTime,
                throwJustification: questionSol,
                ballColor: ballColor,
                alienNamed: alienName,
              }),
            });
            setTrialFunc();
          }}
          className="bg-orange-100 hover:bg-orange-300 w-full mt-12 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
        >
          Submit
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default FairnessStudyAttention;

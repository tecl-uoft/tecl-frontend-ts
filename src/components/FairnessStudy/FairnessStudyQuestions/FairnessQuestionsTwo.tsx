import React, { useState, useContext } from "react";
import SingleFairnessQuestion from "./SingleFairnessQuestion";
import BallTossContext from "../BallTossContext";

interface IFairnessQuestionsTwoProps {
  questionOrder: any[],
  setTrialFunc(): void
}

function FairnessQuestionsTwo(props: IFairnessQuestionsTwoProps) {
  const { questionOrder, setTrialFunc } = props;
  const playerTime = useContext(BallTossContext);
  const [questionSol, setQuestionSol] = useState(null as any);

  const questionPool = [
    {
      text: "There are people I can depend on to help me if I really need it",
      questionNum: 1,
    },
    {
      text: "There are people who enjoy the same social activities I do",
      questionNum: 2,
    },
    {
      text:
        "I feel part of a group of people who share my attitudes and beliefs",
      questionNum: 3,
    },
    {
      text:
        "I have close relationships that provide me with a sense of emotional security and well-being",
      questionNum: 4,
    },
    {
      text:
        "There is someone I could talk to about important decisions in my life",
      questionNum: 5,
    },
    {
      text:
        "I have relationships where my competence and skills are recognized",
      questionNum: 6,
    },
    {
      text:
        "There is a trustworthy person I could turn to for advice if I were having problems",
      questionNum: 7,
    },
    {
      text: "I feel a strong emotional bond with at least one other person",
      questionNum: 8,
    },
    {
      text: "There are people who admire my talents and abilities",
      questionNum: 9,
    },
    {
      text: "There are people I can count on in an emergency",
      questionNum: 10,
    },
  ];

  const scale = [
    "Strongly Disagree",
    "Disagree",
    "Slightly disagree",
    "Slightly agree",
    "Agree",
    "Strongly Agree",
  ];
  return (
    <div className="container mt-16 mx-auto px-2 pt-4">
      <p
        id="ball-toss-game-play-text"
        className="text-2xl  text-center text-gray-800 mb-6"
      >
        Finally, please indicate how much you agree with the following statements.
      </p>
      {questionPool.map((name, index) => {
        return (
          <SingleFairnessQuestion
            questionSol={questionSol}
            setQuestionSol={setQuestionSol}
            key={index + 21}
            setNum={2}
            scale={scale}
            number={index + 1}
            question={questionPool[questionOrder[index]]} // choose the question from the given array
          />
        );
      })}
      <div className="flex justify-around my-12">
        <button
          onClick={() => {
            const currTime = new Date().getTime();
            const questionArr = questionPool.map((question, _) => {
              return {
                question: question.text,
                questionOrder: question.questionNum,
                randomizedOrder: questionOrder[question.questionNum],
                answer: questionSol[question.questionNum],
              };
            });
            const messageBody = {
              studyQuestionsTwoResponse: questionArr,
              participantStartTime: playerTime,
              participantFinishTime: currTime,
            };
            fetch("/api/v1/fairness-study/results", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(messageBody),
            });
            window.scrollTo(0, 0);
            setTrialFunc();
          }}
          className="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg tracking-wider"
        >
          Finish and Submit
        </button>
      </div>
    </div>
  );
}

export default FairnessQuestionsTwo;

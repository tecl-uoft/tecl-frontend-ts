import React, { useState, useContext } from "react";
import SingleFairnessQuestion from "./SingleFairnessQuestion";
import BallTossContext from "../BallTossContext";

interface IFairnessQuestionsOneProps {
  questionOrder: number[];
  setTrialFunc: Function;
}

function FairnessQuestionsOne(props: IFairnessQuestionsOneProps) {
  const { questionOrder, setTrialFunc } = props;
  const playerTime = useContext(BallTossContext);
  const [questionSol, setQuestionSol] = useState(null as any);

  const questionPool = [
    {
      text: "I’d rather depend on myself than others",
      questionNum: 1,
    },
    {
      text: "If a coworker gets a prize, I would feel proud",
      questionNum: 2,
    },
    {
      text: "It is important that I do my job better than others",
      questionNum: 3,
    },
    {
      text: "Parents and children must stay together as much as possible",
      questionNum: 4,
    },
    {
      text: "I rely on myself most of the time; I rarely rely on others",
      questionNum: 5,
    },
    {
      text: "The well-being of my coworkers is important to me",
      questionNum: 6,
    },
    {
      text: "Winning is everything",
      questionNum: 7,
    },
    {
      text:
        "It is my duty to take care of my family even when I have to sacrifice what I want",
      questionNum: 8,
    },
    {
      text: "My personality independent of others is very important to me",
      questionNum: 9,
    },
    {
      text: "To me, pleasure is spending time with others",
      questionNum: 10,
    },
    {
      text: "Competition is the law of nature",
      questionNum: 11,
    },
    {
      text:
        "Family members should stick together no matter what sacrifices are required",
      questionNum: 12,
    },
    {
      text: "I prefer to be direct and forthright when discussing with people",
      questionNum: 13,
    },
    {
      text: "I feel good when I cooperate with others",
      questionNum: 14,
    },
    {
      text: "When another person does better than I do, I get tense",
      questionNum: 15,
    },
    {
      text:
        "It is important to me that I respect the decisions made by my groups",
      questionNum: 16,
    },
    {
      text: "I have a strong need to belong",
      questionNum: 17,
    },
  ];
  const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="container mt-16 mx-auto px-2 pt-4">
      <p
        id="ball-toss-game-play-text"
        className="text-2xl  text-center text-gray-800 mb-6"
      >
        Please indicate how much you agree with the following statements on a
        scale from 1 to 9. 1 indicates complete disagreement, and 9 indicates
        complete agreement.
      </p>
      {questionPool.map((val, index) => {
        return (
          <SingleFairnessQuestion
            questionSol={questionSol}
            setQuestionSol={setQuestionSol}
            key={index}
            setNum={1}
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
              studyQuestionsOneResponse: questionArr,
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
          className="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider"
        >
          To The Last Page!
        </button>
      </div>
    </div>
  );
}

export default FairnessQuestionsOne;

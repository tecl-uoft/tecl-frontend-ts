import React, { useState, useEffect } from "react";

interface ISingleFairnessQuestionProps {
  question: any;
  number: number;
  scale: (number | string)[];
  setNum: number;
  setQuestionSol(questionSol: any): void;
  questionSol: any;
}

enum QuestionType {
  Default = 0,
  TypeA = 1,
  TypeB = 2,
  TypeC = 3,
}

function SingleFairnessQuestion(props: ISingleFairnessQuestionProps) {
  const [rating, setRating] = useState(0);
  const {
    question,
    number,
    scale,

    setQuestionSol,
    questionSol,
  } = props;
  // const [playerQuestions, setPlayerQuestions] = useState([]);
  useEffect(() => {
    if (questionSol && props.setNum !== 3) {
      questionSol[question.questionNum] = rating;
      setQuestionSol(questionSol);
    } else {
      setQuestionSol(rating);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  function setQuestionText(setNum: number): string {
    switch (setNum) {
      case QuestionType.TypeA:
        return `${number}. ${question.text}.`;
      case QuestionType.TypeB:
        return `${number}. ${question.text}.`;
      case QuestionType.TypeC:
        return `${question.text}?`;
      default:
        return "Error";
    }
  }

  function setLabelStyle(setNum: number) {
    switch (setNum) {
      case QuestionType.TypeA:
        return (
          <div className="flex justify-between mb-6">
            <p className="text-lg  text-center text-gray-800 ">
              Complete Disagreement
            </p>
            <p className="text-lg  text-center text-gray-800 mr-4">Neutral</p>
            <p className="text-lg  text-center text-gray-800">
              Complete Agreement
            </p>
          </div>
        );
      case QuestionType.TypeB:
        return null;
      case QuestionType.TypeC:
        return (
          <div className="flex justify-between mb-6 mx-4">
            <p className="text-lg  text-center text-gray-800 ">Never</p>
            <p className="text-lg  text-center text-gray-800 ">Sometimes</p>
            <p className="text-lg  text-center text-gray-800">Always</p>
          </div>
        );
    }
  }

  return (
    <div className="container mb-2 px-2 pt-4 text-lg text-gray-800 my-16">
      <p className=" mb-2 flex text-2xl"> {setQuestionText(props.setNum)}</p>
      <div className="flex justify-around space-x-12 bg-orange-100 rounded-full">
        {scale.map(function (name, index) {
          return (
            <button
              key={index}
              onClick={() => {
                setRating(name as number);
              }}
              className={` bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg focus:outline-none  tracking-wider
              ${props.setNum === 2 ? "w-32 h-16" : "w-16 h-16 uppercase"}
              ${rating === name ? "bg-orange-400 hover:bg-orange-400" : ""}`}
            >
              {name}
            </button>
          );
        })}
      </div>
      {setLabelStyle(props.setNum)}
    </div>
  );
}

export default SingleFairnessQuestion;

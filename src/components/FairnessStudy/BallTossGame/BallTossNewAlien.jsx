import React, { useState, useEffect } from "react";

function BallTossNewAlien(props) {
  const {
    alienA,
    alienB,
    nextFunc,
    adj,
    set,
    setIngameQuestions,
    ingameQuestions,
  } = props;

  const scale = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [likeA, setLikeA] = useState(0);
  const [likeB, setLikeB] = useState(0);
  const [scrollBot, setScrollBot] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLikeA(0);
    setLikeB(0);
    setScrollBot(false);
  }, [set]);

  useEffect(() => {
    if (likeA && likeB && !scrollBot) {
      setScrollBot(true);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [likeA, likeB, scrollBot]);

  return (
    <div>
      <p class="text-2xl font-bold text-center text-gray-800">
        On a scale of 1 to 9, how much do you{" "}
        <span className="text-orange-500 inline">{adj}</span> this {alienA.name}
        ?
      </p>
      <div class="mr-24 mt-16 mb-64 flex justify-around">
        {<alienA.Front />}
      </div>
      <div class="flex justify-around space-x-6 rounded-full">
        {scale.map(function (rating, index) {
          return (
            <button
              key={index}
              onClick={() => {
                setLikeA(rating);
              }}
              className={`w-full h-12 bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg focus:outline-none  tracking-wider
              ${rating === likeA ? "bg-orange-400 hover:bg-orange-400" : ""}`}
            >
              {rating}
            </button>
          );
        })}
      </div>
      <div class="flex justify-between mb-6 px-4">
        <p class="text-lg  text-center text-gray-800 ">Very Little</p>
        <p class="text-lg  text-center text-gray-800 mr-8">Neutral</p>
        <p class="text-lg  text-center text-gray-800">A Lot</p>
      </div>
      <p class="text-2xl mt-16 font-bold text-center text-gray-800">
        On a scale of 1 to 9, how much do you{" "}
        <span className="text-orange-500 inline">{adj}</span> this {alienB.name}
        ?
      </p>
      <div class="mr-24 mt-16 mb-64 flex justify-around">
        {<alienB.Front />}
      </div>
      <div class="flex justify-around space-x-6 rounded-full">
        {scale.map(function (rating, index) {
          return (
            <button
              key={index}
              onClick={() => {
                setLikeB(rating);
              }}
              className={`w-full h-12 bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg focus:outline-none  tracking-wider
              ${rating === likeB ? "bg-orange-400 hover:bg-orange-400" : ""}`}
            >
              {rating}
            </button>
          );
        })}
      </div>
      <div class="flex justify-between mb-16 px-4">
        <p class="text-lg  text-center text-gray-800 ">Very Little</p>
        <p class="text-lg  text-center text-gray-800 mr-8">Neutral</p>
        <p class="text-lg  text-center text-gray-800">A Lot</p>
      </div>

      {likeA && likeB ? (
        <div class="mb-16">
          <div class="flex justify-around">
            <button
              onClick={() => {
                setIngameQuestions([
                  ...ingameQuestions,
                  {
                    questionOrder: 2 + set * 3,
                    question:
                      "On a scale of 1 to 9, how much do you " +
                      adj +
                      " " +
                      alienA.name,
                    answer: likeA,
                  },
                  {
                    questionOrder: 3 + set * 3,
                    question:
                      "On a scale of 1 to 9, how much do you " +
                      adj +
                      " " +
                      alienB.name,
                    answer: likeB,
                  },
                ]);
                nextFunc();
              }}
              class="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BallTossNewAlien;

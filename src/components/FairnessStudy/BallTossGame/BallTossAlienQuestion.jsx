import React, { useState, useEffect } from "react";

function BallTossAlienQuestion(props) {
  const {
    alienA,
    alienB,
    // playerAlien,
    nextFunc,
    set,
    setIngameQuestions,
    ingameQuestions,
    isKidMode,
  } = props;
  const [likeA, setLikeA] = useState(0);

  const scale = isKidMode ? ["Not at all", "Not very much", "A little bit", "A lot"] : [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    window.scrollTo(0, 0);
    setLikeA(0);
  }, [set]);

  return (
    <div>
      <p class="text-2xl font-bold text-center text-gray-800 mb-16">
        {isKidMode ? "Oh no!" : ""} This <span className="text-orange-500 inline"> {alienA.name} </span>{" "}
        says that the{" "}
        <span className="text-orange-500 inline"> {alienB.name} </span>
        over there is {isKidMode ? "mean" : "selfish"}. <br /> {isKidMode ? `Do you trust what this ${alienA.name} says?` : 
        `On a scale of 1 to 9, how much do you trust this ${alienB.name}?`}
      </p>
      <div class="flex justify-around text-gray-800 text-2xl mb-16">
        <div class="">
          {<alienA.Front />}
          <p class="alien-label font-bold flex">{alienA.name}</p>
        </div>
        <div class="">
          {<alienB.Front />}
          <p class="alien-label font-bold flex">{alienB.name}</p>
        </div>
      </div>
      <div class="flex justify-around space-x-6 rounded-full">
        {scale.map(function (rating, index) {
          return (
            <button
              key={index}
              onClick={() => {
                setLikeA(rating);
              }}
              className={`w-full h-12 bg-orange-100 hover:shadow-lg hover:bg-orange-200  font-bold rounded-lg    tracking-wider
              ${rating === likeA ? "bg-orange-400 hover:bg-orange-400" : ""}`}
            >
              {rating}
            </button>
          );
        })}
      </div>
      <div class="flex justify-between mb-6 px-4">
        <p class="text-lg  text-center text-gray-800 ">{isKidMode ? "" : "Very little"}</p>
        <p class="text-lg  text-center text-gray-800 mr-8">{isKidMode ? "" : "Neutral"}</p>
        <p class="text-lg  text-center text-gray-800">{isKidMode ? "" : "A lot"}</p>
      </div>

      {likeA ? (
        <div class="my-16">
          <div class="flex justify-around">
            <button
              onClick={() => {
                // record the answer to ball throw question
                setIngameQuestions([
                  ...ingameQuestions,
                  {
                    questionOrder: 8,
                    question: `This ${alienA.name} says that the ${alienB.name} over there is mean. Do you trust this ${alienB.name}?`,
                    answer: likeA,
                  },
                ]);
                nextFunc();
              }}
              class="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg   uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BallTossAlienQuestion;

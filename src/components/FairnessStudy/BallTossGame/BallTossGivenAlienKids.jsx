import React, { useState } from "react";

function BallTossGivenAlienKids(props) {
  
  const [showPlayText, setShowPlayText] = useState(false);
  const { nextFunc, playerAlien } = props;
  //window.setTimeout(() => setShowPlayText(true), 1000);
  return (
    <div>
      {showPlayText ? (
        <div class="mt-16">
          <div class="mr-24 mb-64 flex justify-around">
            {<playerAlien.Front />}
          </div>
          <p
            id="ball-toss-game-play-text"
            class="text-4xl font-bold text-center text-gray-800 mb-6"
          >
            Wow, you're a{" "}
            <span class="text-orange-500 inline"> {playerAlien.name}</span>!
          </p>
          <div class="flex justify-around">
            <button
              onClick={() => {
                nextFunc();
              }}
              class="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        </div>
      ) : 
      (
      <div class="mt-16">
        <div class="mr-0 mb-16 flex justify-around">
          <img id="machine" src="/assets/fairness_img/machine.png" alt="Machine" style={{height: "300px", maxWidth: "100%"}}/>
        </div>
        <p
            id="ball-toss-game-play-text"
            class="text-4xl font-bold text-center text-gray-800 mb-6"
          >
            Let's see what kind of alien you are...
          </p>
          <div class="flex justify-around">
            <button
              onClick={() => {
                setShowPlayText(true);
              }}
              class="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider"
            >
              Press the button!
            </button>
          </div>
      </div>
      )}
    </div>
  );
}

export default BallTossGivenAlienKids;
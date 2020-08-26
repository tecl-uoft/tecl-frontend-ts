import React, { useState } from "react";
import "./ballTossIntro.css";

function BallTossIntro(props) {
  const [showPlayText, setShowPlayText] = useState(false);
  window.setTimeout(() => setShowPlayText(true), 2000);
  const { alienA, alienB, isKidMode } = props;

  return (
    <div>
      <h3 class="text-4xl font-bold text-center text-gray-800 mb-16">
        {isKidMode
          ? "Here are the family names of the aliens we are watching!"
          : "Here are the names of their species and what they look like:"}
        {/* Now you're going to learn about some aliens that live on this planet. */}
      </h3>
      <div class="flex justify-around text-gray-800 text-2xl mb-16">
        <div class="mx-16 lg:mx-32">
          {<alienA.Front />}
          <p class="alien-label font-bold flex">{alienA.name} </p>
        </div>
        <div class="mx-16 lg:mx-32">
          {<alienB.Front />}
          <p class="alien-label font-bold flex">{alienB.name} </p>
        </div>
      </div>
      {showPlayText ? (
        <div>
          <p
            id="ball-toss-game-play-text"
            class="text-4xl font-bold text-center text-gray-800 mb-6"
          >
            Let's learn about how they play games.
          </p>
          <div class="flex justify-around">
            <button
              onClick={() => props.nextFunc(1)}
              class="bg-orange-100 hover:text-orange-500 font-bold w-full rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BallTossIntro;

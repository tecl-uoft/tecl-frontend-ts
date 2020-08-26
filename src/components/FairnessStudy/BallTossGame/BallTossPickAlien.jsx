import React, { useState, useEffect } from "react";

function BallTossPickAlien(props) {
  const [selected, setSelected] = useState(0);
  const [alienAPicked, setAlienAPicked] = useState(0);
  const [alienBPicked, setAlienBPicked] = useState(0);
  const [pickResponse, setPickResponse] = useState("");
  const [scrollBot, setScrollBot] = useState(false);

  const {
    alienA,
    alienB,
    nextFunc,
    rep,
    isKidMode,
    setIngameQuestions,
    ingameQuestions,
  } = props;

  useEffect(() => {
    if (pickResponse && !scrollBot) {
      setScrollBot(true);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [pickResponse, scrollBot]);

  async function submitResponse() {
    if (rep === 0) {
      setIngameQuestions([
        ...ingameQuestions,
        {
          questionOrder: 1,
          question: `Who will you throw a ball to? ${alienA.name} or ${alienB.name}?`,
          answer: {
            pickCount: { 0: alienAPicked, 1: alienBPicked },
            reasoning: pickResponse,
          },
        },
      ]);
    }
    switch (selected) {
      case 1:
        setAlienAPicked(alienAPicked + 1);
        break;
      case 2:
        setAlienBPicked(alienBPicked + 1);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {rep ? (
        <div>
          <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">
            Pick an Alien
          </h3>
          <h3 class="text-2xl font-bold text-center text-gray-800 mb-16">
            {rep > 1
              ? "It's your turn again. Who will you throw the ball to?"
              : "It's your turn. Who will you throw the ball to?"}
            <br /> (Click One)
          </h3>
          <div class="flex justify-around text-gray-800 text-2xl mb-16 mt-16">
            {rep % 2 ? (
              <AlienDisplay
                selectedNum={1}
                Alien={alienA}
                selected={selected}
                setSelected={setSelected}
              />
            ) : (
              <AlienDisplay
                selectedNum={2}
                Alien={alienB}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {rep % 2 ? (
              <AlienDisplay
                selectedNum={2}
                Alien={alienB}
                selected={selected}
                setSelected={setSelected}
              />
            ) : (
              <AlienDisplay
                selectedNum={1}
                Alien={alienA}
                selected={selected}
                setSelected={setSelected}
              />
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">
            You picked{" "}
            {`the ${alienA.name} ${alienAPicked} time${
              alienAPicked > 1 ? "s" : ""
            }`}
            <br /> and
            {` the ${alienB.name} ${alienBPicked} time${
              alienBPicked > 1 ? "s" : ""
            }`}
          </h3>
          <h3 class="text-2xl font-bold text-center text-gray-800 mb-16">
            {isKidMode
              ? `Why did you pick them?`
              : "Why did you throw it to them in this manner?"}
          </h3>
          <div className="flex justify-around text-gray-800 text-2xl mb-16 mt-16">
            <div className="mx-32">
              {<alienA.Front />}
              <p class="alien-label font-bold flex">
                {alienA.name} <br />
                {`(${alienAPicked} time${alienAPicked > 1 ? "s" : ""})`}
              </p>
            </div>
            <div className="mx-32">
              {<alienB.Front />}
              <p class="alien-label font-bold flex">
                {alienB.name} <br />
                {`(${alienBPicked} time${alienBPicked > 1 ? "s" : ""})`}
              </p>
            </div>
          </div>
          <div class="flex flex-wrap  text-lg -mx-3 mb-2">
            <div class="px-3 w-full flex justify-center">
              <textarea
                onChange={(e) => setPickResponse(e.target.value)}
                class="appearance-none block w-3/4 h-32 bg-gray-300 placeholder-gray-700 text-gray-800 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Add your thoughts here..."
              />
            </div>
          </div>
        </div>
      )}

      {selected || pickResponse ? (
        <div class="m-16">
          <div class="flex justify-around">
            <button
              onClick={async () => {
                //  0 (throw to the excluding character) or 1 (throw to the excluded character)
                // record the answer to ball throw question

                await submitResponse();
                setSelected(0);

                nextFunc();
              }}
              class="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AlienDisplay(props) {
  const { selectedNum, Alien, selected, setSelected } = props;

  return (
    <div
      onClick={() => setSelected(selectedNum)}
      className={`mx-32 hover:text-orange-500 cursor-pointer ${
        selected === selectedNum ? "text-orange-500 underline" : ""
      }`}
    >
      {<Alien.Front />}
      <p class="alien-label font-bold flex"> {Alien.name} </p>
    </div>
  );
}

export default BallTossPickAlien;

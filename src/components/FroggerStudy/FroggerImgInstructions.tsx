import React, { useState } from "react";
import ErrorNotFound from "../../pages/ErrorNotFound";

function FroggerImgInstructions({ nextState }: { nextState: () => void }) {
  const [currentPage, setCurrentPage] = useState(1);

  const onNextClick = () => {
    if (currentPage < 6) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const isAdult = urlParams.get('p_type') === "adult"
      if (isAdult && (currentPage === 5)){  // if adult skip
        nextState()
      }
      setCurrentPage(currentPage + 1);
    } else {
      // console.log(currentPage);
      nextState();
    }
  };

  const cycleStudyStates = (instructionPage: number) => {
    let state = null;
    switch (instructionPage) {
      case 1:
        state = (
          <div>
            Great! We’re ready to start! <br /> Please make sure to carefully
            read each screen.
          </div>
        );
        break;
      case 3:
        state = (
          <div>
            This is Frog! You’ll play as Frog in today’s game. <br /> To move
            Frog, use the arrows on your keyboard:
            <img
              alt={"Inst"}
              className="h-48 mx-auto"
              src={"/assets/frogger/inp1.png"}
            />
          </div>
        );
        break;
      case 5:
        state = (
          <div>
            In the game, the enemies are chickens! <br /> Jump on them to get
            rid of them!
            <img
              alt={"Inst"}
              className="h-48 mx-auto"
              src={"/assets/frogger/inp2.png"}
            />
          </div>
        );
        break;
      case 6:
        state = (
          <div>
            Parents, you can help with practice but make sure that kids do as
            much as possible!
          </div>
        );
        break;
      case 7:
        state = (
          <div>
            “IMPORTANT: Parents! We want to see what your child does all on
            their own, so please don’t help them or say anything at all, even if
            your child asks questions. The moderator will intervene if there is
            a technical error.
          </div>
        );
        break;
      case 4:
        state = (
          <div>
            There is also fruit! <br /> If you want, you can collect it, but you
            don’t have to.
            <img
              alt={"Inst"}
              className="h-48 mx-auto"
              src={"/assets/frogger/inp3.png"}
            />
          </div>
        );
        break;
      case 2:
        state = (
          <div>
            YOUR GOAL: <br /> Find a trophy to win.
            <img
              alt={"Inst"}
              className="h-48 mx-auto"
              src={"/assets/frogger/inp4.png"}
            />
          </div>
        );
        break;
      default:
        state = <ErrorNotFound />;
    }
    return state;
  };

  return (
    <div className="flex justify-center w-full h-screen p-4">
      <h3 className="flex flex-col justify-between w-full text-4xl text-center rounded-lg">
        <div className="underline">Page {currentPage}</div>
        {cycleStudyStates(currentPage)}
        <button
          onClick={onNextClick}
          className="w-1/2 px-8 py-4 mx-auto mb-4 text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 "
        >
          Next
        </button>
      </h3>
    </div>
  );
}

export default FroggerImgInstructions;

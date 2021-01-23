import React, { useEffect } from "react";

interface IBallTossTransitionProps {
  endText: string;
  planet: string;
  isKidMode: boolean;
  nextFunc(): void;
}

function BallTossTransition(props: IBallTossTransitionProps) {
//   useEffect(() => {
//     window.setTimeout(() => {
//       props.nextFunc();
//     }, 10000);
//     // disabling no dep warning
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
  return (
    <div><div className="container my-64 mx-auto px-2 pt-4">
      {props.isKidMode ? ( <div className="mb-0 flex justify-around">
        <img id="planet" src={props.planet} style={{height: "300px"}} />
      </div> ) : null }
      <p
        id="ball-toss-game-play-text"
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
        {props.endText}
      </p>
      </div>
    <div className="flex justify-around">
      <button
        onClick={() => {
          props.nextFunc();
        }}
        className="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider"
        >
    	Next
        </button>      
    </div></div>
  );
}

export default BallTossTransition;

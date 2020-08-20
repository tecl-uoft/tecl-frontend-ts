import React, { useEffect } from "react";

interface IBallTossTransitionProps {
  endText: string;
  nextFunc(): void;
}

function BallTossTransition(props: IBallTossTransitionProps) {
  useEffect(() => {
    window.setTimeout(() => {
      props.nextFunc();
    }, 3000);
    // disabling no dep warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container my-64 mx-auto px-2 pt-4">
      <p
        id="ball-toss-game-play-text"
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
        {props.endText}
      </p>
    </div>
  );
}

export default BallTossTransition;

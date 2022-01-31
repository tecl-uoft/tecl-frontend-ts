import React from "react";

interface IGoalReminder {
  nextState: () => void;
}

const GoalReminder: React.FC<IGoalReminder> = ({ nextState }) => {
  return (
    <div className="flex justify-center w-full h-screen p-4">
      <h3 className="flex flex-col justify-between w-full text-4xl text-center rounded-lg">
        <div> </div>
        <div className="">
        Remember, the main goal of the game is to find a trophy, <br /> but you can do
        it any way you find!
        </div>
        <button
          onClick={nextState}
          className="w-1/2 px-8 py-4 mx-auto mb-4 text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 "
        >
          Next
        </button>
      </h3>
    </div>
  );
};

export default GoalReminder;

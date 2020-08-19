import React from "react";

interface IStudyNextButtonProps {
  nextStateFunc: Function;
}

function StudyNextButton(props: IStudyNextButtonProps) {
  const { nextStateFunc } = props;
  return (
    <div className="flex justify-around mt-6">
      <button
        onClick={() => nextStateFunc()}
        className="bg-orange-200 hover:bg-orange-400 font-bold w-full rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
      >
        Next
      </button>
    </div>
  );
}

export default StudyNextButton;

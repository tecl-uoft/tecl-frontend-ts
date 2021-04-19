import React from "react";
import StudyNextButton from "../common/StudyNextButton";

function DemographicQuestions(props: { nextState: () => void }) {
  const { nextState } = props;
  return (
    <div className="flex flex-col w-full pb-8 space-y-4 text-2xl">
      <p className="mx-4 my-64 text-center">
        You’re almost done! We just have some surveys for you to finish. <br />{" "}
        <br />
        Some will be for parents to fill out and others will be for children to
        fill out -- <br />
        we’ll let you know on every screen who should fill out the form!
      </p>
      <button
        onClick={nextState}
        className="w-3/4 px-8 py-4 mx-auto text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
}

export default DemographicQuestions;

import React from "react";
import { IStudyName } from "../../services/StudyService";

interface IInstructionNavProps {
  setCurrentStudy: React.Dispatch<React.SetStateAction<IStudyName | undefined>>;
  currentStudy: IStudyName | undefined;
}

export function InstructionNav(props: IInstructionNavProps) {
  const { setCurrentStudy, currentStudy } = props;
  return (
    <React.Fragment>
      <button
        onClick={() => {
          setCurrentStudy(undefined);
        }}
        className={`text-md font-semibold rounded-lg bg-orange-500 text-white border-4 focus:outline-none
          ${currentStudy === undefined ? "border-gray-800" : "border-white"}`}
      >
        <div className="w-full px-2 py-1 border-2 border-white rounded-lg">
          Instructions
        </div>
      </button>
    </React.Fragment>
  );
}

export function Instructions() {
  return (
    <>
      <h1 className="ml-4 text-4xl font-bold text-center text-gray-800 underline">
        {" "}
        Instructions{" "}
      </h1>
      <ol className="flex flex-col my-4 space-y-2 text-xl">
        <li>
          <strong>Step 1.</strong> Click on one the colored buttons at the top,
          depending on the study you want to pick.
        </li>
        <li>
          <strong>Step 2.</strong> Read the age requirements and study
          description before signing up for the study.{" "}
        </li>
        <li>
          <strong>Step 3.</strong> Scroll or leaf through the interactive
          calendar and find available spots for the study. The time intervals
          should have the same color as the button selected in step 1.
        </li>
        <li>
          <strong>Step 4. </strong>Click on the time interval that best suits
          you needs and fill out the information asked within the form!
        </li>
        <li>
          <strong>Step 5. </strong> Wait for an email with the link to your
          online meetup!
        </li>
        <li>
          <strong className="text-2xl">
            Sign up to hear when new and fun online studies come out for your
            child at{" "}
            <a
              className="text-blue-600 no-underline hover:underline"
              href="https://www.tecl.ca/sign-up"
              target="_blank"
              rel="noopener noreferrer"
            >
              tecl.ca/sign-up
            </a>
            !
          </strong>
        </li>
      </ol>
    </>
  );
}

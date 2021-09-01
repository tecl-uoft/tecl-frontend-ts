import React, { useEffect, useState } from "react";
import Input from "../common/Input";
import { notify } from "../Notification";

interface QualtricsLinkProps {
  nextState: () => void;
}

export const QualtricsLink: React.FC<QualtricsLinkProps> = ({ nextState }) => {
  const [surveyLink, setSurveyLink] = useState("");
  const [qualCode, setQualCode] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.get("type") === "adult"
      ? setSurveyLink(
          "https://utorontopsych.az1.qualtrics.com/jfe/form/SV_etCVQJDH8Kfhv5Y"
        )
      : setSurveyLink(
          "https://utorontopsych.az1.qualtrics.com/jfe/form/SV_cuVNEY21UF61cOi"
        );
  }, []);

  return (
    <>
      <div className="container px-4 py-2 pt-64 mx-auto mb-5 text-2xl font-bold text-center ">
        <span className="">
          {" "}
          For this next part of the experiment, we have some surveys for you to
          complete on Qualtrics. At the end of the survey, you will receive a
          code to paste into the box below to receive credit for taking our
          survey. Make sure to leave this window open as you complete the
          survey. When you are finished, you will return to this page to paste
          the code into the box. <br /> <br />
        </span>
        <span>
          Link:{" "}
          <a
            className="text-lg text-blue-600 hover:underline"
            href={surveyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {surveyLink}
          </a>
        </span>
      </div>
      <div className="flex justify-center space-x-6 text-lg">
        <div className="pt-2">Provide the survey code here: </div>
        <div className="text-lg ">
          <Input
            type="text"
            placeholder={"Add your code here."}
            value={qualCode}
            valueSetter={setQualCode}
          />{" "}
        </div>
      </div>
      <div className="flex justify-center w-full my-6 ">
        <NextButton
          setNextState={() => {
            qualCode
              ? nextState()
              : notify.error("Please enter a Qualtrics code.");
          }}
        />
      </div>
    </>
  );
};

function NextButton({ setNextState }: { setNextState: () => void }) {
  return (
    <button
      onClick={setNextState}
      className="w-3/4 px-8 py-4 mx-auto text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
    >
      Next
    </button>
  );
}

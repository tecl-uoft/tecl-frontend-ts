import React, { useState } from "react";
import { LikertScale } from "../Questions";
import MultiChoice from "../Questions/MultiChoice";
import * as questionAndChocicesDefault from "./demoQ.json";

function DemographicQuestions(props: { nextState: () => void }) {
  const { nextState } = props;
  const [demoState, setDemoState] = useState(2);

  const updateState = (demoState: number) => {
    switch (demoState) {
      case 0:
        return <InitalInst setDemoState={setDemoState} />;
      case 1:
        return <Questions nextState={nextState} />;
      case 2:
        return <MCQuestions nextState={nextState} />;
      default:
        return <> </>;
    }
  };
  return updateState(demoState);
}

function MCQuestions(props: { nextState: () => void }) {
  const [response, setResponse] = useState<{
    [key: number]: {
      question: string;
      response: { select: string; num: number };
    };
  }>({});
  const questionAndChocices = questionAndChocicesDefault.main;
  return (
    <div>
      <div>adsjfdsalkfkjdfhasdkfjahsf</div>
      <div className="w-3/4 mx-auto md:w-1/2 ">
        {questionAndChocices.map((qa, idx) => {
          return (
            <div>
              <MultiChoice
                choices={qa.choices}
                question={idx + 1 + ". " + qa.question}
                responseSetter={(res) =>
                  setResponse((r) => {
                    r[idx] = { question: qa.question, response: res };
                    return r;
                  })
                }
              />
              <div className="w-full h-1 bg-blue-200 rounded-lg"> </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Questions(props: { nextState: () => void }) {
  const scale = [1, 2, 3, 4, 5];
  const questions = [
    "How often Do you play video games?",
    "How often do you play platforming games (e.g., Mario)? ",
    "How often do you use technology?",
  ];
  const [response, setResponse] = useState<{
    [key: number]: { question: string; response: string | number };
  }>({});

  return (
    <div>
      <div className="flex flex-col w-full pb-8 space-y-4 text-2xl">
        <div>For Child</div>
        <h2>Experience with Video Games</h2>
        Use the following response items:
        <div className="w-3/4 mx-auto md:w-1/2 ">
          {questions.map((q, idx) => {
            return (
              <div>
                <LikertScale
                  scale={scale}
                  question={idx + 1 + ". " + q}
                  responseSetter={(res) =>
                    setResponse((r) => {
                      r[idx] = { question: q, response: res };
                      return r;
                    })
                  }
                />
                <div className="w-full h-1 bg-blue-200 rounded-lg" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function InitalInst(props: { setDemoState: (state: number) => void }) {
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
        onClick={() => props.setDemoState(1)}
        className="w-3/4 px-8 py-4 mx-auto text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
}

export default DemographicQuestions;

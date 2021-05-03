import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LikertScale } from "../Questions";
import MultiChoice from "../Questions/MultiChoice";
import * as questionAndChocicesDefault from "./demoQ.json";
import { IFroggerResponse } from "./FroggerStudy";

function DemographicQuestions(props: {
  nextState: () => void;
  setResponse: Dispatch<SetStateAction<IFroggerResponse>>;
}) {
  const { nextState, setResponse } = props;
  const [demoState, setDemoState] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [demoState]);

  const updateState = (demoState: number) => {
    switch (demoState) {
      case 0:
        return <InitalInst setDemoState={setDemoState} />;
      case 1:
        return <Questions nextState={setDemoState} />;
      case 2:
        return <MCQuestions nextState={setDemoState} />;
      case 3:
        return <PrefrenceQs nextState={setDemoState} />;
      case 4:
        return <CreativeQs nextState={nextState} />;
      default:
        return <> </>;
    }
  };
  return updateState(demoState);
}

function CreativeQs(props: { nextState: () => void }) {
  const [response, setResponse] = useState<{
    [key: number]: {
      question: string;
      response: string | number;
    };
  }>({});

  const scale = [1, 2, 3, 4, 5];
  const scaleLabels = [
    "not true at all",
    "slightly true",
    "somewhat true",
    "moderately true",
    "always true",
  ];

  const questions = questionAndChocicesDefault.creative;
  const setDemoState = () => props.nextState();
  return (
    <div>
      <Banner forChild={false} />
      <h2 className="mt-6 text-4xl font-bold tracking-wide text-center">
        Creativity Questionnaire
      </h2>
      <div className="w-3/4 mx-auto mb-4 space-y-6 text-left md:w-1/2">
        <p>
          Below is a list of adjectives. Please indicate how much each adjective
          describes your child by checking the appropriate space. If you do not
          know the answer to or feel comfortable answering any questions, please
          leave the response blank.
        </p>
        <h3 className="flex flex-col mx-auto text-xl text-left">
          <p>Use the following response items:</p>
          {scale.map((rating, idx) => {
            return (
              <p className="text-lg" key={idx}>
                {rating} = {scaleLabels[idx]}
              </p>
            );
          })}
        </h3>
      </div>
      <div className="w-3/4 h-1 mx-auto bg-blue-200 rounded-lg md:w-1/2" />
      <div className="flex flex-col justify-center w-3/4 mx-auto space-y-8 md:w-1/2">
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
      <div className="flex justify-center w-full my-8">
        <NextButton setDemoState={setDemoState} />
      </div>
    </div>
  );
}

function PrefrenceQs(props: { nextState: (demoState: number) => void }) {
  const [response, setResponse] = useState<{
    [key: number]: {
      question: string;
      response: { select: string; num: number };
    };
  }>({});

  const questions = questionAndChocicesDefault.prefrence;
  const setDemoState = () => props.nextState(4);
  return (
    <div>
      <Banner forChild={false} />
      <h2 className="mt-6 text-4xl font-bold tracking-wide text-center">
        Parenting Preferences Questionnaire
      </h2>
      <div className="w-3/4 h-1 mx-auto bg-blue-200 rounded-lg md:w-1/2" />
      <div className="w-3/4 mx-auto md:w-1/2">
        {questions.map((qa, idx) => {
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
      <div className="flex justify-center w-full my-8">
        <NextButton setDemoState={setDemoState} />
      </div>
    </div>
  );
}

function MCQuestions(props: { nextState: (demoState: number) => void }) {
  const [response, setResponse] = useState<{
    [key: number]: {
      question: string;
      response: { select: string; num: number };
    };
  }>({});
  const questionAndChocices = questionAndChocicesDefault.main;
  const setDemoState = () => props.nextState(3);

  return (
    <div>
      <Banner forChild={false} />
      <div className="w-3/4 mx-auto space-y-12 text-lg font-bold text-left">
        <h2 className="mt-6 text-4xl font-bold tracking-wide text-center">
          Participant Demographics Survey
        </h2>
        <p>
          {" "}
          Instructions:
          <br /> Thank you for taking the time to complete our Participants
          Demographics Information Survey with the Toronto Early Cognition Lab
          at the University of Toronto. <br /> <br />
          In order to ensure that our participants and their families represent
          a diversity of backgrounds in race, gender, ethnicity, age,
          socio-economic statuses and more, we are collecting the following
          information to better direct our recruiting efforts within the lab.{" "}
          <br /> <br /> Information you provide in this survey will remain
          anonymous and will be used by lab personnel only. If we use this
          information for any of our analyses, as with all your data, the
          information provided here will be anonymized. <br /> <br /> Please
          complete a survey for each child who has participated in our studies
          using the Participant ID that has been provided to you. 
        </p>
        <div className="w-full h-1 bg-blue-200 rounded-lg" />
      </div>
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
      <div className="flex justify-center w-full my-6 ">
        <NextButton setDemoState={setDemoState} />
      </div>
    </div>
  );
}

function Questions(props: { nextState: (demoState: number) => void }) {
  const scale = [1, 2, 3, 4, 5];
  const scaleLabels = [
    "never",
    "a few times per year",
    "a few times per month",
    "a few times per week",
    "daily",
  ];
  const questions = [
    "How often Do you play video games?",
    "How often do you play platforming games (e.g., Mario)? ",
    "How often do you use technology?",
  ];
  const [response, setResponse] = useState<{
    [key: number]: { question: string; response: string | number };
  }>({});
  const setDemoState = () => props.nextState(2);
  return (
    <div className="w-full">
      <div className="flex flex-col w-full pb-8 mb-6 space-y-4 text-2xl">
        <Banner forChild={true} />
        <h2 className="text-2xl font-bold text-center">
          Experience with Video Games
        </h2>
        <h3 className="flex flex-col mx-auto text-xl text-left">
          <p>Use the following response items:</p>
          {scale.map((rating, idx) => {
            return (
              <p className="text-lg" key={idx}>
                {rating} = {scaleLabels[idx]}
              </p>
            );
          })}
        </h3>

        <div className="flex flex-col justify-center w-3/4 mx-auto space-y-8 md:w-1/2">
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
        <NextButton setDemoState={setDemoState} />
      </div>
    </div>
  );
}

function InitalInst(props: { setDemoState: (state: number) => void }) {
  return (
    <div className="flex flex-col w-full pb-8 space-y-4 text-2xl">
      <p className="mx-4 my-32 text-center">
        You’re almost done! We just have some surveys for you to finish. <br />{" "}
        <br />
        Some will be for parents to fill out and others will be for children to
        fill out -- <br />
        we’ll let you know on every screen who should fill out the form!
      </p>
      <NextButton setDemoState={() => props.setDemoState(1)} />
    </div>
  );
}

function NextButton({ setDemoState }: { setDemoState: () => void }) {
  return (
    <button
      onClick={setDemoState}
      className="w-3/4 px-8 py-4 mx-auto text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
    >
      Next
    </button>
  );
}

function Banner({ forChild }: { forChild: boolean }) {
  return (
    <div
      className={`flex justify-center w-full py-4 text-4xl font-bold tracking-wide ${
        forChild ? "bg-blue-200" : "bg-green-200"
      }`}
    >
      <div className="my-auto uppercase">
        {" "}
        For {"  "} {forChild ? "Child" : "Adult"}
      </div>
    </div>
  );
}

export default DemographicQuestions;

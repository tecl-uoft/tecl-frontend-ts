import React, { useState, useEffect } from "react";

interface IConsentTemplateProps {
  studyName: string;
  pi: string;
  address: string;
  telephone: string;
  email: string;
  bodyComponent: React.ReactElement;
  consentFunc: Function;
  noConsentFunc: Function;
  isKidMode?: boolean;
}

export enum ConsentChoices {
  Default = 0,
  Agree = 1,
  Disagree = 2,
}

function ConsentTemplate(props: IConsentTemplateProps) {
  const [consent, setConsent] = useState(ConsentChoices.Default);
  const [scrollBot, setScrollBot] = useState(false);
  useEffect(() => {
    // scroll to bottom of the page when you accept or decline consent
    if (consent && !scrollBot) {
      setScrollBot(true);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [consent, scrollBot]);

  return (
    <div className="container mx-auto px-8 pt-4">
      <h2 className="text-4xl font-bold text-center text-gray-800">
        Study: {props.studyName}
      </h2>
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Research Consent Form
      </h3>
      <div className="text-gray-800 text-xl mt-16">
        Principal Investigator: {props.pi} <br />
        Address: {props.address} <br />
        Telephone: {props.telephone} <br />
        Email:{" "}
        <a
          className="text-blue-500"
          href={`mailto:${props.email}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.email}
        </a>
        <br /> <br />
        {props.bodyComponent}
      </div>
      <ChooseConsentButtons consent={consent} setConsent={setConsent} />
      {consent ? (
        <SubmitConsentButton
          consent={consent}
          noConsentFunc={props.noConsentFunc}
          consentFunc={props.consentFunc}
        />
      ) : null}
    </div>
  );
}

interface IChooseConsentButtonsProps {
  consent: ConsentChoices;
  setConsent: Function;
}

function ChooseConsentButtons(props: IChooseConsentButtonsProps) {
  const { consent, setConsent } = props;
  return (
    <div className="flex w-full my-10 px-12">
      <div className="flex justify-around space-x-12 w-full">
        <button
          onClick={() => {
            setConsent(ConsentChoices.Disagree);
          }}
          className={`bg-orange-100 hover:bg-orange-200 w-1/2 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider 
              ${
                consent === ConsentChoices.Disagree
                  ? " bg-orange-300 hover:bg-orange-300"
                  : ""
              }`}
        >
          I Do Not Consent
        </button>
        <button
          onClick={() => {
            setConsent(ConsentChoices.Agree);
          }}
          className={`bg-orange-100 hover:bg-orange-200 w-1/2 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider
              ${
                consent === ConsentChoices.Agree
                  ? "bg-orange-300 hover:bg-orange-300"
                  : ""
              }`}
        >
          I Consent
        </button>
      </div>
    </div>
  );
}

interface ISubmitConsentButtonProps {
  consent: ConsentChoices;
  consentFunc: Function;
  noConsentFunc: Function;
}

function SubmitConsentButton(props: ISubmitConsentButtonProps) {
  return (
    <div className="mb-16">
      <div className="flex justify-around">
        <button
          onClick={() => {
            switch (props.consent) {
              case ConsentChoices.Disagree:
                window.scrollTo(0, 0);
                props.noConsentFunc();
                break;
              case ConsentChoices.Agree:
                props.consentFunc();
                break;
              default:
                alert("Submit Error, please refesh the page.");
                break;
            }
          }}
          className="bg-orange-100 hover:bg-orange-200 w-full font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ConsentTemplate;

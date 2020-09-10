import React, { useState, useEffect } from "react";
import EyeTrackingConsent from "./EyeTrackingConsent";
import ErrorNotFound from "../../pages/ErrorNotFound";
import EyeTrackingInstructions from "./EyeTrackingInstructions";
import EyeTrackingCalibration from "./EyeTrackingCalibration";
import EyeTrackingCalibration2 from "./EyeTrackingCalibration2";
import EyeTrackingAccuracyCheck from "./EyeTrackingAccuracyCheck";
import { IWebgazer } from "./IWebgazerType";
/* import EyeTrackingDemo from "./EyeTrackingDemo";
import EyeTrackingInstructions from "./EyeTrackingInstructions"; */

enum studyStates {
  AskConsent = 0,
  EyeTrackingInstructions = 1,
  EyeTrackingCalibration = 2,
  EyeTrackingCalibration2 = 3,
  AccuracyCheck = 4,
}

function EyeTrackingStudy() {
  const [studyState, setStudyState] = useState(
    process.env.NODE_ENV === "development"
      ? studyStates.EyeTrackingCalibration
      : studyStates.AskConsent
  );
  const [webgazer, setWebgazer] = useState<IWebgazer | undefined>(undefined);

  function cycleStudyStates(studyState: studyStates) {
    switch (studyState) {
      case studyStates.AskConsent:
        return (
          <EyeTrackingConsent
            consentFunc={() =>
              setStudyState(studyStates.EyeTrackingInstructions)
            }
            noConsentFunc={() => setStudyState(studyStates.AskConsent)}
          />
        );
      case studyStates.EyeTrackingInstructions:
        return (
          <EyeTrackingInstructions
            webgazer={webgazer}
            nextState={() => {
              setStudyState(studyStates.EyeTrackingCalibration);
            }}
          />
        );
      case studyStates.EyeTrackingCalibration:
        return (
          <EyeTrackingCalibration
            webgazer={webgazer as IWebgazer}
            nextState={() => {
              setStudyState(studyStates.EyeTrackingCalibration2);
            }}
          />
        );
      case studyStates.EyeTrackingCalibration2:
        return (
          <EyeTrackingCalibration2
            webgazer={webgazer as IWebgazer}
            nextState={() => {
              setStudyState(studyStates.AccuracyCheck);
            }}
          />
        );
      case studyStates.AccuracyCheck:
        return <EyeTrackingAccuracyCheck webgazer={webgazer as IWebgazer} nextState={() => {
          setStudyState(studyStates.EyeTrackingCalibration);
        }} />;
      default:
        return <ErrorNotFound />;
    }
  }

  useEffect(() => {
    setWebgazerScript(
      "https://tecl-online-assets.s3.ca-central-1.amazonaws.com/webgazer.js",
      setWebgazer
    );
  }, []);

  return <div>{cycleStudyStates(studyState)}</div>;
}

async function setWebgazerScript(
  webgazerScriptLink: string,
  webgazerSetter: Function
) {
  const webgazerScriptEl = document.createElement("script");
  webgazerScriptEl.src = webgazerScriptLink;
  webgazerScriptEl.type = "text/javascript";
  webgazerScriptEl.async = true;
  const headEl = document.querySelector("head") as HTMLHeadElement;
  headEl.appendChild(webgazerScriptEl);
  webgazerScriptEl.onload = () => {
    webgazerSetter((window as any).webgazer as IWebgazer);
  };
}

export default EyeTrackingStudy;

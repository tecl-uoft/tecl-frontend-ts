import React, { useState, useEffect } from "react";
import EyeTrackingConsent from "./EyeTrackingConsent";
import ErrorNotFound from "../../pages/ErrorNotFound";
/* import EyeTrackingDemo from "./EyeTrackingDemo";
import EyeTrackingInstructions from "./EyeTrackingInstructions"; */

enum studyStates {
  AskConsent = "askConsent",
  EyeTrackingInstructions = "eyeTrackingInstructions",
  EyeTracking = "eyeTracking",
}

function EyeTrackingStudy() {
  const [studyState, setStudyState] = useState(studyStates.AskConsent);
  const [webgazer, setWebgazer] = useState(null);

  function cycleStudyStates(studyState: studyStates) {
    switch (studyState) {
      case studyStates.AskConsent:
        return (
          <EyeTrackingConsent
            consentFunc={() => setStudyState(studyStates.EyeTracking)}
            noConsentFunc={() => setStudyState(studyStates.AskConsent)}
          />
        );
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
    webgazerSetter((window as any).webgazer);
  };
}

export default EyeTrackingStudy;

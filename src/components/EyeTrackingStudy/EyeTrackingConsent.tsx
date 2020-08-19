import React from "react";
import ConsentTemplate from "../common/ConsentTemplate";

interface IEyeTrackingConsentProps {
  noConsentFunc: Function;
  consentFunc: Function;
}

function EyeTrackingConsent(props: IEyeTrackingConsentProps) {
  const studyName = "Eye Tracking";
  const pi = "Jessica Sommerville";
  const address = "University of Toronto, 100 St. George Street, M5S 2E5";
  const telephone = "(416) 978-6903";
  const email = "jessica.sommerville@utoronto.ca";

  return (
    <ConsentTemplate
      studyName={studyName}
      pi={pi}
      address={address}
      telephone={telephone}
      email={email}
      bodyComponent={<ConsentFormBody />}
      noConsentFunc={props.noConsentFunc}
      consentFunc={props.consentFunc}
    />
  );
}

function ConsentFormBody() {
  return (
    <div>
      You may contact the Office of Research Ethics at{" "}
      <a
        className="text-blue-500"
        href="mailto:ethics.review@utoronto.ca"
        rel="noopener noreferrer"
        target="_blank"
      >
        ethics.review@utoronto.ca
      </a>{" "}
      or 416-946-3273. <br /> <br />
      By selecting the <b>I CONSENT </b> button below, you acknowledge that you
      are 18 or older, have read this consent form, and agree to take part in
      the research. Remember, you can drop out at any time and still get
      compensated for your time.
    </div>
  );
}

export default EyeTrackingConsent;

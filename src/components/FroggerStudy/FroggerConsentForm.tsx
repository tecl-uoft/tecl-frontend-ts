import React from "react";
import ConsentTemplate from "../common/ConsentTemplate";

interface IFroggerConsentFormProps {
  noConsentFunc: Function;
  consentFunc: Function;
}

function FroggerConsentForm(props: IFroggerConsentFormProps) {
  const studyName = "frogger";
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
      <br /> <br />
      If you agree to take part in the research, there will be a short
      demonstration, after which you will fill out a brief online questionnaire.
      The questionnaires will involve reading information and answering
      questions. All of the information that we obtain during the research will
      be kept confidential, and not associated with your name in any way. There
      are no risks to you by participating in this study.
      <br /> <br />
      Your participation in this research is voluntary. You are free to refuse
      to take part, and you may stop taking part at any time. You are free to
      discontinue participation in this study at any time with no penalty. If
      there is any question in the questionnaire that makes you uncomfortable or
      that you do not want to answer, it is your right to refrain from answering
      that question.
      <br /> <br />
      Please note that you will not be able to withdraw your data after
      completing the experiment. This is because all data is completely
      anonymous and there is no identifying link between your name and the data
      we collected.
      <br /> <br />
      ). You may also contact the Office of Research Ethics at{" "}
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

export default FroggerConsentForm;

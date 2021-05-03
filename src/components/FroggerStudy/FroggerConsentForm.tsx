import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ConsentTemplate from "../common/ConsentTemplate";
import Input from "../common/Input";
import { notify } from "../Notification";
import { IFroggerResponse } from "./FroggerStudy";

interface IFroggerConsentFormProps {
  noConsentFunc: Function;
  consentFunc: Function;
  setResponse: Dispatch<SetStateAction<IFroggerResponse>>;
}

function FroggerConsentForm(props: IFroggerConsentFormProps) {
  const [formState, setFormState] = useState({
    parentName: "",
    childName: "",
    childBirthday: "",
    childGender: "",
    sign: "",
    signDate: "",
    email: "",
    phone: "",
    sendSummary: false,
    includeFutureResearch: false,
    futureResearch: "",
  });
  const formStateSetter = {
    parentName: (parentName: string) =>
      setFormState((s) => ({ ...s, parentName })),
    childName: (childName: string) =>
      setFormState((s) => ({ ...s, childName })),
    childBirthday: (childBirthday: string) =>
      setFormState((s) => ({ ...s, childBirthday })),
    childGender: (childGender: string) =>
      setFormState((s) => ({ ...s, childGender })),
    sign: (sign: string) => setFormState((s) => ({ ...s, sign })),
    signDate: (signDate: string) => setFormState((s) => ({ ...s, signDate })),
    email: (email: string) => setFormState((s) => ({ ...s, email })),
    phone: (phone: string) => setFormState((s) => ({ ...s, phone })),
    sendSummary: () =>
      setFormState((s) => ({ ...s, sendSummary: !s.sendSummary })),
    includeFutureResearch: () =>
      setFormState((s) => ({
        ...s,
        includeFutureResearch: !s.includeFutureResearch,
      })),
    futureResearch: (futureResearch: string) =>
      setFormState((s) => ({ ...s, futureResearch })),
  };

  const submitConsentA = () => {
    if (
      formState.parentName &&
      formState.childName &&
      formState.childBirthday &&
      formState.childGender &&
      formState.sign &&
      formState.signDate
    ) {
      props.setResponse((r) => {
        r.consentA = formState;
        return r;
      });
      props.consentFunc();
    } else {
      notify.error("You have missed a required field.");
    }
  };

  const [isAdult, setIsAdult] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isAdult = params.get("type") === "adult";
    setIsAdult(isAdult);
  }, []);

  const studyName = "Frogger";
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
      noConsentFunc={props.noConsentFunc}
      consentFunc={submitConsentA}
      bodyComponent={
        <div>
          <i>
            Please read this consent agreement very carefully before you
            participate in this experiment. If anything is unclear to you or if
            you have any questions, please ask the experimenter for more
            information.{" "}
          </i>
          <br /> <br />
          <h3 className="text-xl">
            {" "}
            <b>Agreement to Participate </b>
          </h3>
          <div className="w-full">
            By signing this consent form, you are indicating that you have read
            the included study information sheet, or it has been read to you.
            You are also indicating that you have been given the opportunity to
            ask questions about the study and all of your questions have been
            answered to your satisfaction. By signing this consent form, you are
            indicating that you voluntarily agree that you{" "}
            {!isAdult && "and your child"} will participate in the study. If you
            would like a duplicate of this form, please let the researcher know
            or contact us at the number or email address below and we would be
            happy to provide you with one.
            <br /> <br />
            {isAdult &&
              "By clicking 'I agree' below you are indicating that you are at least 18 years old, have read this consent form and agree to participate in this research study. You are free to skip any question that you choose."}
            <div className="w-full">
              {!isAdult && (
                <>
                  {" "}
                  I{" "}
                  <div className="inline-block w-full mx-2 md:w-1/2">
                    <Input
                      placeholder="Name of parent/guardian"
                      value={formState.parentName}
                      valueSetter={formStateSetter.parentName}
                      type="text"
                    />{" "}
                  </div>
                  , having read the above information, give permission for my
                  child
                  <div className="inline-block w-full mx-2 md:w-1/2">
                    <Input
                      placeholder="Name of child"
                      value={formState.childName}
                      valueSetter={formStateSetter.childName}
                      type="text"
                    />{" "}
                  </div>
                  , to participate.{" "}
                </>
              )}{" "}
              <br />
              {isAdult ? "My" : "Child's"} Birthday:{" "}
              <div className="inline-block mx-2">
                <Input
                  value={formState.childBirthday}
                  valueSetter={formStateSetter.childBirthday}
                  type="date"
                />{" "}
              </div>{" "}
              <br />
              {isAdult ? "My" : "Child's"} Gender:{" "}
              <div className="inline-block w-full mx-2 md:w-64">
                <Input
                  placeholder={isAdult ? "My Gender" : "Gender of child"}
                  value={formState.childGender}
                  valueSetter={formStateSetter.childGender}
                  type="text"
                />{" "}
              </div>{" "}
              <br />
              {!isAdult && (
                <>
                  <div className="inline-block w-full my-6 mr-2 md:w-1/2">
                    <Input
                      placeholder="Signature of
                  parent/guardian"
                      value={formState.sign}
                      valueSetter={formStateSetter.sign}
                      type="text"
                    />{" "}
                  </div>
                  <div className="inline-block mx-2">
                    <Input
                      value={formState.signDate}
                      valueSetter={formStateSetter.signDate}
                      type="date"
                    />{" "}
                  </div>{" "}
                </>
              )}
              <br />
              Please provide your email and/or phone number if you would like to
              receive a summary of the findings when the study is complete
              {isAdult ? (
                "."
              ) : (
                <>
                  {" "}
                  and/or if you would like us to keep your contact information
                  on file so we can contact you about other research studies
                  your child(ren) may be eligible to participate in. Please
                  clearly below.{" "}
                </>
              )}{" "}
              <br /> <br />
              Email:{" "}
              <div className="inline-block mx-2">
                <Input
                  value={formState.email}
                  valueSetter={formStateSetter.email}
                  type="email"
                />{" "}
              </div>{" "}
              <br />
              Telephone:{" "}
              <div className="inline-block mx-2">
                <Input
                  value={formState.phone}
                  valueSetter={formStateSetter.phone}
                  type="tel"
                />{" "}
              </div>{" "}
            </div>{" "}
            {!isAdult && (
              <>
                <input
                  className="w-5 h-5 mx-2 -mb-6 cursor-pointer"
                  checked={formState.sendSummary}
                  onChange={formStateSetter.sendSummary}
                  type="checkbox"
                />
                Please send me a summary of the findings when the study is
                complete <br />
                <input
                  className="w-5 h-5 mx-2 -mb-6 cursor-pointer"
                  type="checkbox"
                />
                The University of Toronto Child Study Centre and The Laboratory
                for Infant Studies, groups of researchers studying child
                development, would like to keep your contact information on file
                so that we can contact you about other research projects your
                child(ren) may be eligible to participate in. Please include the
                names of your child’s siblings, dates of birth, and genders if
                you would like them to participate in future research: <br />{" "}
                <div className="w-full mt-2">
                  <Input
                    value={formState.futureResearch}
                    valueSetter={formStateSetter.futureResearch}
                    type="email"
                  />{" "}
                </div>{" "}
              </>
            )}
          </div>
        </div>
      }
    />
  );
}

export default FroggerConsentForm;

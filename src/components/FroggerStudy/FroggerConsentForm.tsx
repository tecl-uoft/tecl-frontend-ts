
import React, { useState } from "react";
import ConsentTemplate from "../common/ConsentTemplate";
import Input from "../common/Input";

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
  const [name, setName] = useState("");
  return (
    <div>
      <i>
        Please read this consent agreement very carefully before you participate
        in this experiment. If anything is unclear to you or if you have any
        questions, please ask the experimenter for more information.{" "}
      </i>
      <br /> <br />
      <h3 className="text-xl">
        {" "}
        <b>Agreement to Participate </b>
      </h3>
      <div className="w-full">
        By signing this consent form, you are indicating that you have read the
        included study information sheet, or it has been read to you. You are
        also indicating that you have been given the opportunity to ask
        questions about the study and all of your questions have been answered
        to your satisfaction. By signing this consent form, you are indicating
        that you voluntarily agree that you and your child will participate in
        the study. If you would like a duplicate of this form, please let the
        researcher know or contact us at the number or email address below and
        we would be happy to provide you with one.
        <div className="w-full">
          I{" "}
          <div className="mx-2 w-full md:w-1/2 inline-block">
            <Input
              placeholder="PRINT name of parent/guardian"
              value={name}
              valueSetter={setName}
              type="text"
            />{" "}
          </div>
          , having read the above information, give permission for my child
          <div className="mx-2 w-full md:w-1/2 inline-block">
            <Input
              placeholder="PRINT name of child"
              value={name}
              valueSetter={setName}
              type="text"
            />{" "}
          </div>
          , to participate. <br />
          Child’s Birthday:{" "}
          <div className="mx-2 inline-block">
            <Input
              placeholder="PRINT name of child"
              value={name}
              valueSetter={setName}
              type="date"
            />{" "}
          </div>{" "}
          <br />
          Child’s Gender:{" "}
          <div className="mx-2 w-full md:w-64 inline-block">
            <Input
              placeholder="PRINT gender of child"
              value={name}
              valueSetter={setName}
              type="text"
            />{" "}
          </div>{" "}
          <br />
          <div className="mr-2 w-full md:w-1/2 my-6 inline-block">
            <Input
              placeholder="Signature of
              parent/guardian"
              value={name}
              valueSetter={setName}
              type="text"
            />{" "}
          </div>
          <div className="mx-2 inline-block">
            <Input value={name} valueSetter={setName} type="date" />{" "}
          </div>{" "}
          <br />
          Please provide your email and/or phone number if you would like to
          receive a summary of the findings when the study is complete and/or if
          you would like us to keep your contact information on file so we can
          contact you about other research studies your child(ren) may be
          eligible to participate in. Please PRINT clearly below. <br /> <br />
          Email:{" "}
          <div className="mx-2 inline-block">
            <Input value={name} valueSetter={setName} type="email" />{" "}
          </div>{" "}
          <br />
          Telephone:{" "}
          <div className="mx-2 inline-block">
            <Input value={name} valueSetter={setName} type="tel" />{" "}
          </div>{" "}
        </div>{" "}
        <input className="h-5 w-5 mx-2 -mb-6" type="checkbox" />
        Please send me a summary of the findings when the study is complete{" "}
        <br />
        <input className="h-5 w-5 mx-2 -mb-6" type="checkbox" />
        The University of Toronto Child Study Centre and The Laboratory for
        Infant Studies, groups of researchers studying child development, would
        like to keep your contact information on file so that we can contact you
        about other research projects your child(ren) may be eligible to
        participate in. Please include the names of your child’s siblings, dates
        of birth, and genders if you would like them to participate in future
        research: <br />{" "}
        <div className="w-full mt-2">
          <Input value={name} valueSetter={setName} type="email" />{" "}
        </div>{" "}
      </div>
    </div>
  );
}

export default FroggerConsentForm;

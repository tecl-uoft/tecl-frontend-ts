import React, { useEffect, useState } from "react";
import ConsentTemplate from "../common/ConsentTemplate";

interface IFroggerConsentFormProps {
  noConsentFunc: Function;
  consentFunc: Function;
}

function FroggerVideoConsentForm(props: IFroggerConsentFormProps) {
  const studyName = "Frogger";
  const pi = "Jessica Sommerville";
  const address = "University of Toronto, 100 St. George Street, M5S 2E5";
  const telephone = "(416) 978-6903";
  const email = "jessica.sommerville@utoronto.ca";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const [formState, setFormState] = useState({
    vc1: false,
    vc2: false,
    vc3: false,
    vc4: false,
    vc5: false,
    vc6: false,
    vc7: false,
    vc8: false,
    vc9: false,
  });
  const formStateSetter = [
    () => setFormState((s) => ({ ...s, vc1: !s.vc1 })),
    () => setFormState((s) => ({ ...s, vc2: !s.vc2 })),
    () => setFormState((s) => ({ ...s, vc3: !s.vc3 })),
    () => setFormState((s) => ({ ...s, vc4: !s.vc4 })),
    () => setFormState((s) => ({ ...s, vc5: !s.vc5 })),
    () => setFormState((s) => ({ ...s, vc6: !s.vc6 })),
    () => setFormState((s) => ({ ...s, vc7: !s.vc7 })),
    () => setFormState((s) => ({ ...s, vc8: !s.vc8 })),
    () => setFormState((s) => ({ ...s, vc9: !s.vc9 })),
  ];

  return (
    <div>
      <h3 className="text-md">
        {" "}
        <b>Video Release Consent and Webcam Recording</b>
      </h3>
      <div className="w-full">
        With your consent, we will film your child’s behaviour via your
        computer’s webcam and microphone <strong>(via Zoom)</strong> for
        reliability purposes and/or educational purposes. Your child’s name
        would never be associated with any of these uses. You, of course, have
        the right to refuse to allow your child’s film to be used in any of
        these ways.{" "}
        <strong>
          {" "}
          If consent for video recording is given, the footage will be
          transferred to and securely stored on the laboratory database without
          identifying information. However, there is always a small risk that
          data transmitted over the internet may be intercepted or that the
          security of stored data may be compromised.{" "}
        </strong>
        <br />
        The footage will only be seen by the research investigators, unless
        separate consent is given for the videos to be used in other venues
        (e.g., conferences or in the media). Footage will be destroyed
        approximately 3 years after the study is complete, unless separate
        consent for use in future research is given. <br />
        Please indicate below whether you do (check “Yes”) or do not (check “No)
        give us permission to use your child’s film or still photos of your
        child in each of these ways: <br /> <br />
        <div className="flex flex-col justify-between">
          {[
            {
              state: formState.vc1,
              q:
                "I agree to have my child’s photo taken and/or to being videoed.",
            },
            {
              state: formState.vc2,
              q:
                " The photo and video recorded material may be used by the investigators for this research project.",
            },
            {
              state: formState.vc3,
              q:
                " I agree for the photo and video recorded material to be used by the investigators in future research projects, after this project has ended.",
            },
            {
              state: formState.vc4,
              q:
                "I agree for the photo and video recorded material to be published in scholarly venues describing the research (e.g., in an academic journal or thesis).",
            },
            {
              state: formState.vc5,
              q:
                "I agree for the photo and video recorded material to be used in research presentations at scientific meetings.",
            },
            {
              state: formState.vc6,
              q:
                "I agree for the photo and video recorded material to be used in public presentations to non-scientific groups.",
            },
            {
              state: formState.vc7,
              q:
                "I agree for the photo and video recorded material to be shown in classrooms to university students.",
            },
            {
              state: formState.vc8,
              q:
                "I agree for the photo and video recorded material to be shown on the Toronto Early Childhood Cognition Lab website, or Facebook page. ",
            },
            {
              state: formState.vc9,
              q:
                "I agree for the photo and video recorded material to be used in the media (e.g., third- party web, newspaper or television stories about this research).",
            },
          ].map((question, idx) => {
            return (
              <div className="flex justify-between px-10 my-2" key={idx}>
                {" "}
                <p className="w-3/4">
                  {" "}
                  {idx + 1}. {question.q}
                </p>{" "}
                <div className="flex justify-end w-1/4 space-x-4">
                  {" "}
                  <div>
                    <input
                      checked={question.state}
                      onChange={formStateSetter[idx]}
                      className="w-6 h-6 mx-2 cursor-pointer "
                      type="radio"
                    />
                    <label className="text-center">Yes</label>
                  </div>
                  <div>
                    <input
                      checked={!question.state}
                      onChange={formStateSetter[idx]}
                      className="w-6 h-6 mx-2 cursor-pointer"
                      type="radio"
                    />{" "}
                    <label>No</label>
                  </div>
                </div>{" "}
              </div>
            );
          })}
        </div>{" "}
        <br />
        If at any time in the future you change your mind about granting us
        permission to use your child’s video or photos, please notify us and we
        will stop using it (except in the case of photos already published in
        books or journals or released to third parties in the case of media
        consent). <br />
        If you have any questions, complaints or concerns regarding this
        research, either now or at any time in the future, please contact Dr.
        Jessica Sommerville at 416-978-1815 or jessica.sommerville@utoronto.ca.
        You may obtain further information about your rights as a research
        participant by contacting the University of Toronto’s Office of Research
        Ethics at 416-358-6115 or ethics.review@utoronto.ca.
      </div>
    </div>
  );
}

export default FroggerVideoConsentForm;

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
      <h3 className="text-xl"> <b>Agreement to Participate </b></h3>
      By signing this consent form, you are indicating
      that you have read the included study information sheet, or it has been
      read to you. You are also indicating that you have been given the
      opportunity to ask questions about the study and all of your questions
      have been answered to your satisfaction. By signing this consent form, you
      are indicating that you voluntarily agree that you and your child will
      participate in the study. If you would like a duplicate of this form,
      please let the researcher know or contact us at the number or email
      address below and we would be happy to provide you with one. 
      <br /> <br />
      I <Input value={name} valueSetter={setName} type="text" /> , having read the above information, give
      permission for my child (PRINT name of parent/guardian)
      __________________________, to participate. (PRINT name of child) Child’s
      Birthday (MM/DD/YY):____________ Child’s Gender: _______
      _________________________________ ______________ (Signature of
      parent/guardian) (Date) Please provide your email and/or phone number if
      you would like to receive a summary of the findings when the study is
      complete and/or if you would like us to keep your contact information on
      file so we can contact you about other research studies your child(ren)
      may be eligible to participate in. Please PRINT clearly. Email:
      ______________________________ Telephone: __________________________ ☐
      Please send me a summary of the findings when the study is complete ☐ The
      University of Toronto Child Study Centre and The Laboratory for Infant
      Studies, groups of researchers studying child development, would like to
      keep your contact information on file so that we can contact you about
      other research projects your child(ren) may be eligible to participate in.
      Please include the names of your child’s siblings, dates of birth, and
      genders if you would like them to participate in future research:
      __________________________________________________________ Video Release
      Consent & Webcam Recording With your consent, we will film your child’s
      behaviour via your computer’s webcam and microphone (via Zoom) for
      reliability purposes and/or educational purposes. Your child’s name would
      never be associated with any of these uses. You, of course, have the right
      to refuse to allow your child’s film to be used in any of these ways. If
      consent for video recording is given, the footage will be transferred to
      and securely stored on the laboratory database without identifying
      information. However, there is always a small risk that data transmitted
      over the internet may be intercepted or that the security of stored data
      may be compromised. The footage will only be seen by the research
      investigators, unless separate consent is given for the videos to be used
      in other venues (e.g., conferences or in the media). Footage will be
      destroyed approximately 3 years after the study is complete, unless
      separate consent for use in future research is given. Please indicate
      below whether you do (check “Yes”) or do not (check “No) give us
      permission to use your child’s film or still photos of your child in each
      of these ways: I agree to have my child’s photo taken and/or to being
      videoed. The photo and video recorded material may be used by the
      investigators for this research project. Yes No I agree for the photo and
      video recorded material to be used by the investigators in future research
      projects, after this project has ended. Yes No I agree for the photo and
      video recorded material to be published in scholarly venues describing the
      research (e.g., in an academic journal or thesis). Yes No I agree for the
      photo and video recorded material to be used in research presentations at
      scientific meetings. Yes No I agree for the photo and video recorded
      material to be used in public presentations to non-scientific groups. I
      agree for the photo and video recorded material to be shown in classrooms
      to university students. I agree for the photo and video recorded material
      to be shown on the Toronto Early Childhood Cognition Lab website, or
      Facebook page. I agree for the photo and video recorded material to be
      used in the media (e.g., third- party web, newspaper or television stories
      about this research). Yes Yes Yes Yes No No No No If at any time in the
      future you change your mind about granting us permission to use your
      child’s video or photos, please notify us and we will stop using it
      (except in the case of photos already published in books or journals or
      released to third parties in the case of media consent). If you have any
      questions, complaints or concerns regarding this research, either now or
      at any time in the future, please contact Dr. Jessica Sommerville at
      416-978-1815 or jessica.sommerville@utoronto.ca. You may obtain further
      information about your rights as a research participant by contacting the
      University of Toronto’s Office of Research Ethics at 416-358-6115 or
      ethics.review@utoronto.ca.
    </div>
  );
}

export default FroggerConsentForm;

import React, { Fragment } from "react";
import StudyInfoBlock from "../../components/StudyInfoBlock";

function TeamsStudyEntry() {
  return (
    <Fragment>
      <StudyInfoBlock
      studyTitle="Teams"
        ageRange="4 to 7 years old"
        studyDesc="We’re interested in how kids understand fair and unfair scenarios,
            helping and hindering situations, and how this influences their
            social behavior."
        studyWorkDesc="We’re interested in how kids understand fair and unfair scenarios,
        helping and hindering situations, and how this influences their
        social behavior. We’re interested in how kids understand fair and
        unfair scenarios, helping and hindering situations, and how this
        influences their social behavior."
        studyImgURI="/assets/fair_study.svg"
        studyImgAlt="Teams Study"
        studyTrialURI="/study/fairness/game"
      />
    </Fragment>
  );
}

export default TeamsStudyEntry;

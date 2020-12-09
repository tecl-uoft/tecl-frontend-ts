import React from "react";
import StudyEntryBlock from "../../components/StudyEntryBlock";

function TouchStudyEntry() {
  return (
    <div id="teams-study-entry">
      <StudyEntryBlock
        studyTitle="Touch"
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
        studyImgAlt="Touch Study"
        studyTrialURI="/study/fairness/game"
      />
    </div>
  );
}

export default TouchStudyEntry;

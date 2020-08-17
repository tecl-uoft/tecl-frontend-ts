import React from "react";
import StudyInfoBlock from "../../components/StudyInfoBlock";

function FroggerStudyEntry() {
  return (
    <div id="frogger-study-entry">
      <StudyInfoBlock
        studyTitle="Frogger"
        ageRange="7 to 10 years old"
        studyDesc="We’re interested in how kids understand fair and unfair scenarios,
            helping and hindering situations, and how this influences their
            social behavior."
        studyWorkDesc="We’re interested in how kids understand fair and unfair scenarios,
        helping and hindering situations, and how this influences their
        social behavior. We’re interested in how kids understand fair and
        unfair scenarios, helping and hindering situations, and how this
        influences their social behavior."
        studyImgURI="/assets/frogger_study.svg"
        studyImgAlt="Frogger Study"
        studyTrialURI="/study/frogger/game"
      />
    </div>
  );
}

export default FroggerStudyEntry;

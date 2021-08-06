import React from "react";
import StudyEntryBlock from "../../components/StudyEntryBlock";

function TouchStudyEntry() {
  return (
    <div id="touch-study-entry">
      <StudyEntryBlock
        studyTitle="Tablet Study"
        ageRange="4 to 7 years old"
        studyDesc="We’re interested in how kids understand fair and unfair scenarios,
            helping and hindering situations, and how this influences their
            social behavior."
        studyWorkDesc="We’re interested in how kids understand fair and unfair scenarios,
        helping and hindering situations, and how this influences their
        social behavior. We’re interested in how kids understand fair and
        unfair scenarios, helping and hindering situations, and how this
        influences their social behavior."
        studyImgURI="/assets/touch_intro.svg"
        studyImgAlt="Touch Study"
        studyTrialURI={`/study/touch/game?mode=manual&participant_id=${new Date().getTime()}`}
      />
    </div>
  );
}

export default TouchStudyEntry;

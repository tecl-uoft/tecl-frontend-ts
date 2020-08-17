import React from "react";
import StudyEntryBlock from "../../components/StudyEntryBlock";

function EyeTrackingEntry() {
  return (
    <div id="eye-tracking-entry">
      <StudyEntryBlock
        studyTitle="Frogger"
        ageRange="0 to 2 years old"
        studyDesc="This study tracks the eyes and which area of the screen they are looking at."
        studyWorkDesc="This study tracks the eyes and which area of the screen they are looking at.
        This study tracks the eyes and which area of the screen they are looking at.
        This study tracks the eyes and which area of the screen they are looking at."
        studyImgURI="/assets/eye_tracking_study.svg"
        studyImgAlt="Frogger Study"
        studyTrialURI="/study/eyetracking/game"
      />
    </div>
  );
}

export default EyeTrackingEntry;

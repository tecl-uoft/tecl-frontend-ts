import React from "react";
import toast from "react-hot-toast";
import { notify } from "../../components/Notification";
import StudyEntryBlock from "../../components/StudyEntryBlock";

function FroggerStudyEntry() {
  return (
    <div id="frogger-study-entry">
      <StudyEntryBlock
        studyTitle="InFrognito"
        ageRange="7 & 8 years old or 18 to 55 years old"
        studyDesc="We are interested in how social context changes attempts to solve the game."
        studyWorkDesc={
          <div className="px-4 text-md">
            You’ll provide us your email, and we’ll send you a link to play as
            Frog and solve a simple platforming game. Then, you will answer some
            questions about your experience and fill out some surveys. It is
            important that you’re seeing the game for the first time, so please
            note that only you OR your child can participate. You are not
            eligible if you’ve already done a Frog study with us over Zoom!
            <br /> <br />
            <span className="text-2xl font-bold">
              **Please note that video and audio recording are required for this
              game so that we can perform quality control. You will not be
              compensated if you do not provide audio and video. Please contact
              tecl.psychology@utoronto.ca if you are uncomfortable consenting to
              audio and video recording, and we will be happy to find a more
              appropriate study.
            </span>
          </div>
        }
        onClickPic={() =>
          toast(
            "Please note that video and audio recording are required for this game so that we can perform quality control. You will not be compensated if you do not provide audio and video. Please contact tecl.psychology@utoronto.ca if you are uncomfortable consenting to audio and video recording, and we will be happy to find a more appropriate study.",
            {
              icon: "⚠️",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            }
          )
        }
        studyImgURI="/assets/frogger_study.svg"
        studyImgAlt="Frogger Study"
        studyTrialURI="/study/frogger/open/game"
      />
    </div>
  );
}

export default FroggerStudyEntry;

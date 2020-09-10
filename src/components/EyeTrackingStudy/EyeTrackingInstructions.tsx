import React from "react";
import StudyTitleText from "../common/StudyTitleText";
import StudyNextButton from "../common/StudyNextButton";
import { useWebgazerCalibration } from "./webgazerHooks";

interface IEyeTrackingInstructionsProps {
  webgazer: any;
  nextState: Function;
}

function EyeTrackingInstructions(props: IEyeTrackingInstructionsProps) {
  const videoPreviewElStyle = {
    marginLeft: "340px",
    marginRight: "300px",
    top: "0px",
    left: "0px",
  };

  useWebgazerCalibration(props.webgazer);

  /* useEffect(() => {
    if (webgazer) {
      console.log(webgazer);
      displayCalibration(webgazer);

      return () => {
        webgazer.end();
        webgazer.params.showVideoPreview = false;
      };
    }
  }, [webgazer]); */

  return (
    <div className="container mt-6 mx-auto px-2 pt-4 mb-16">
      <div style={videoPreviewElStyle}>
        <StudyTitleText text={"Instructions for eye tracking calibration"} />
      </div>
      <div className="text-xl text-center text-gray-800 mb-16 mt-32">
        <p className="mb-6">
          The red dot shows where we think your child is looking.
        </p>
        <div className="flex flex-col font-bold text-left ml-64">
          <p className="mb-6">
            0. Make sure your child's face is in the middle of the black square
            on the video feed in the top left corner
          </p>
          <p className="mb-4 font-normal">Once you click next...</p>
          <p className="mb-4">
            1. Make sure your child is looking at the objects when they appear
            and make sure the red dot is on top of them.
          </p>
          <p className="mb-4">
            {" "}
            2. Click on the image until it moves to a new spot{" "}
          </p>
          <p className="mb-4">
            {" "}
            3. Click the next button to move on the the next stage. Repeat as
            needed.{" "}
          </p>
          <p>
            {" "}
            4. When you get to the page which check accuracy, do not move your mouse until the "next" button as appeared{" "}
          </p>
        </div>
      </div>
      <StudyNextButton nextStateFunc={() => props.nextState()} />
    </div>
  );
}

export default EyeTrackingInstructions;

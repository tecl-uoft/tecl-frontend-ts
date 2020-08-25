import React from "react";
import StudyTitleText from "../common/StudyTitleText";
import StudyNextButton from "../common/StudyNextButton";
import { useEffect } from "react";
import { WebgazerPredictionObject, RegressionType } from "./IWebgazerType";

interface IEyeTrackingInstructionsProps {
  webgazer: any;
  nextState: Function;
}

function EyeTrackingInstructions(props: IEyeTrackingInstructionsProps) {
  const { webgazer } = props;
  const videoPreviewElStyle = {
    marginLeft: "340px",
    marginRight: "300px",
    top: "0px",
    left: "0px",
  };

  useEffect(() => {
    if (webgazer) {
      console.log(webgazer);
      displayCalibration(webgazer);

      return () => {
        webgazer.end();
        webgazer.params.showVideoPreview = false;
      };
    }
  }, [webgazer]);

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
            1. Keep clicking on the objects when they appear and make sure the
            red dot is on top of them.
          </p>
          <p className="mb-4"> 2. Click until the image moves </p>
          <p> 3. Repeat step 1 and 2 about ten more times </p>
        </div>
      </div>
      <StudyNextButton nextStateFunc={() => props.nextState()} />
    </div>
  );
}

async function displayCalibration(webgazer: any) {
  webgazer.params.showVideoPreview = true;
  webgazer.applyKalmanFilter = true;

  //start the webgazer tracker
  await webgazer
    .setRegression(
      RegressionType.Ridge
    ) /* currently must set regression and tracker */
    .setGazeListener(function (data: WebgazerPredictionObject, clock: Date) {
      //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
      //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
    })
    .begin();

  await webgazer.pause();

  // Set to true if you want to save the data even if you reload the page.
  /* webgazer.saveDataAcrossSessions = true; */
}

export default EyeTrackingInstructions;

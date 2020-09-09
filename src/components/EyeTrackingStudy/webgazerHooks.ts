import { useEffect } from "react";
import {
  IWebgazer,
  WebgazerPredictionObject,
  RegressionType,
} from "./IWebgazerType";

export function useWebgazerCalibration(webgazer: IWebgazer) {
  useEffect(() => {
    if (webgazer) {
      displayCalibration(webgazer);
      console.log(webgazer);
      return () => {
        webgazer.showPredictionPoints(false);
        webgazer.showFaceOverlay(false);
        webgazer.showFaceFeedbackBox(false);
        webgazer.showVideo(false);
        webgazer.pause();
      };
    }
  }, [webgazer]);
}

async function displayCalibration(webgazer: IWebgazer) {
  webgazer.params.showVideoPreview = true;
  webgazer.params.showFaceOverlay = true;
  webgazer.params.showFaceFeedbackBox = true;
  webgazer.params.showVideo = true;

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
  webgazer.showPredictionPoints(
    true
  ); /* shows a square every 100 milliseconds where current prediction is */

  // Kalman Filter defaults to on. Can be toggled by user.
  webgazer.applyKalmanFilter = true;
  webgazer.pause();

  // Set to true if you want to save the data even if you reload the page.
  webgazer.saveDataAcrossSessions = false;
}

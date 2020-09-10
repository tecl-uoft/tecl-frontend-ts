import { useEffect } from "react";
import { IWebgazer, RegressionType } from "./IWebgazerType";

export function useWebgazerCalibration(webgazer: IWebgazer) {
  useEffect(() => {
    if (webgazer) {
      displayCalibration(webgazer);
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
  if (!webgazer.isReady()) {
    webgazer.params.showVideoPreview = true;
    webgazer.params.showFaceOverlay = true;
    webgazer.params.showFaceFeedbackBox = true;
    webgazer.params.showVideo = true;

    //start the webgazer tracker
    await webgazer
      .setRegression(
        RegressionType.Ridge
      ) /* currently must set regression and tracker */
      .begin();
    webgazer.showPredictionPoints(
      true
    ); /* shows a square every 100 milliseconds where current prediction is */

    // Kalman Filter defaults to on. Can be toggled by user.
    webgazer.applyKalmanFilter = true;
    webgazer.pause();

    // Set to true if you want to save the data even if you reload the page.
    webgazer.saveDataAcrossSessions = false;
  } else {
    webgazer.showPredictionPoints(true);
    webgazer.showFaceOverlay(true);
    webgazer.showFaceFeedbackBox(true);
    webgazer.showVideo(true);
    webgazer.pause();
  }
}

export interface IWebgazer {
  params: WebgazerParams;
  applyKalmanFilter: boolean;
  saveDataAcrossSessions: boolean;
  addRegression(name: RegressionType): IWebgazer;
  setRegression(name: RegressionType): IWebgazer;
  setGazeListener(
    setter: (data: WebgazerPredictionObject, clock: Date) => void
  ): IWebgazer;
  showPredictionPoints(isShown: boolean): void;
  getCurrentPrediction(): null | WebgazerPredictionObject;
  begin(): Promise<IWebgazer>;
  pause(): void;
  resume(): Promise<void>;
  end(): void;
}

export enum RegressionType {
  Ridge = "ridge",
  WeightedRidge = "weightedRidge",
  ThreadedRidge = "threadedRidge",
}

export interface WebgazerPredictionObject {
  x: number;
  y: number;
}

interface WebgazerParams {
  camConstraints: {
    video: {
      facingMode: string;
      height: { min: number; ideal: number; max: number };
      width: { min: number; ideal: number; max: number };
    };
  };
  clmParams: { useWebGL: boolean };
  dataTimestep: number;
  faceFeedbackBoxId: "webgazerFaceFeedbackBox";
  faceFeedbackBoxRatio: number;
  faceOverlayId: "webgazerFaceOverlay";
  gazeDotId: "webgazerGazeDot";
  getEventTypes(): string[];
  mirrorVideo: boolean;
  moveTickSize: number;
  showFaceFeedbackBox: boolean;
  showFaceOverlay: boolean;
  showGazeDot: boolean;
  showVideo: boolean;
  showVideoPreview: boolean;
  smoothEyeBB: boolean;
  videoElementCanvasId: "webgazerVideoCanvas";
  videoElementId: "webgazerVideoFeed";
  videoViewerHeight: number;
  videoViewerWidth: number;
}

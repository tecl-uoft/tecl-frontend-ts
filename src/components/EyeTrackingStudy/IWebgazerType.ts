export interface IWebgazer {
  addRegression(name: RegressionType): IWebgazer;
  getCurrentPrediction(): null | WebgazerPredictionObject;
  pause(): void;
  resume(): Promise<void>;
  params: WebgazerParams;
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
  getEventTypes(): any;
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

export enum RegressionType {
  Ridge = "ridge",
  WeightedRidge = "weightedRidge",
  ThreadedRidge = "threadedRidge",
}

export interface WebgazerPredictionObject {
  x: number;
  y: number;
}

export interface IWebgazerType {
  addRegression(name: RegressionType): IWebgazerType;
  getCurrentPrediction(): null | WebgazerPredictionObject;
}

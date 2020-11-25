import { useReducer } from "react";
import { VideoLinks } from "./videoLinks.json";

export type State = {
  leftBar: Bar;
  rightBar: Bar;
  video: {
    isHidden: boolean;
    url: string;
  };
};

type Bar = {
  barType: "A" | "B";
  isHidden: boolean;
};

export type Action = { type: "training" | "distribution" | "test"; trial: number };

const initialState: State = {
  leftBar: { barType: "A", isHidden: true },
  rightBar: { barType: "B", isHidden: true },
  video: { url: VideoLinks.AlexPunishRight, isHidden: false },
};

function reducer(state: State, action: Action): State {
  const studyState = initialState;
  switch (action.type) {
    case "training":
      if (action.trial === 1) {
        studyState.leftBar.isHidden = false;
        studyState.rightBar.isHidden = true;
        studyState.video.url = VideoLinks.AlexRewardRight;
      } else if (action.trial === 2) {
        studyState.leftBar.isHidden = true;
        studyState.rightBar.isHidden = false;
        studyState.video.url = VideoLinks.AlexPunishLeft;
      } else if (action.trial === 3) {
        studyState.leftBar.isHidden = false;
        studyState.rightBar.isHidden = false;
      }
      return studyState;
    case "distribution":
      if (action.trial === 1) {
        studyState.video.url = VideoLinks.UnfairSnacksA;
      } else if (action.trial === 2) {
        studyState.video.url = VideoLinks.UnfairSnacksB;
      } else if (action.trial === 3) {
        studyState.video.url = VideoLinks.UnfairToysA;
      } else if (action.trial === 4) {
        studyState.video.url = VideoLinks.UnfairToysB;
      }
      return studyState;
    case "test":
      return studyState;
    default:
      return studyState;
  }
}

export function useStudyReducer() {
  return useReducer(reducer, initialState);
}

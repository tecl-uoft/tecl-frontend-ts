import { useReducer } from "react";
import { VideoLinks } from "./videoLinks.json";

type State = {
  leftBar: Bar;
  rightBar: Bar;
  video: {
    isHidden: boolean;
    url: string;
  };
};

type Bar = {
  color: "orange" | "green";
  isHidden: boolean;
};

type Action =
  | { type: "showVideo" }
  | { type: "setupTraining"; progress: 1 | 2; version: "A" | "B" };

const initialState: State = {
  leftBar: { color: "orange", isHidden: true },
  rightBar: { color: "orange", isHidden: true },
  video: { url: "", isHidden: false },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "showVideo":
      return { ...state, video: { ...state.video, isHidden: false } };
    case "setupTraining":
      return {
        leftBar: {
          color: action.version === "A" ? "orange" : "green",
          isHidden: action.progress === 1 ? true : false,
        },
        rightBar: {
          color: action.version === "A" ? "green" : "orange",
          isHidden: action.progress === 1 ? false : true,
        },
        video: {
          url:
            action.progress === 1
              ? VideoLinks.HayleeRewardLeft
              : VideoLinks.HayleeRewardLeft,
          isHidden: true,
        },
      };
  }
}

export function useElementsReducer() {
  const [elementState, elementDispatch] = useReducer(reducer, initialState);
  return {elementState, elementDispatch};
}

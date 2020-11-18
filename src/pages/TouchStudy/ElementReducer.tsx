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
  | { type: "setupTraining"; progress: 0 | 1 | 2; version: "A" | "B" };

const initialState: State = {
  leftBar: { color: "orange", isHidden: true },
  rightBar: { color: "orange", isHidden: true },
  video: { url: "", isHidden: false },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "showVideo":
      return {
        leftBar: { ...state.leftBar, isHidden: true },
        rightBar: { ...state.rightBar, isHidden: true },
        video: { ...state.video, isHidden: false },
      };
    case "setupTraining":
      if (action.progress >= 1) {
        let url = "";
        /* Alternate the video displayed based on the setup */
        if (
          (action.progress === 1 && action.version === "A") ||
          (action.progress === 2 && action.version === "B")
        ) {
          url = VideoLinks.HayleeRewardLeft;
        } else {
          url = VideoLinks.HayleePunishRight;
        }
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
            url,
            isHidden: true,
          },
        };
      } else {
        return {
          ...state,
          video: { url: VideoLinks.UnfairToysA, isHidden: false },
        };
      }
  }
}

export function useElementsReducer() {
  const [elementState, elementDispatch] = useReducer(reducer, initialState);
  return { elementState, elementDispatch };
}

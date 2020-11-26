import { VideoLinks } from "./videoLinks.json";

export type Action = {
  type: "training" | "distribution" | "test";
  trial: number;
};

type Bar = {
  barType: "A" | "B";
  isHidden: boolean;
};
export type State = {
  currentDispatch: Action;
  leftBar: Bar;
  rightBar: Bar;
  video: {
    isHidden: boolean;
    url: string;
  };
  nextDispatch: Action;
};

const initialState: State = {
  leftBar: { barType: "A", isHidden: true },
  rightBar: { barType: "B", isHidden: true },
  video: { url: VideoLinks.AlexPunishRight, isHidden: false },
  currentDispatch: { type: "training", trial: 1 },
  nextDispatch: { type: "training", trial: 1 },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "training":
      if (action.trial === 1) {
        return {
          ...initialState,
          leftBar: { ...initialState.leftBar, isHidden: false },
          video: { ...initialState.video, url: VideoLinks.AlexPunishRight },
          nextDispatch: { type: "training", trial: 2 },
          currentDispatch: action,
        };
      } else if (action.trial === 2) {
        return {
          ...initialState,
          rightBar: { ...initialState.rightBar, isHidden: false },
          video: { ...initialState.video, url: VideoLinks.AlexPunishLeft },
          nextDispatch: { type: "training", trial: 3 },
          currentDispatch: action,
        };
      } else if (action.trial === 3) {
        return {
          ...initialState,
          leftBar: { ...initialState.leftBar, isHidden: false },
          rightBar: { ...initialState.rightBar, isHidden: false },
          video: { ...initialState.video, url: VideoLinks.AlexPunishRight },
          nextDispatch: { type: "distribution", trial: 1 },
          currentDispatch: action,
        };
      }
      break;
    case "distribution":
      if (action.trial === 1) {
        return {
          ...initialState,
          leftBar: { ...initialState.leftBar, isHidden: true },
          rightBar: { ...initialState.rightBar, isHidden: true },
          video: { url: VideoLinks.UnfairSnacksA, isHidden: false },
          nextDispatch: { type: "distribution", trial: 2 },
          currentDispatch: action,
        };
      } else if (action.trial === 2) {
        return {
          ...initialState,
          video: { url: VideoLinks.UnfairSnacksB, isHidden: false },
          nextDispatch: { type: "distribution", trial: 3 },
          currentDispatch: action,
        };
      } else if (action.trial === 3) {
        return {
          ...initialState,
          video: { url: VideoLinks.UnfairToysA, isHidden: false },
          nextDispatch: { type: "distribution", trial: 4 },
          currentDispatch: action,
        };
      } else if (action.trial === 4) {
        return {
          ...initialState,
          video: { url: VideoLinks.UnfairToysB, isHidden: false },
          nextDispatch: { type: "test", trial: 1 },
          currentDispatch: action,
        };
      }
      break;
    case "test":
      if (action.trial === 1) {
        return {
          ...initialState,
          video: { url: VideoLinks.UnfairSnacksA, isHidden: false },
          nextDispatch: { type: "test", trial: 2 },
          currentDispatch: action,
        };
      } else if (action.trial === 2) {
        return {
          leftBar: { ...initialState.leftBar, isHidden: false },
          rightBar: { ...initialState.rightBar, isHidden: false },
          video: { url: VideoLinks.UnfairSnacksB, isHidden: false },
          nextDispatch: { type: "test", trial: 3 },
          currentDispatch: action,
        };
      } else if (action.trial === 3) {
        return {
          ...initialState,
          video: { url: VideoLinks.UnfairToysA, isHidden: false },
          nextDispatch: { type: "test", trial: 4 },
          currentDispatch: action,
        };
      } else if (action.trial === 4) {
        return {
          leftBar: { ...initialState.leftBar, isHidden: false },
          rightBar: { ...initialState.rightBar, isHidden: false },
          video: { url: VideoLinks.UnfairToysB, isHidden: false },
          nextDispatch: { type: "test", trial: 5 },
          currentDispatch: action,
        };
      } else if (action.trial === 5) {
        return {
          ...initialState,
          video: { url: VideoLinks.UnfairSnacksA, isHidden: false },
          nextDispatch: { type: "test", trial: 6 },
          currentDispatch: action,
        };
      } else if (action.trial === 6) {
        return {
          leftBar: { ...initialState.leftBar, isHidden: false },
          rightBar: { ...initialState.rightBar, isHidden: false },
          video: { url: VideoLinks.UnfairSnacksA, isHidden: false },
          nextDispatch: { type: "test", trial: 7 },
          currentDispatch: action,
        };
      }
      break;
    default:
      return {
        ...state,
        video: { url: VideoLinks.UnfairSnacksA, isHidden: false },
      };
  }
  return initialState;
}

export { reducer, initialState };

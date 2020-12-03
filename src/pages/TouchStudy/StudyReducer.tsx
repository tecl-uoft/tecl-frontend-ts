import { VideoLinks } from "./videoLinks.json";

export type Action = {
  type: "training" | "distribution" | "test";
  trial: number;
};

type Bar = {
  barType: "A" | "B";
  isHidden: boolean;
  videoOnClick: string;
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
  leftBar: { barType: "A", isHidden: true, videoOnClick: "" },
  rightBar: { barType: "B", isHidden: true, videoOnClick: "" },
  video: { url: "", isHidden: false },
  currentDispatch: { type: "training", trial: 1 },
  nextDispatch: { type: "training", trial: 1 },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "training":
      const trainingVideoOrder = [
        VideoLinks.AlexPunishRight,
        VideoLinks.AlexPunishLeft,
      ];

      if (action.trial === 1) {
        return {
          ...initialState,
          leftBar: {
            ...initialState.leftBar,
            isHidden: false,
            videoOnClick: trainingVideoOrder[0],
          },
          video: { ...initialState.video, url: trainingVideoOrder[0] },
          nextDispatch: { type: "training", trial: 2 },
          currentDispatch: action,
        };
      } else if (action.trial === 2) {
        return {
          ...initialState,
          rightBar: {
            ...initialState.rightBar,
            isHidden: false,
            videoOnClick: trainingVideoOrder[1],
          },
          video: { ...initialState.video, url: trainingVideoOrder[1] },
          nextDispatch: { type: "training", trial: 3 },
          currentDispatch: action,
        };
      } else if (action.trial === 3) {
        return {
          ...initialState,
          leftBar: {
            ...initialState.leftBar,
            isHidden: false,
            videoOnClick: trainingVideoOrder[0],
          },
          rightBar: {
            ...initialState.rightBar,
            isHidden: false,
            videoOnClick: trainingVideoOrder[1],
          },
          video: { ...initialState.video, url: trainingVideoOrder[0] },
          nextDispatch: { type: "distribution", trial: 1 },
          currentDispatch: action,
        };
      }
      break;
    case "distribution":
      const distributionOrder = [
        VideoLinks.UnfairSnacksA,
        VideoLinks.UnfairToysA,
        VideoLinks.UnfairSnacksB,
        VideoLinks.UnfairToysB,
      ];
      if (action.trial === 1) {
        return {
          ...initialState,
          leftBar: { ...initialState.leftBar, isHidden: true },
          rightBar: { ...initialState.rightBar, isHidden: true },
          video: { url: distributionOrder[0], isHidden: false },
          nextDispatch: { type: "distribution", trial: 2 },
          currentDispatch: action,
        };
      } else if (action.trial === 2) {
        return {
          ...initialState,
          video: { url: distributionOrder[1], isHidden: false },
          nextDispatch: { type: "distribution", trial: 3 },
          currentDispatch: action,
        };
      } else if (action.trial === 3) {
        return {
          ...initialState,
          video: { url: distributionOrder[2], isHidden: false },
          nextDispatch: { type: "distribution", trial: 4 },
          currentDispatch: action,
        };
      } else if (action.trial === 4) {
        return {
          ...initialState,
          video: { url: distributionOrder[3], isHidden: false },
          nextDispatch: { type: "test", trial: 1 },
          currentDispatch: action,
        };
      }
      break;
    case "test":
      const videoOrder = [
        VideoLinks.AlexPunishLeft,
        VideoLinks.AlexRewardLeft,
        VideoLinks.HayleePunishLeft,
        VideoLinks.RachelPunishLeft,
      ];

      if (action.trial <= videoOrder.length * 2) {
        /* For all trials in 2 sets, i.e 1 and 2, 3 and 4... */
        const videoURL = videoOrder[Math.floor(action.trial / 2)];
        if (action.trial % 2 === 1) {
          /* First in set is showing the face of participant */
          return {
            ...initialState,
            video: { url: videoURL, isHidden: false },
            nextDispatch: { type: "test", trial: action.trial + 1 },
            currentDispatch: action,
          };
        } else {
          /* Second in set is allow participant to choose */
          return {
            leftBar: { ...initialState.leftBar, isHidden: false },
            rightBar: { ...initialState.rightBar, isHidden: false },
            video: { url: videoURL, isHidden: false },
            nextDispatch: { type: "test", trial: action.trial + 1 },
            currentDispatch: action,
          };
        }
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

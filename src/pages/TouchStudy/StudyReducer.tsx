import { VideoLinks } from "./videoLinks.json";

export type Action = {
  type: "setup" | "training" | "distribution" | "test" | "finish";
  trial: number;
  studySetup?: ITouchStudySetup;
};

type PanelOptions = "orange" | "green"

export type Bar = {
  barType: PanelOptions;
  isHidden: boolean;
  videoOnClick: string;
};

export interface ITouchStudySetup {
  leftPanel: PanelOptions;
  orangePanelValance: "positive" | "negative";
  fairOrder: "first" | "second";
  fairActor: "A" | "B"
}

export type State = {
  currentDispatch: Action;
  leftBar: Bar;
  rightBar: Bar;
  video: {
    isHidden: boolean;
    url: string;
  };
  nextDispatch: Action;
  studySetup: ITouchStudySetup | undefined
};

const shuffledArr = shuffleArray([0, 1]);
const rearrangeChoiceArr = (arr: any[]) => {
  return [arr[shuffledArr[0]], arr[shuffledArr[1]]];
};

/* const allBarTypes = rearrangeChoiceArr(["A", "B"]); */

const initialState: State = {
  leftBar: { barType: "orange", isHidden: true, videoOnClick: "" },
  rightBar: { barType: "green", isHidden: true, videoOnClick: "" },
  video: { url: "", isHidden: false },
  currentDispatch: { type: "training", trial: 0 },
  nextDispatch: { type: "training", trial: 1 },
  studySetup: undefined
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setup":
      if (!action.studySetup) {
        break;
      }
      return {
        ...state,
        leftBar: { ...state.leftBar, barType: action.studySetup.leftPanel },
        rightBar: {
          ...state.rightBar,
          barType: action.studySetup.leftPanel === "green" ? "orange" : "green"
        },
        studySetup: action.studySetup
      }
    case "training":
      const isLeftBarPosOrange = state.studySetup?.orangePanelValance === "positive" && state.studySetup.leftPanel === "orange"
      const leftBarVideo = isLeftBarPosOrange ? VideoLinks.AlexRewardLeft : VideoLinks.AlexPunishLeft;
      const rightBarVideo = isLeftBarPosOrange ? VideoLinks.AlexPunishRight : VideoLinks.AlexPunishRight;

      if (action.trial === 1) {
        return {
          ...initialState,
          leftBar: {
            ...state.leftBar,
            isHidden: false,
            videoOnClick: leftBarVideo,
          },
          video: { ...initialState.video, url: leftBarVideo },
          nextDispatch: { type: "training", trial: 2 },
          currentDispatch: action,
        };
      } else if (action.trial === 2) {
        return {
          ...initialState,
          rightBar: {
            ...state.rightBar,
            isHidden: false,
            videoOnClick: rightBarVideo,
          },
          video: { ...initialState.video, url: rightBarVideo },
          nextDispatch: { type: "training", trial: 3 },
          currentDispatch: action,
        };
      } else if (action.trial === 3) {
        return {
          ...initialState,
          leftBar: {
            ...state.leftBar,
            isHidden: false,
            videoOnClick: leftBarVideo,
          },
          rightBar: {
            ...state.rightBar,
            isHidden: false,
            videoOnClick: rightBarVideo,
          },
          video: { ...initialState.video, url: leftBarVideo },
          nextDispatch: { type: "distribution", trial: 1 },
          currentDispatch: action,
        };
      }
      break;
    case "distribution":
      const distributionOrder = shuffleArray([
        VideoLinks.UnfairSnacksA,
        VideoLinks.UnfairToysA,
        VideoLinks.UnfairSnacksB,
        VideoLinks.UnfairToysB,
      ]);
      if (action.trial <= distributionOrder.length * 2 - 1) {
        if (action.trial % 2 === 1) {
          return {
            ...initialState,
            video: { url: VideoLinks.BabyShaker, isHidden: false },
            nextDispatch: { type: "distribution", trial: action.trial + 1 },
            currentDispatch: action,
          };
        } else {
          return {
            ...initialState,
            video: {
              url: distributionOrder[action.trial / 2 - 1],
              isHidden: false,
            },
            nextDispatch: { type: "distribution", trial: action.trial + 1 },
            currentDispatch: action,
          };
        }
      } else if (action.trial === distributionOrder.length * 2) {
        return {
          ...initialState,
          video: {
            url: distributionOrder[action.trial / 2 - 1],
            isHidden: false,
          },
          nextDispatch: { type: "test", trial: 1 },
          currentDispatch: action,
        };
      }
      break;
    case "test":
      const videoOrder = [
        [VideoLinks.AlexPunishLeft, VideoLinks.AlexRewardLeft],
        [VideoLinks.RachelPunishRight, VideoLinks.RachelRewardRight],
        [VideoLinks.RachelPunishLeft, VideoLinks.RachelRewardLeft],
      ].map((subArr) => rearrangeChoiceArr(subArr));
      if (action.trial <= videoOrder.length * 2) {
        /* For all trials in 2 sets, i.e 1 and 2, 3 and 4... */
        const videoURL = videoOrder[Math.floor((action.trial + 1) / 2) - 1];
        if (action.trial % 2 === 1) {
          /* First in set is showing the face of participant */
          return {
            ...initialState,
            video: { url: videoURL[0], isHidden: false },
            nextDispatch: { type: "test", trial: action.trial + 1 },
            currentDispatch: action,
          };
        } else {
          /* Second in set is allowing participant to choose */
          return {
            ...state,
            leftBar: {
              ...initialState.leftBar,
              isHidden: false,
              videoOnClick: videoURL[0],
            },
            rightBar: {
              ...initialState.rightBar,
              isHidden: false,
              videoOnClick: videoURL[1],
            },
            video: { url: videoURL[0], isHidden: false },
            nextDispatch: { type: "test", trial: action.trial + 1 },
            currentDispatch: action,
          };
        }
      } else if (action.trial === (videoOrder.length * 2) + 1) {
        return {
          ...initialState,
          currentDispatch: { type: "finish", trial: 0 },
        };
      }
      break;
    default:
      return {
        ...initialState,
      };
  }
  return initialState;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm, 
    returns new array */
function shuffleArray<T>(originalArray: T[]) {
  const array = [...originalArray];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export { reducer, initialState };

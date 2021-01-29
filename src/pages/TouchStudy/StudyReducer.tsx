import { VideoLinks } from "./videoLinks.json";

export type Action = {
  type: "setup" | "training" | "distribution" | "test" | "finish";
  trial: number;
  studySetup?: ITouchStudySetup;
};

type PanelOptions = "orange" | "green";

export type Bar = {
  barType: PanelOptions;
  isHidden: boolean;
  videoOnClick: string;
};

export interface ITouchStudySetup {
  leftPanel: PanelOptions;
  orangePanelValance: "positive" | "negative";
  fairOrder: "first" | "second";
  fairActor: "A" | "B";
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
  studySetup: ITouchStudySetup | undefined;
};

/* const allBarTypes = rearrangeChoiceArr(["A", "B"]); */

const initialState: State = {
  leftBar: { barType: "orange", isHidden: true, videoOnClick: "" },
  rightBar: { barType: "green", isHidden: true, videoOnClick: "" },
  video: { url: "", isHidden: false },
  currentDispatch: { type: "training", trial: 0 },
  nextDispatch: { type: "training", trial: 1 },
  studySetup: undefined,
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
          barType: action.studySetup.leftPanel === "green" ? "orange" : "green",
        },
        studySetup: action.studySetup,
      };
    case "training":
      const TrainingVideo =
        state.studySetup?.fairActor === "A"
          ? {
              rewardLeft: VideoLinks.AlexRewardLeft,
              punishLeft: VideoLinks.AlexPunishLeft,
              rewardRight: VideoLinks.AlexRewardRight,
              punishRight: VideoLinks.AlexPunishRight,
            }
          : {
              rewardLeft: VideoLinks.RachelRewardLeft,
              punishLeft: VideoLinks.RachelPunishLeft,
              rewardRight: VideoLinks.RachelRewardRight,
              punishRight: VideoLinks.RachelPunishRight,
            };
      const isLeftBarPosOrange =
        state.studySetup?.orangePanelValance === "positive" &&
        state.studySetup.leftPanel === "orange";
      const leftBarVideo = isLeftBarPosOrange
        ? TrainingVideo.rewardLeft
        : TrainingVideo.punishRight;
      const rightBarVideo = isLeftBarPosOrange
        ? TrainingVideo.rewardRight
        : TrainingVideo.punishRight;

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
          studySetup: state.studySetup,
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
          studySetup: state.studySetup,
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
          studySetup: state.studySetup,
        };
      }
      break;
    case "distribution":
      const totalDistributionOrder = [
        VideoLinks.FairToysA,
        VideoLinks.FairToysB,
        VideoLinks.UnfairToysA,
        VideoLinks.UnfairToysB,
        VideoLinks.FairSnacksA,
        VideoLinks.FairSnacksB,
        VideoLinks.UnfairSnacksA,
        VideoLinks.UnfairSnacksB,
      ];
      if (!state.studySetup) {
        break;
      }
      const { fairOrder, fairActor } = state.studySetup;
      const distributionOrder = totalDistributionOrder.reduce<string[]>(
        (acc, link, idx) => {
          /* Actor B only */
          if (fairActor === "A" && idx % 2 === 0) {
            if (fairOrder === "first") {
              acc.push(link);
            } else {
              idx % 4 === 0
                ? acc.push(totalDistributionOrder[idx - 2])
                : acc.push(totalDistributionOrder[idx + 2]);
            }
          } else if (fairActor === "B" && idx % 2 === 1) {
            /* Actor B only */
            /* Fair first */
            if (fairOrder === "first") {
              acc.push(link);
            } else {
              /* Unfair first */
              idx % 3 === 0
                ? acc.push(totalDistributionOrder[idx - 2])
                : acc.push(totalDistributionOrder[idx + 2]);
            }
          }
          return acc;
        },
        []
      );

      if (action.trial <= distributionOrder.length * 2 - 1) {
        if (action.trial % 2 === 1) {
          /* Put a video of a baby shake inbetween each video */
          return {
            ...initialState,
            video: { url: VideoLinks.BabyShaker, isHidden: false },
            nextDispatch: { type: "distribution", trial: action.trial + 1 },
            currentDispatch: action,
            studySetup: state.studySetup,
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
            studySetup: state.studySetup,
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
          studySetup: state.studySetup,
        };
      }
      break;
    case "test":
      if (!state.studySetup || !state.studySetup.leftPanel) {
        break;
      }
      const { leftPanel, orangePanelValance } = state.studySetup;
      const isTestLeftBarPosOrange =
        orangePanelValance === "positive" && leftPanel === "orange";

      const videoOrder = [
        {
          punishLeft: VideoLinks.AlexPunishLeft,
          rewardLeft: VideoLinks.AlexRewardLeft,
          punishRight: VideoLinks.AlexPunishRight,
          rewardRight: VideoLinks.AlexRewardRight,
        },
        {
          punishLeft: VideoLinks.RachelPunishLeft,
          rewardLeft: VideoLinks.RachelRewardLeft,
          punishRight: VideoLinks.RachelPunishRight,
          rewardRight: VideoLinks.RachelRewardRight,
        },
        {
          punishLeft: VideoLinks.HayleePunishLeft,
          rewardLeft: VideoLinks.HayleeRewardLeft,
          punishRight: VideoLinks.HayleePunishRight,
          rewardRight: VideoLinks.HayleeRewardRight,
        },
      ].map((videoSet) => {
        /* Wrong just order video fairness first or unfair first / dont include person distributing */
        if (isTestLeftBarPosOrange) {
          return [videoSet.rewardLeft, videoSet.punishRight];
        } else {
          return [videoSet.punishLeft, videoSet.rewardRight];
        }
      });

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
            studySetup: state.studySetup,
          };
        } else {
          /* Second in set is allowing participant to choose */
          return {
            ...state,
            leftBar: {
              ...state.leftBar,
              isHidden: false,
              videoOnClick: videoURL[0],
            },
            rightBar: {
              ...state.rightBar,
              isHidden: false,
              videoOnClick: videoURL[1],
            },
            video: { url: videoURL[0], isHidden: false },
            nextDispatch: { type: "test", trial: action.trial + 1 },
            currentDispatch: action,
            studySetup: state.studySetup,
          };
        }
      } else if (action.trial === videoOrder.length * 2 + 1) {
        return {
          ...initialState,
          currentDispatch: { type: "finish", trial: 0 },
          studySetup: state.studySetup,
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
/* function shuffleArray<T>(originalArray: T[]) {
  const array = [...originalArray];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
} */

export { reducer, initialState };

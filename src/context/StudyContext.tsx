import React, { createContext, useContext, useState } from "react";
import ScheduleEventService, {
  ICreateScheduleEventProps,
  IScheduleEvent,
} from "../services/ScheduleEventService";
import StudyService, { ICreateStudyProps } from "../services/StudyService";
import { useAuth } from "./AuthContext";
import { Props } from "./commonTypes";
import { v4 as uuidv4 } from "uuid";

interface IStudyContext {
  /* Create a study to set up a scheduling system for */
  createStudy(study: ICreateStudyProps): void;
  createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ): void;
  listStudy(): any[];
  studyState: any;
  setStudyState(studyState: any): void;
}

interface IStudy {
  studyName: string;
  leadResearchers: any[];
  researchAssitants: any[];
  scheduleEvents: IScheduleEvent[];
  startDate: Date;
  endDate: Date;
  keyColor: string;
}

export const StudyContext = createContext<IStudyContext | undefined>(undefined);

export function StudyProvider({ children }: Props) {
  const [studyState, setStudyState] = useState<IStudy | undefined>(undefined);
  const authCtx = useAuth();

  /* Create a study which needs to be set up with a scheduling system. */
  function createStudy(study: ICreateStudyProps) {
    StudyService.create(study)
      .then(() => {
        /* When create is sucessful, update the user's studies property */
        authCtx?.addCreatedStudyToUser(study);
      })
      .catch((err) => {
        alert(`Error in Study context: ${err}`);
      });
  }

  const listStudy = () => {
    StudyService.list()
      .then((studyRes) => {
        setStudyState(studyRes.study[0]);
        return studyRes.study;
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
    return [];
  };

  /* Add a schedule event for a particular study */
  function createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ) {
    if (studyState) {
      const { title, start, end } = createScheduleEventProps;
      /*  Convert the input into a proper format for a schedule event */
      const scheduleEvent = {
        title,
        start,
        end,
        color: studyState.keyColor,
        id: uuidv4(),
      };
      ScheduleEventService.create(studyState.studyName, scheduleEvent)
        .then(() => {
          /* Add Created events to existing set of events in study */
          setStudyState({
            ...studyState,
            scheduleEvents: [...studyState.scheduleEvents, scheduleEvent],
          });
        })
        .catch((err) => {
          alert(`Error in Study context, Received: ${err.message}`);
        });
    }
  }

  const defaultContextValue = {
    createStudy,
    createScheduleEvent,
    studyState,
    listStudy,
    setStudyState,
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

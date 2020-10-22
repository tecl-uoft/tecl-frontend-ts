import React, { createContext, useContext, useState } from "react";
import ScheduleEventService, {
  ICreateScheduleEventProps,
  ICreateScheduleEventVal,
} from "../services/ScheduleEventService";
import StudyService, { ICreateStudyProps } from "../services/StudyService";
import { useAuth } from "./AuthContext";
import { Props } from "./commonTypes";

interface IStudyContext {
  /* Create a study to set up a scheduling system for */
  createStudy(study: ICreateStudyProps): void;
  createScheduleEvent(
    studyName: string,
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
  scheduleEvents: ICreateScheduleEventVal[];
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
  const createScheduleEvent = (
    studyName: string,
    createScheduleEventProps: ICreateScheduleEventProps
  ) => {
    ScheduleEventService.create(studyName, createScheduleEventProps)
      .then((createdScheduleEvents) => {
        /* Add Created events to existing set of events in study */
        if (createdScheduleEvents) {
          /*  setStudyState({
            ...studyState,
            scheduleEvents: [
              ...studyState.scheduleEvents,
              ...createdScheduleEvents,
            ],
          }); */
        }
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
  };

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

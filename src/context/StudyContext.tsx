import React, { createContext, useContext, useState } from "react";
import ScheduleEventService, {
  ICreateScheduleEventProps,
  ICreateScheduleEventVal,
} from "../services/ScheduleEventService";
import StudyService from "../services/StudyService";
import { Props } from "./commonTypes";

interface IStudyContext {
  createStudy(study: any): void;
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
  const [studyState, setStudyState] = useState<any>(undefined);

  const createStudy = (study: any) => {
    StudyService.create(study)
      .then((studyRes) => {
        setStudyState(studyRes);
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
  };

  const listStudy = () => {
    StudyService.list()
      .then((studyRes) => {
        console.log("stdy", studyRes)
        setStudyState(studyRes.study[0]);
        console.log("study service", studyRes.study);
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
          console.log("bfore", studyState)
          setStudyState({
            ...studyState,
            scheduleEvents: [
              ...studyState.scheduleEvents,
              ...createdScheduleEvents,
            ],
          });
          console.log("blblb", studyState)
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

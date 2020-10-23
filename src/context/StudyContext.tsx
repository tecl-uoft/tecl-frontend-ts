import React, { createContext, useContext, useState } from "react";
import ScheduleEventService, {
  ICreateScheduleEventProps,
} from "../services/ScheduleEventService";
import StudyService, { IStudy } from "../services/StudyService";

import { Props } from "./commonTypes";
import { v4 as uuidv4 } from "uuid";

interface IStudyContext {
  /* Create a study to set up a scheduling system for */
  createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ): void;
  studyState: IStudy | undefined;
  findAndSetStudy(studyName: string): void;
}

export const StudyContext = createContext<IStudyContext | undefined>(undefined);

export function StudyProvider({ children }: Props) {
  /* To set individual study states */
  const [studyState, setStudyState] = useState<IStudy | undefined>(undefined);

  /* Find and set a study based on it's name */
  function findAndSetStudy(studyName: string): void {
    StudyService.read(studyName)
      .then((study) => {
        setStudyState(study);
      })
      .catch((err) => {
        alert(`${err}`);
      });
    return;
  }

  /* Add a schedule event for the current study state */
  function createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ): void {
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
          console.log(studyState);
          /* Add Created events to existing set of events in study */
          setStudyState({
            ...studyState,
            scheduleEvents: [...studyState.scheduleEvents, scheduleEvent],
          });
        })
        .catch((err) => {
          alert(`Error in Study context, Received: ${err.message}`);
        });
      return;
    }
  }

  const defaultContextValue = {
    createScheduleEvent,
    findAndSetStudy,
    studyState,
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

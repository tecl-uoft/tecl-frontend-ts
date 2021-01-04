import React, { createContext, useContext, useState } from "react";
import ScheduleEventService, {
  ICreateScheduleEventProps,
} from "../services/ScheduleEventService";
import StudyService, { IStudy } from "../services/StudyService";

import { Props } from "./commonTypes";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

interface IStudyContext {
  /* Create a study to set up a scheduling system for */
  createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ): void;
  removeScheduleEvent(calId: string): void;
  studyState: IStudy | undefined;
  findAndSetStudy(studyName: string): void;
  addCoordinators(study: {
    studyName: string;
    leadResearchers: string[];
  }): void;
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

  function addCoordinators(study: {
    studyName: string;
    leadResearchers: string[];
  }) {
    StudyService.update(study)
      .then(() => {
        if (!studyState) throw new Error("error in study state");
        setStudyState({
          ...studyState,
          leadResearchers: [...studyState.leadResearchers],
        });
      })
      .catch((err) => alert(err.message));
  }

  /* Remove schedule event from the current study */
  function removeScheduleEvent(calId: string): void {
    if (studyState) {
      ScheduleEventService.remove(calId)
        .then(() => {
          const unremovedScheduleEvents = _.filter(
            studyState.scheduleEvents,
            (se) => {
              return se.id !== calId;
            }
          );
          setStudyState({
            ...studyState,
            scheduleEvents: unremovedScheduleEvents,
          });
        })
        .catch((err) => alert(err));
    }
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
      ScheduleEventService.create(
        studyState.studyName,
        createScheduleEventProps
      )
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
      return;
    }
  }

  const defaultContextValue = {
    createScheduleEvent,
    removeScheduleEvent,
    findAndSetStudy,
    addCoordinators,
    studyState,
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

import React, { createContext, useContext, useState } from "react";
import ScheduleEventService, {
  ICreateScheduleEventProps,
  IScheduleEvent,
} from "../services/ScheduleEventService";
import StudyService, { IStudy } from "../services/StudyService";

import { Props } from "./commonTypes";
import { v4 as uuidv4 } from "uuid";

interface IStudyContext {
  /* Create a study to set up a scheduling system for */
  createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ): Promise<void>;
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
        alert(`Cannot find and set this particular study. ${err}`);
      });
    return;
  }

  function addCoordinators(study: {
    studyName: string;
    leadResearchers: string[];
  }) {
    StudyService.update(study)
      .then(() => {
        /* if (!studyState) throw new Error("Error in study state");
        setStudyState({
          ...studyState,
          leadResearchers: [...studyState.leadResearchers],
        }); */
      })
      .catch((err) => { console.log(err) });
  }

  /* Remove schedule event from the current study */
  function removeScheduleEvent(calId: string): void {
    if (studyState) {
      ScheduleEventService.remove(calId)
        .then(() => {
          const unremovedScheduleEvents = studyState.scheduleEvents.filter(
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
  async function createScheduleEvent(
    createScheduleEventProps: ICreateScheduleEventProps
  ): Promise<void> {
    if (studyState) {
      const { title, start, end } = createScheduleEventProps;

      /*  Convert the input into a proper format for a schedule event */
      const scheduleEvent: IScheduleEvent = {
        title,
        start,
        end,
        color: studyState.keyColor,
        id: uuidv4(),
      };

      try {
       
        await ScheduleEventService.create(
          studyState.studyName,
          createScheduleEventProps
        );

        setStudyState({
          ...studyState,
          scheduleEvents: [...studyState.scheduleEvents, scheduleEvent],
        });
      } catch (err) {
        const errMsg = (err as any).message
        alert(`Error in Study context, Received: ${errMsg}`);
      }

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

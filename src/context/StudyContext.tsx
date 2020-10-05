import React, { createContext, useContext, useState } from "react";
import ScheduleEventService from "../services/ScheduleEventService";
import StudyService from "../services/StudyService";
import { Props } from "./commonTypes";

interface IStudyContext {
  createStudy(study: any): void;
  listStudy(): any[];
  studyState: any;
  setStudyState(studyState: any): void;
  addScheduleEvent(scheduleEvent: any): void;
  updateAvailableTimeSlots(timeslot: any): void;
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
        setStudyState(studyRes.study[0]);
        return studyRes.study;
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
    return [];
  };

  const updateAvailableTimeSlots = (timeslot: { from: Date; to: Date }) => {
    const newAvailableTimeSlots = studyState.availableTimeSlots;
    studyState.availableTimeSlots.push(timeslot);
    StudyService.update({
      studyName: studyState.studyName,
      availableTimeSlots: newAvailableTimeSlots,
    });
  };

  const addScheduleEvent = (scheduleEvent: any) => {
    ScheduleEventService.create(scheduleEvent)
      .then((createdSE) => {
        const newStudyState = studyState;
        newStudyState.scheduleEvents.push(createdSE);
        setStudyState(newStudyState);
        console.log("see", createdSE, newStudyState, studyState);
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
  };

  const defaultContextValue = {
    createStudy,
    studyState,
    listStudy,
    setStudyState,
    addScheduleEvent,
    updateAvailableTimeSlots
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

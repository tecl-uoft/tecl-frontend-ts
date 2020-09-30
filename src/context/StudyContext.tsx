import React, { createContext, useContext, useState } from "react";
import StudyService from "../services/StudyService";
import { Props } from "./commonTypes";

export const StudyContext = createContext<any | undefined>(undefined);

export function StudyProvider({ children }: Props) {
  const [studyState, setStudyState] = useState<any>(undefined);

  const createStudy = (study: any) => {
    StudyService.create(study).then((studyRes) => {
      setStudyState(studyRes);
    }).catch((err) => {
        alert(`Error ${err.code}: ${err.message}`)
    });
  };

  const defaultContextValue = {
    createStudy,
    studyState
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

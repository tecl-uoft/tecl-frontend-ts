import React, { createContext, useContext, useState } from "react";
import StudyService from "../services/StudyService";
import { Props } from "./commonTypes";

interface IStudyContext {
  createStudy(study: any): void;
  studyState: any;
}

export const StudyContext = createContext<IStudyContext | undefined>(undefined);

export function StudyProvider({ children }: Props) {
  const [studyState, setStudyState] = useState<any>(undefined);

  const createStudy = (study: any) => {
    console.log("studyy", study)
    StudyService.create(study)
      .then((studyRes) => {
        setStudyState(studyRes);
        console.log("loggin study", studyRes)
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
  };

  const defaultContextValue = {
    createStudy,
    studyState,
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

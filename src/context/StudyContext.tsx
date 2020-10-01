import React, { createContext, useContext, useState } from "react";
import StudyService from "../services/StudyService";
import { Props } from "./commonTypes";

interface IStudyContext {
  createStudy(study: any): void;
  listStudy(): any[];
  studyState: any;
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
        setStudyState(studyRes[0]);
        return studyRes
      })
      .catch((err) => {
        alert(`Error in study context, Code ${err.code}: ${err.message}`);
      });
      return []
  };

  const defaultContextValue = {
    createStudy,
    studyState,
    listStudy,
  };

  return (
    <StudyContext.Provider value={defaultContextValue}>
      {children}
    </StudyContext.Provider>
  );
}

export const useStudy = () => useContext(StudyContext);

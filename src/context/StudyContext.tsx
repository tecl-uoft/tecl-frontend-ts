import React, { createContext } from 'react'
import { Props } from './commonTypes'


export const StudyContext = createContext<any | undefined>(undefined);

export function StudyProvider({ children }: Props) {


    return (
        <StudyContext.Provider value={{}}>{children}</StudyContext.Provider>
    )
}


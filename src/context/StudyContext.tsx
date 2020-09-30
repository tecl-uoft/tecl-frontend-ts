import React, { createContext } from 'react'
import { Props } from './commonTypes'


export const StudyContext = createContext<any | undefined>(undefined);

function StudyProvider({ children }: Props) {

    
    return (
        <StudyContext.Provider value={{}}></StudyContext.Provider>
    )
}

export default StudyContext

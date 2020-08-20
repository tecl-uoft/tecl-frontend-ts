import { createContext } from "react";

const currDate = new Date();
const startTime = createContext(currDate.getTime());

export default startTime;

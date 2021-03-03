import { IScheduleEvent } from "./ScheduleEventService";

const StudyService = {
  create,
  list,
  read,
  update,
  listNames,
};

export interface IStudy {
  studyName: string;
  leadResearchers: { email: string; firstName: string; lastName?: string }[];
  researchAssitants: string[];
  scheduleEvents: IScheduleEvent[];
  startDate: Date;
  endDate: Date;
  keyColor: string;
  minAgeDays: number;
  maxAgeDays: number;
  description: string;
  defaultTimeInterval: number;
  apptGoals: number;
}
export interface ICreateStudyProps {
  studyName: string;
  startDate: string;
  endDate: string;
  keyColor: string;
  minAgeDays: number;
  maxAgeDays: number;
  description: string;
  defaultTimeInterval: number;
  apptGoals: number;
}

export interface IStudyName {
  studyName: string;
  keyColor: string;
  maxAgeDays: number;
  minAgeDays: number;
  description: string;
}

/* Get a list of studies either for all users or for the current authenticated user. */
async function listNames({
  ownedByUser,
}: {
  ownedByUser: boolean;
}): Promise<IStudyName[]> {
  try {
    const response = await fetch(
      `/api/v1/studies/names?ownedByUser=${ownedByUser}`
    );

    if (response.ok && response.status === 200) {
      const { studies } = await response.json();
      return studies as IStudyName[];
    } else {
      throw new Error("Failed to fetch Study service list");
    }
  } catch (err) {
    throw err;
  }
}

/* Create a study that is linked with the logged in user. User must be authenticated. */
async function create(study: ICreateStudyProps): Promise<IStudy> {
  try {
    const response = await fetch(`/api/v1/study`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ study }),
    });
    if (response.status !== 201) {
      throw Error(
        "Status indicates study has not been update. Got status: " +
          response.status
      );
    }
    /* Return the response typecasted as Study */
    const resJson: any = response.json();
    return resJson.study as IStudy;
  } catch (err) {
    throw err;
  }
}

/* Get a list of studies either for all users or for the current authenticated user. */
async function list(forUser: boolean): Promise<IStudy[]> {
  try {
    const response = await fetch(
      `/api/v1/studies/${forUser ? "?ownedByUser=true" : ""}`,
      { method: "GET" }
    );
    if (response.ok) {
      const studyGetRes: any = await response.json();
      return studyGetRes.study as IStudy[];
    } else {
      throw new Error("Failed to fetch Study service list");
    }
  } catch (err) {
    throw err;
  }
}

async function update(studyToUpdate: any): Promise<void> {
  const response = await fetch(`/api/v1/study`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study: studyToUpdate }),
  });

  if (response.ok) {
    return;
  } else {
    throw new Error(`Create schedule event failed`);
  }
}

async function read(studyName: string): Promise<IStudy> {
  try {
    const response = await fetch(`/api/v1/study?studyName=${studyName}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Study service read failed");
    }
    const studyGetRes = await response.json();
    return studyGetRes.study;
  } catch (err) {
    throw err;
  }
}

export default StudyService;

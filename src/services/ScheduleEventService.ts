export default {
  create,
};

export interface ICreateScheduleEventProps {
  title: string;
  start: string;
  end: string;
}

export interface IScheduleEvent {
  title: string;
  start: string;
  end: string;
  id: string;
  color: string;
}

/* Function to create a schedule event linked with a particular study */
async function create(
  studyName: string,
  scheduleEvent: IScheduleEvent
): Promise<void> {
  try {
    const res = await fetch(`/api/v1/schedule-event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studyName, scheduleEvent }),
    });
    if (!res.ok || res.status !== 201) {
      throw Error("Expected HTTP error status 201, got:" + res.status);
    }
    return;
  } catch (err) {
    throw err;
  }
}

export default {
  create,
};

export interface ICreateScheduleEventProps {
  title: string;
  start: Date;
  end: Date;
}

export interface ICreateScheduleEventVal {
  title: string;
  start: string;
  end: string;
  calId: string;
  color: string;
}

async function create(
  studyName: string,
  scheduleEvent: ICreateScheduleEventProps
): Promise<ICreateScheduleEventVal[] | undefined> {
  const response = await fetch(`/api/v1/schedule-event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studyName, scheduleEvent }),
  });

  if (response.ok) {
    const scheduleEventRes = await response.json();
    return scheduleEventRes.schedulesCreated;
  } else {
    alert(`Create schedule event failed failed`);
  }
}

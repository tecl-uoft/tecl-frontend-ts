export default {
  create,
};

interface ICreateScheduleEvent {
  title: string;
  start: Date;
  end: Date;
}

async function create(
  studyName: string,
  scheduleEvent: ICreateScheduleEvent
): Promise<void> {
  const response = await fetch(`/api/v1/schedule-event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ studyName, scheduleEvent }),
  });

  if (response.ok) {
    const scheduleEventRes = await response.json();
    return scheduleEventRes;
  } else {
    alert(`Create schedule event failed failed`);
  }
}

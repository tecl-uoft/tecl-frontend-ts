export default {
  create,
};

async function create(scheduleEvent: any): Promise<void> {
  const response = await fetch(`/api/v1/schedule-event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scheduleEvent }),
  });

  if (response.ok) {
    const scheduleEventRes = await response.json();
    return scheduleEventRes;
  } else {
    alert(`Create schedule event failed failed`);
  }
}

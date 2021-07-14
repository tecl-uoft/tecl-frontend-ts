const ScheduleEventScervice = {
  create,
  remove,
  updateParticipantInfo,
  listBooked,
  read,
  openRemove,
};

export interface IScheduleEvent {
  title: string;
  start: string;
  end: string;
  id: string;
  color: string;
}

export interface ICreateScheduleEventProps {
  title: string;
  start: string;
  end: string;
  isRecurring: boolean;
  endRecurringDate: string;
  recurringInterval: number;
  bookingDeadline: string;
}

export interface ICompleteScheduleEvent {
  title: string;
  start: string;
  end: string;
  color: string;
  meetingLink: string;
  meetingPassword: string;
  participantInfo: {
    email: string;
    child: { firstName: string; lastName: string; dob: string };
    firstName: string;
    lastName: string;
  };
  createdBy: { firstName: string; lastName: string; email: string };
  dateBooked?: string;
}

async function read(eventId: string): Promise<ICompleteScheduleEvent> {
  try {
    const res = await fetch(`/api/v1/schedule-event?eventId=${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Response failed");
    }
    const resJson = await res.json();
    return resJson.scheduleEvent;
  } catch (err) {
    throw err;
  }
}

/* Function to create a schedule event linked with a particular study */
async function create(
  studyName: string,
  scheduleEvent: ICreateScheduleEventProps
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

async function remove(calId: string): Promise<void> {
  try {
    const res = await fetch(`/api/v1/schedule-event`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduleEvent: { calId } }),
    });
    if (!res.ok || res.status !== 202) {
      throw Error("Expected HTTP error status 202, got:" + res.status);
    }
  } catch (err) {
    throw err;
  }
}

async function openRemove(calId: string, privateHash: string): Promise<void> {
  try {
    const res = await fetch(`/api/v1/schedule-event/open`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduleEvent: { calId, privateHash } }),
    });
    if (!res.ok) {
      throw Error("Expected HTTP error status 201, got:" + res.status);
    }
  } catch (err) {
    throw err;
  }
}

interface IUpdateScheduleEventProps {
  participantInfo: {
    calId: string;
    firstName: string;
    lastName: string;
    email: string;
    child: {
      firstName: string;
      lastName: string;
      dob: string;
    };
    addToSharedDB: boolean;
    phoneNum?: string;
  };
  additionalCSCChildren: { firstName: string; lastName: string; dob: string }[];
}
async function updateParticipantInfo(
  scheduleEvent: IUpdateScheduleEventProps
): Promise<void> {
  try {
    const res = await fetch(`/api/v1/schedule-event/participant-info`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduleEvent }),
    });
    if (!res.ok) {
      throw Error("Expected HTTP status 204, got: " + res.status);
    }
  } catch (err) {
    throw err;
  }
}

export interface IBookedScheduleEvent {
  title: string;
  start: string;
  end: string;
  id: string;
  color: string;
  participantInfo: {
    firstName: string;
    lastName: string;
    email: string;
    child: {
      firstName: string;
      lastName: string;
      dob: string;
    };
  };
  bookedBy?: {
    firstName: string;
    lastName: string;
  };
}

async function listBooked(studyName: string): Promise<IBookedScheduleEvent[]> {
  try {
    const res = await fetch(`/api/v1/schedule-events?studyName=${studyName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw Error("Expected HTTP status 204, got: " + res.status);
    }
    const resJson = await res.json();
    return resJson.scheduleEvents;
  } catch (err) {
    throw err;
  }
}

export default ScheduleEventScervice;

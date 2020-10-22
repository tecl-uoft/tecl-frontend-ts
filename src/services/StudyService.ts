export default {
  create,
  read,
  list,
  update,
};

export interface ICreateStudyProps {
  studyName: string;
  startDate: string;
  endDate: string;
  keyColor: string;
  minAgeDays: number;
  maxAgeDays: number;
}

async function create(study: ICreateStudyProps): Promise<void> {
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
    alert(`Create schedule event failed`);
  }
}

async function list(): Promise<any> {
  const response = await fetch(`/api/v1/studies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const studyGetRes = await response.json();
    return studyGetRes;
  } else {
    alert(`Getting study failed`);
  }
}

async function read(studyName: string): Promise<any> {
  const response = await fetch(`/api/v1/study`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study: { studyName } }),
  });

  if (response.ok) {
    const studyGetRes = await response.json();
    return studyGetRes;
  } else {
    alert(`Getting study failed`);
  }
}

export default {
  create,
  read,
  list,
  update,
  createAvailability,
};

async function create(study: any): Promise<void> {
  const response = await fetch(`/api/v1/study`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study }),
  });

  if (response.ok) {
    const studyPostRes = await response.json();
    return studyPostRes;
  } else {
    alert(`Create schedule event failed`);
  }
}

async function createAvailability(
  studyName: string,
  availability: { start: Date; end: Date, title: string }
): Promise<void> {
  const response = await fetch(`/api/v1/study/availability`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ study: { studyName, availability } }),
  });

  if (response.ok) {
    return;
  } else {
    alert(`Create schedule event failed`);
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

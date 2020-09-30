export default {
  create,
  read,
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

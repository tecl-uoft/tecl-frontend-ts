async function create(
  participantType: "adult" | "child",
  participantEmail: string
) {
  try {
    const res = await fetch(
      `/api/v1/frogger-study?participant_type=${participantType}`
    );

    if (!res.ok) {
      throw new Error("Response failed");
    }
    const resJson = await res.json();
    return resJson.froggerStudy;
  } catch (err) {
    throw err;
  }
}

async function email(participant: { type: "adult" | "child"; email: string }) {
  try {
    const res = await fetch(`/api/v1/frogger-study/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant }),
    });

    if (!res.ok) {
      throw new Error("Response failed");
    }
    return;
  } catch (err) {
    throw err;
  }
}

const FroggerStudyService = {
  create,
  email,
};

export default FroggerStudyService;

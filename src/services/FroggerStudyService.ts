async function create(participantType: "adult" | "child", participantEmail: string) {
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

const FroggerStudyService = {
  create,
};

export default FroggerStudyService;

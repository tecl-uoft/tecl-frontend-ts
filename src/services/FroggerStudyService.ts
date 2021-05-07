import {
  IFroggerParticipant,
  IFroggerResponse,
} from "../components/FroggerStudy/FroggerStudy";

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

async function results(
  participant: IFroggerParticipant,
  response: IFroggerResponse
) {
  try {
    const res = await fetch(`/api/v1/frogger-study/results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant, response }),
    });

    if (!res.ok) {
      throw new Error("Response failed");
    }
    return;
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
      const msg = await res.text()
      throw new Error(`${res.statusText}: ${msg}`);
    }
    return;
  } catch (err) {
    throw err;
  }
}

const FroggerStudyService = {
  create,
  email,
  results,
};

export default FroggerStudyService;

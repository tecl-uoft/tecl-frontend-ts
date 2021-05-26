import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { notify } from "../Notification";
import { IFroggerResponse } from "./FroggerStudy";

interface IFroggerPQFormState {
  [key: string]: boolean | string | undefined;
}

function FroggerPostQuestions(props: {
  nextState: () => void;
  setResponse: Dispatch<SetStateAction<IFroggerResponse>>;
}) {
  const [q2Res, setQ2Res] = useState("");
  const [q10Res, setQ10Res] = useState("");
  const { nextState, setResponse } = props;
  const [formState, setFormState] = useState<IFroggerPQFormState>({
    q1: undefined,
    q2: "",
    q3: undefined,
    q4: undefined,
    q5: undefined,
    q6: undefined,
    q7: undefined,
    q8: undefined,
    q9: undefined,
    q10: "",
  });

  const formStateSetter: any[] = [
    () => setFormState((s) => ({ ...s, q1: false })),
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setFormState((s) => ({ ...s, q2: e.target.value || "x " })),
    () => setFormState((s) => ({ ...s, q3: false })),
    () => setFormState((s) => ({ ...s, q4: false })),
    () => setFormState((s) => ({ ...s, q5: false })),
    () => setFormState((s) => ({ ...s, q6: false })),
    () => setFormState((s) => ({ ...s, q7: false })),
    () => setFormState((s) => ({ ...s, q8: false })),
    () => setFormState((s) => ({ ...s, q9: false })),
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setFormState((s) => ({ ...s, q10: e.target.value })),
  ];

  const updateQ2Res = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ2Res(e.target.value);
  };
  const updateQ10Res = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQ10Res(e.target.value);
  };
  const formStateSetterYes: any[] = [
    () => setFormState((s) => ({ ...s, q1: true })),
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setFormState((s) => ({ ...s, q2: e.currentTarget.value })),
    () => setFormState((s) => ({ ...s, q3: true })),
    () => setFormState((s) => ({ ...s, q4: true })),
    () => setFormState((s) => ({ ...s, q5: true })),
    () => setFormState((s) => ({ ...s, q6: true })),
    () => setFormState((s) => ({ ...s, q7: true })),
    () => setFormState((s) => ({ ...s, q8: true })),
    () => setFormState((s) => ({ ...s, q9: true })),
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setFormState((s) => ({ ...s, q10: e.currentTarget.value })),
  ];

  const questions = [
    {
      ref: "q1",
      state: formState.q1,
      q: "Did you copy the video you saw?",
      img: "",
    },
    {
      ref: "q2",
      state: formState.q2,
      q: `Why did${
        !formState.q1 ? "n’t" : ""
      } you copy the video? There are no wrong answers! `,
      img: "",
    },
    {
      ref: "q3",
      state: formState.q3,
      q: "Did you find this area?",
      img: "/assets/frogger/q2i.png",
    },
    {
      ref: "q4",
      state: formState.q4,
      q: "When you couldn’t jump up, did you think you were doing something wrong? ",
      img: "",
    },
    {
      ref: "q5",
      state: formState.q5,
      q: "Then you couldn’t jump up, did you think the game was broken?",
      img: "",
    },
    {
      ref: "q6",
      state: formState.q6,
      q: "Is this part of the game?",
      img: "/assets/frogger/q6i.png",
    },
    {
      ref: "q7",
      state: formState.q7,
      q: "Is this part of the game?",
      img: "/assets/frogger/q7i.png",
    },
    {
      ref: "q8",
      state: formState.q8,
      q: "Is this part of the game?",
      img: "/assets/frogger/q8i.png",
    },
    {
      ref: "q9",
      state: formState.q9,
      q: "Is this part of the game?",
      img: "/assets/frogger/q9i.png",
    },
    {
      ref: "q10",
      state: formState.q10,
      q: "How do you know where the trophy is?",
      img: "",
    },
  ];

  const onSubmit = () => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 } = formState;
    if (
      q1 === undefined ||
      (q2Res === "" && q1 === false) ||
      q3 === undefined ||
      (q3 === true && (q4 === undefined || q5 === undefined)) ||
      q6 === undefined ||
      q7 === undefined ||
      q8 === undefined ||
      q9 === undefined ||
      q10Res === ""
    ) {
      notify.error("Please fill out all answers available.");
    } else {
      setResponse((r) => ({
        ...r,
        postQuestions: { ...formState, q2: q2Res, q10: q10Res },
      }));
      nextState();
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 text-lg">
      <h1 className="mt-12 text-2xl font-bold text-center">
        Thank you for playing! <br /> Now, we have some questions about the
        game!
      </h1>
      <div className="container flex flex-col justify-between mx-auto">
        {questions.map((question, idx) => {
          return (
            <div key={idx + question.ref}>
              <div className="my-2 rounded-lg">
                {idx !== 1 &&
                  ((idx !== 3 && idx !== 4) || formState.q3 === true) &&
                  idx < 9 && (
                    <div
                      className={`flex justify-between px-10 py-2 rounded-md `}
                    >
                      <p className="w-3/4">{question.q}</p>

                      <div className="flex justify-end w-1/4 space-x-4">
                        <div>
                          <input
                            checked={question.state === true}
                            onChange={formStateSetterYes[idx]}
                            className="w-6 h-6 mx-2 cursor-pointer"
                            type="radio"
                          />

                          <label className="text-center">Yes</label>
                        </div>
                        <div>
                          <input
                            checked={question.state === false}
                            onChange={formStateSetter[idx]}
                            className="w-6 h-6 mx-2 cursor-pointer "
                            type="radio"
                          />
                          <label>No</label>
                        </div>
                      </div>
                    </div>
                  )}
                {question.img && (
                  <img
                    alt={"question"}
                    className="h-full py-4 mx-auto rounded-lg"
                    src={question.img}
                  />
                )}
              </div>
              {formState.q1 !== undefined && idx === 1 && (
                <div className="p-2 px-10 rounded-md rounded-lg ">
                  <p className="w-3/4 mb-4">{question.q}</p>
                  <textarea
                    rows={4}
                    cols={50}
                    className="w-full p-4 bg-gray-100"
                    placeholder="Write you answer here."
                    value={q2Res}
                    onChange={updateQ2Res}
                  />
                </div>
              )}
              {idx === 9 && (
                <div className="p-2 px-10 rounded-md rounded-lg ">
                  <p className="w-3/4 mb-4">{question.q}</p>
                  <textarea
                    rows={4}
                    cols={50}
                    className="w-full p-4 bg-gray-100"
                    placeholder="Write you answer here."
                    value={q10Res}
                    onChange={updateQ10Res}
                  />
                </div>
              )}
              {(idx !== 1 || formState.q1 !== undefined) &&
                ((idx !== 3 && idx !== 4) || formState.q3 === true) && (
                  <div className="w-full h-1 bg-blue-200 rounded-full" />
                )}
            </div>
          );
        })}
      </div>
      <button
        onClick={onSubmit}
        className="w-3/4 px-8 py-4 mx-auto mt-4 text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
}

export default FroggerPostQuestions;

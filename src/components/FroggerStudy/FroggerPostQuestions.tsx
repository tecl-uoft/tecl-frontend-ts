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
  });

  const formStateSetter: any[] = [
    () => setFormState((s) => ({ ...s, q1: !s.q1 })),
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      setFormState((s) => ({ ...s, q2: e.currentTarget.value })),
    () => setFormState((s) => ({ ...s, q3: !s.q3 })),
    () => setFormState((s) => ({ ...s, q4: !s.q4 })),
    () => setFormState((s) => ({ ...s, q5: !s.q5 })),
    () => setFormState((s) => ({ ...s, q6: !s.q6 })),
    () => setFormState((s) => ({ ...s, q7: !s.q7 })),
    () => setFormState((s) => ({ ...s, q8: !s.q8 })),
    () => setFormState((s) => ({ ...s, q9: !s.q9 })),
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
      q: "Why didn’t you copy the video? There are no wrong answers! ",
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
      q:
        "When you couldn’t jump up, did you think you were doing something wrong? ",
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
  ];

  const onSubmit = () => {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9 } = formState;
    if (
      q1 === undefined ||
      (q2 === "" && q1 === false) ||
      q3 === undefined ||
      q4 === undefined ||
      q5 === undefined ||
      q6 === undefined ||
      q7 === undefined ||
      q8 === undefined ||
      q9 === undefined
    ) {
      notify.error("Please fill out all answers available.");
    } else {
      setResponse((r) => ({ ...r, postQuestions: formState as any }));
      nextState();
    }
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 text-lg">
      <h1 className="mt-20 text-2xl font-bold text-center">
        Thank you for playing! <br /> Now, we have some questions about the
        game!
      </h1>
      <div className="container flex flex-col justify-between mx-auto">
        {questions.map((question, idx) => {
          return (
            <div key={idx + question.ref}>
              {(idx === 3 || idx === 4) && formState.q3 === false && (
                <React.Fragment />
              )}
              <div className="my-2 rounded-lg">
                {idx !== 1 && (
                  <div
                    className={`flex justify-between px-10 py-2 rounded-md `}
                  >
                    <p className="w-3/4">{question.q}</p>

                    <div className="flex justify-end w-1/4 space-x-4">
                      <div>
                        <input
                          checked={question.state === true}
                          onChange={formStateSetter[idx]}
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
              {formState.q1 === false && idx === 1 && (
                <div className="p-2 px-10 rounded-md rounded-lg ">
                  <p className="w-3/4 mb-4">{question.q}</p>
                  <textarea
                    rows={4}
                    cols={50}
                    className="w-full p-4 bg-gray-100"
                    placeholder="Write you answer here."
                    value={formState.q2 as any}
                    onChange={formStateSetter[idx]}
                  />
                </div>
              )}
              <div className="w-full h-1 bg-blue-200 rounded-full" />
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

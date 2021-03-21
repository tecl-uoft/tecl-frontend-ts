import React, { useState } from "react";

interface IPostQuestion {
  q1?: boolean;
  q2?: string;
  q3?: boolean;
  q4?: boolean;
  q5?: boolean;
  q6?: boolean;
  q7?: boolean;
  q8?: boolean;
  q9?: boolean;
  q10?: boolean;
}

function FroggerPostQuestions() {
  const [formState, setFormState] = useState<IPostQuestion>({
    q1: undefined,
    q2: undefined,
    q3: undefined,
    q4: undefined,
    q5: undefined,
    q6: undefined,
    q7: undefined,
    q8: undefined,
    q9: undefined,
    q10: undefined,
  });
  const formStateSetter = [
    () => setFormState((s) => ({ ...s, q1: !s.q1 })),
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormState((s) => ({ ...s, q2: e.currentTarget.value })),
    () => setFormState((s) => ({ ...s, q3: !s.q3 })),
    () => setFormState((s) => ({ ...s, q4: !s.q4 })),
    () => setFormState((s) => ({ ...s, q5: !s.q5 })),
    () => setFormState((s) => ({ ...s, q6: !s.q6 })),
    () => setFormState((s) => ({ ...s, q7: !s.q7 })),
    () => setFormState((s) => ({ ...s, q8: !s.q8 })),
    () => setFormState((s) => ({ ...s, q9: !s.q9 })),
    () => setFormState((s) => ({ ...s, q10: !s.q10 })),
  ];

  const questions = [
    {
      state: formState.q1,
      q: "Did you copy the video you saw?",
      img: "",
    },
    {
      state: formState.q2,
      q: "Why didn’t you copy the video? There are no wrong answers! ",
      img: "",
    },
    {
      state: formState.q3,
      q: "Did you find this area?",
      img: "/assets/frogger/q2i.png",
    },
    {
      state: formState.q4,
      q:
        "When you couldn’t jump up, did you think you were doing something wrong? ",
      img: "",
    },
    {
      state: formState.q5,
      q: "Then you couldn’t jump up, did you think the game was broken?",
      img: "",
    },
    {
      state: formState.q6,
      q: "Is this part of the game?",
      img: "/assets/frogger/q6i.png",
    },
    {
      state: formState.q7,
      q: "Is this part of the game?",
      img: "/assets/frogger/q7i.png",
    },
    {
      state: formState.q8,
      q: "Is this part of the game?",
      img: "/assets/frogger/q8i.png",
    },
    {
      state: formState.q9,
      q: "Is this part of the game?",
      img: "/assets/frogger/q9i.png",
    },
    {
      state: formState.q10,
      q: "Is this part of the game?",
      img: "",
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-4 text-2xl">
      <h1 className="mt-20 text-3xl text-center">
        Thank you for playing! <br /> Now, we have some questions about the
        game!
      </h1>
      <div className="container flex flex-col justify-between mx-auto">
        {questions.map((question, idx) => {
          if ((idx === 3 || idx === 4) && !formState.q3) {
            return <React.Fragment key={idx} />;
          }

          if (formState.q1 === false && typeof question.state === "string") {
            return (
              <div key={idx} className="h-64 p-2 bg-gray-300 rounded-lg -pb-2">
                <input
                  type="text w-full h-full bg-gray-200"
                  value={question.state}
                  onChange={formStateSetter[idx]}
                />
              </div>
            );
          }

          return (
            <div>
            <div
              key={idx}
              className={`flex justify-between px-10 my-2 py-2 rounded-md ${"bg-gray-200"}`}
            >
              <p className="w-3/4">{question.q}</p>
              {idx !== 1 && (
                <div className="flex justify-end w-1/4 space-x-4">
                  <div>
                    <input
                      checked={
                        typeof question.state === "boolean"
                          ? question.state
                          : false
                      }
                      onChange={formStateSetter[idx]}
                      className="w-6 h-6 mx-2 cursor-pointer "
                      type="radio"
                    />
                    <label className="text-center">Yes</label>
                  </div>
                  <div>
                    <input
                      checked={
                        typeof question.state === "boolean"
                          ? !question.state
                          : false
                      }
                      onChange={formStateSetter[idx]}
                      className="w-6 h-6 mx-2 cursor-pointer"
                      type="radio"
                    />
                    <label>No</label>
                  </div>
                </div>
              )}
              </div>
              {question.img && <img alt={"question"} className="h-full" src={question.img} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FroggerPostQuestions;

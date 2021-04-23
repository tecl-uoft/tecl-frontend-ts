import React, { useEffect, useState } from "react";

function FroggerPostQuestions(props: { nextState: () => void }) {
  const { nextState } = props;
  const [formState, setFormState] = useState<(string | boolean | undefined)[]>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  useEffect(() => { console.log(formState)}, [formState]);

  const questions = [
    {
      state: formState[0],
      q: "Did you copy the video you saw?",
      img: "",
    },
    {
      state: formState[1],
      q: "Why didn’t you copy the video? There are no wrong answers! ",
      img: "",
    },
    {
      state: formState[2],
      q: "Did you find this area?",
      img: "/assets/frogger/q2i.png",
    },
    {
      state: formState[3],
      q:
        "When you couldn’t jump up, did you think you were doing something wrong? ",
      img: "",
    },
    {
      state: formState[4],
      q: "Then you couldn’t jump up, did you think the game was broken?",
      img: "",
    },
    {
      state: formState[5],
      q: "Is this part of the game?",
      img: "/assets/frogger/q6i.png",
    },
    {
      state: formState[6],
      q: "Is this part of the game?",
      img: "/assets/frogger/q7i.png",
    },
    {
      state: formState[7],
      q: "Is this part of the game?",
      img: "/assets/frogger/q8i.png",
    },
    {
      state: formState[8],
      q: "Is this part of the game?",
      img: "/assets/frogger/q9i.png",
    },
    {
      state: formState[9],
      q: "Is this part of the game?",
      img: "",
    },
  ];

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 text-lg">
      <h1 className="mt-20 text-2xl font-bold text-center">
        Thank you for playing! <br /> Now, we have some questions about the
        game!
      </h1>
      <div className="container flex flex-col justify-between mx-auto">
        {questions.map((question, idx) => {
          return (
            <div key={idx}>
              {new String(formState[0])}
              {formState[0] === false && (
                <div className="h-64 p-2 bg-gray-300 rounded-lg -pb-2">
                  <input
                    type="text"
                    className="w-full h-full bg-gray-600"
                    value={
                      typeof question.state === "string" ? question.state : ""
                    }
                    onChange={(e) => {
                      setFormState((s) => {
                        s[idx] = e.currentTarget.value;
                        return s;
                      });
                    }}
                  />
                </div>
              )}
              {(idx === 3 || idx === 4) && formState[2] === false && (
                <React.Fragment />
              )}
              <div className="my-2 bg-gray-200 rounded-lg">
                <div className={`flex justify-between px-10 py-2 rounded-md `}>
                  <p className="w-3/4">{question.q}</p>
                  {idx !== 1 && (
                    <div key={idx} className="flex justify-end w-1/4 space-x-4">
                      <div>
                        <input
                          checked={formState[idx] === true}
                          onChange={() => {
                            setFormState((s) => {
                              s[idx] = true;
                              return s;
                            });
                          }}
                          className="w-6 h-6 mx-2 cursor-pointer "
                          type="radio"
                        />
                        <label className="text-center">Yes</label>
                      </div>
                      <div>
                        <input
                          checked={formState[idx] === false}
                          onChange={() => {
                            setFormState((s) => {
                              s[idx] = false;
                              return s;
                            });
                          }}
                          className="w-6 h-6 mx-2 cursor-pointer"
                          type="radio"
                        />
                        <label>No</label>
                      </div>
                    </div>
                  )}
                </div>
                {question.img && (
                  <img
                    alt={"question"}
                    className="h-full mx-auto my-4 rounded-lg"
                    src={question.img}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={nextState}
        className="w-3/4 px-8 py-4 mx-auto mt-4 text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
}

export default FroggerPostQuestions;

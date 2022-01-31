import React, { useEffect, useState } from "react";

interface IParentWarning {
  nextState: () => void;
}

const ParentWarning: React.FC<IParentWarning> = ({ nextState }) => {
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setShowNext(false);
    setTimeout(() => {
      setShowNext(true);
    }, 10 * 1000);
  }, []);
  return (
    <div className="flex justify-center w-full h-screen p-4">
      <h3 className="flex flex-col justify-between w-full text-4xl text-center rounded-lg">
        <div className="underline">Important Notice</div>
        <div>
          {new URLSearchParams(window.location.search).get("p_type") !==
            "adult" && (
            <>
              IMPORTANT: Parents! We want to see what your child does all on
              their own, <br /> so please don’t help them or say anything at
              all, even if your child asks questions. <br /> The moderator will
              intervene if there is a technical error.{" "}
            </>
          )}
        </div>
        {showNext ? (
          <button
            onClick={nextState}
            className="w-1/2 px-8 py-4 mx-auto mb-4 text-lg font-bold tracking-wider uppercase bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 "
          >
            Next
          </button>
        ) : (
          <div className="w-1/2 px-8 py-4 mx-auto mb-4 text-lg font-bold tracking-wider bg-orange-200 rounded-lg shadow-lg hover:bg-orange-400 ">
            Please read the message above. The next button will appear in 10
            seconds.
          </div>
        )}
      </h3>
    </div>
  );
};

export default ParentWarning;

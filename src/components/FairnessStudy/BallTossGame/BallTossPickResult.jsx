import React from "react";
import { useEffect, useState } from "react";

function BallTossPickResult(props) {
  const {
    alienA,
    alienB,
    nextFunc,
    setIngameQuestions,
    ingameQuestions,
  } = props;

  const [pickResults, setPickResults] = useState({})

  useEffect(() => {
      if (ingameQuestions){
        // setPickResults(ingameQuestions[-1].answer)
        console.log(pickResults)
      }
    
  }, [ingameQuestions]);


  return (
    <div>
      <h3 class="text-3xl font-bold text-center text-gray-800 mb-8">
        Explain Pick Choice
      </h3>
      <h3 class="text-2xl font-bold text-center text-gray-800 mb-16">
        Why did you decide to pick <br />
        {/* the {alienA.name + pickResults[0]} times and the{" "}
        {alienB.name + pickResults[1]} times */}
        {/* {rep > 1
          ? "Once again, who will you throw the ball to?"
          : "Who will you throw the ball to?"}
        <br /> (Click One) */}
      </h3>
    </div>
  );
}

export default BallTossPickResult;

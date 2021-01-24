import React from "react";


import Aliens from "./Aliens";

function FairnessStudyFinishedKids() {

  return ( 
    <div className="container flex flex-col mx-auto my-32">
      <p
        id="ball-toss-game-play-text"
        className="text-4xl font-bold text-center text-gray-800 mb-6"
      >
        Congratulations on becoming a Junior Scientist!
      </p>
      <div className="flex justify-around mx-16 my-32 -ml-4">
        <Aliens.A.Front />
        <Aliens.B.Front />
        <Aliens.G.Front />
      </div>
      <div className="flex justify-around mx-16 my-32 -ml-4">
        <Aliens.C.Front />
        <Aliens.D.Front />
        <Aliens.L.Front />
      </div>
      <div className="flex justify-around mx-16 my-32 -ml-4">
        <Aliens.E.Front />
        <Aliens.F.Front />
        <Aliens.N.Front />
      </div>
      <div className="flex justify-around mx-16  my-32 -ml-4">
        <Aliens.H.Front />
        <Aliens.M.Front />
        <Aliens.I.Front />
      </div>
      <div className="flex mb-10"></div>
    </div>
  );}

export default FairnessStudyFinishedKids;
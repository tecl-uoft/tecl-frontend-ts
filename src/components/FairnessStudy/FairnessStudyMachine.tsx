import React, { useState, useContext } from "react";
import BallTossContext from "./BallTossContext";
import SingleFairnessQuestion from "./FairnessStudyQuestions/SingleFairnessQuestion";

interface IFairnessStudyMachineProps {
  setTrialFunc(): void;
  alienA: any;
  alienB: any;
  alienC: any;
  alienUser: any;
}

function FairnessStudyMachine(props: IFairnessStudyMachineProps) {
  const playerTime = useContext(BallTossContext);
  const [showPlayText, setShowPlayText] = useState(false);
  const { setTrialFunc, alienA, alienB, alienC, alienUser } = props;
  const choice = (alienUser.name === alienA.name) ? 0 : 
    (alienUser.name === alienB.name) ? 1 : 2;
  const [pickedAlien, setPickedAlien] = useState("");

  return ( 
    <div className="container flex flex-col mx-auto my-32">
    <> {
    !showPlayText ? (
      <div>
      <div className="mr-0 mb-16 flex justify-around">
          <img id="machine" src="/assets/fairness_img/machine.png" alt="Machine" style={{height: "300px", maxWidth: "100%"}}/>
      </div>
      <div className="flex justify-around">
        <button style={{maxWidth: "50%"}}
          onClick={() => {
            setShowPlayText(true);
          }}
            className={`bg-green-100 hover:bg-green-300 w-full mt-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider`}
          >
            Press the button!
        </button>
        <button style={{maxWidth: "50%"}}
          onClick={() => {
            setTrialFunc();
          }}
            className={`bg-red-100 hover:bg-red-300 w-full mt-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider`}
          >
            Don't press it!
        </button>
      </div>
      </div> )
         : ( 
        <div className="flex justify-around text-gray-800 text-2xl mb-16">
            <AlienDisplay
                Alien={(choice === 0) ? alienB : alienA }
                pickedAlien={pickedAlien}
                setPickedAlien={setPickedAlien}
                setTrialFunc={setTrialFunc}
              />
            <AlienDisplay        
                Alien={(choice === 2) ? alienB : alienC }
                pickedAlien={pickedAlien}
                setPickedAlien={setPickedAlien}
                setTrialFunc={setTrialFunc}
              />
      </div> ) 
      } </>
    </div>
  );
}

function AlienDisplay(props: any) {
  const { Alien, pickedAlien, setPickedAlien, setTrialFunc } = props;

  return (
    <div
      onClick={() => { 
        setPickedAlien(Alien.name);
        fetch("/api/v1/fairness-study/results-kids", {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pickedAlien: pickedAlien,
              }),
            });        
        setTrialFunc();
        
      }}
      className={`mt-0 mx-32 hover:text-orange-500 cursor-pointer`}
    >
      {<Alien.Front />}
      <p className={`z-40 alien-label font-bold`}>{Alien.name} </p>
    </div>
  );
}

export default FairnessStudyMachine;

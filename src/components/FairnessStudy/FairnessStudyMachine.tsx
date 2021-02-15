import React, { useState } from "react";

interface IFairnessStudyMachineProps {
  setTrialFunc(): void;
  alienA: any;
  alienB: any;
  alienC: any;
  alienUser: any;
}

function FairnessStudyMachine(props: IFairnessStudyMachineProps) {
  const [showPlayText, setShowPlayText] = useState(false);
  const { setTrialFunc, alienA, alienB, alienC, alienUser } = props;
  const choice = (alienUser.name === alienA.name) ? 0 : 
    (alienUser.name === alienB.name) ? 1 : 2;
  const [pickedAlien, setPickedAlien] = useState("");
  const [hasPickedAlien, setHasPickedAlien] = useState(false);
  const [throwAgain, setThrowAgain] = useState("");

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
            // setTrialFunc();
            setHasPickedAlien(true);
            setShowPlayText(true);
          }}
            className={`bg-red-100 hover:bg-red-300 w-full mt-6 font-bold rounded-lg py-4 px-8 shadow-lg focus:outline-none uppercase tracking-wider`}
          >
            Don't press it!
        </button>
      </div>
      </div> )
         : !hasPickedAlien ? ( 
        <div className="flex justify-around text-gray-800 text-2xl mb-16">
            <AlienDisplay
                Alien={(choice === 0) ? alienB : alienA }
                pickedAlien={pickedAlien}
                setPickedAlien={setPickedAlien}
                setHasPickedAlien={setHasPickedAlien}
                // setTrialFunc={setTrialFunc}
              />
            <AlienDisplay        
                Alien={(choice === 2) ? alienB : alienC }
                pickedAlien={pickedAlien}
                setPickedAlien={setPickedAlien}
                setHasPickedAlien={setHasPickedAlien}
                // setTrialFunc={setTrialFunc}
              />
      </div> ) :
      (
        <div>
          <div className="text-2xl font-bold text-gray-800 mr-0 mb-16 flex justify-around">
          <p>
            Now it's your turn to throw the ball one more time!
          </p>
          </div>
        <div className="flex justify-around text-gray-800 text-2xl mb-16">
        <AlienDisplay2
            Alien={ alienA }
            throwAgain={throwAgain}
            setThrowAgain={setThrowAgain}
            setTrialFunc={setTrialFunc}
          />
        <AlienDisplay2       
            Alien={ alienB }
            throwAgain={throwAgain}
            setThrowAgain={setThrowAgain}
            setTrialFunc={setTrialFunc}
          />
  </div>
  </div>
      )
      } </>
    </div>
  );
}

function AlienDisplay(props: any) {
  const { Alien, setPickedAlien, setHasPickedAlien } = props;

  return (
    <div
      onClick={() => { 
        setPickedAlien(Alien.name);
        setHasPickedAlien(true);
        
      }}
      className={`mt-0 mx-32 hover:text-orange-500 cursor-pointer`}
    >
      {<Alien.Front />}
      <p className={`z-40 alien-label font-bold`}>{Alien.name} </p>
    </div>
  );
}

function AlienDisplay2(props: any) {
  const { Alien, throwAgain, setThrowAgain, setTrialFunc, pickedAlien } = props;

  return (
    <div
      onClick={() => { 
        setThrowAgain(Alien.name);
        fetch("/api/v1/fairness-study/results-kids", {
          method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              throwAgain: throwAgain,
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

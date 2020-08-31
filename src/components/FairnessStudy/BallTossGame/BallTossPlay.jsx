import React, { useState, useLayoutEffect, useRef } from "react";
import "./uniqueAliens.css"
// import "./alienBall.css";

function BallTossPlay(props) {
  const {
    leftAlien,
    middleAlien,
    rightAlien,
    trialNum,
    gameNum,
    leftAlienFirstName,
    middleAlienFirstName,
    rightAlienFirstName,
    throwEvent,
  } = props;

  const [showPlayText, setShowPlayText] = useState(false);
  const alienBallRef = useRef(null);
  const alienRightRef = useRef(null);
  const alienLeftRef = useRef(null);
  const alienMiddleRef = useRef(null);

  useLayoutEffect(() => {
    const alienBall = alienBallRef.current;
    const alienRight = alienRightRef.current.firstChild;
    const alienLeft = alienLeftRef.current.firstChild;
    const alienMiddle = alienMiddleRef.current
      ? alienMiddleRef.current.firstChild
      : alienLeft;

    const alienLeftArm = alienLeft.lastChild;
    const alienLeftArmRect = alienLeftArm.getBoundingClientRect();
    const alienRightArm = alienRight.lastChild;
    const alienRightArmRect = alienRightArm.getBoundingClientRect();
    const alienMiddleArm = alienMiddle.lastChild;
    const alienMiddleArmRect = alienMiddleArm.getBoundingClientRect();

    const alienBallOffsetX = alienBall.offsetWidth / 2;
    const alienBallOffsetY = alienBall.offsetHeight / 2;

    // position the ball in the left alien's hand at the start of the animation
    const ballLeftStart =
      alienLeftArmRect.left + alienLeftArmRect.width - alienBallOffsetX;
    alienBall.style.left = ballLeftStart + "px";

    const ballTopStart =
      alienLeftArmRect.top + alienLeftArmRect.height / 2 - alienBallOffsetY;
    alienBall.style.top = ballTopStart + "px";

    // position the ball in the right alien's hand at the end of the animation
    const ballLeftEnd = alienRightArmRect.left - alienBallOffsetX;
    const ballTopEnd =
      alienRightArmRect.top + alienRightArmRect.height / 2 - alienBallOffsetY;
    const ballTranslateX = ballLeftEnd - ballLeftStart;
    const ballTranslateY = ballTopEnd - ballTopStart;

    // check which animation to run
    let totalAnimationDuration = 0; // total time for an animation
    const animationOptions = {
      delay: 500,
      duration: 3000,
      endDelay: 200,
      iterations: 1,
      fill: "forwards",
      direction: "alternate",
    };

    function animateArm(obj, isLeft, delay) {
      const options = {
        delay: delay,
        iterations: 2,
        fill: "forwards",
        direction: "alternate",
        duration: 800,
      };

      obj.animate(
        [
          { transform: isLeft ? "rotate(0deg)" : "rotate(20deg)" },
          { transform: "rotate(-20deg)" },
        ],
        options
      );
    }

    function animateX(obj, duration, delay, iter, start, stop) {
      const options = {
        delay: delay,
        iterations: iter,
        fill: "forwards",
        direction: "alternate",
        duration: duration,
      };
      obj.animate(
        [
          { transform: "translateX(" + start + "px)" },
          { transform: "translateX(" + stop + "px)" },
        ],
        options
      );
    }
    function animateY(obj, duration, delay, iter, start, middle, stop, isBall) {
      const options = {
        delay: delay,
        iterations: iter,
        fill: "forwards",
        direction: "alternate",
        duration: duration,
      };
      // if this is the animaiton for a ball, add 'curve' like timing
      if (isBall) {
        options.easing = "cubic-bezier(.4,.85,.6,.15)";
      }
      obj.animate(
        [
          { transform: "translateY(" + start + "px)" },
          { transform: "translateY(" + middle + "px)" },
          { transform: "translateY(" + stop + "px)" },
        ],
        options
      );
    }

    function turnMiddleAlien(delay, iter) {
      const turnDuration = 3000;
      const alienMiddleEyes = alienMiddle.querySelectorAll(".eyes");
      const alienMiddleRightLeg = alienMiddle.querySelector(".right-leg");
      const alienMiddleLeftLeg = alienMiddle.querySelector(".left-leg");
      let alienMiddleAntennae = null;

      let middleArmTranslate = -80;
      let middleEyeTranslate = -30;
      let middleLeftLegTranslateMidY = 5;
      let middleLeftLegTranslateY = 10;
      let middleLeftLegTranslateX = 0;

      if (alienMiddle.className === "side-alien") {
        middleEyeTranslate = -65;
      } else if (alienMiddle.className === "side-alien-c") {
        middleEyeTranslate = -75;
        middleArmTranslate = -110;
      } else if (alienMiddle.className === "side-alien-d") {
        middleArmTranslate = -110;
      } else if (alienMiddle.className === "side-alien-e") {
        middleLeftLegTranslateMidY = 0;
        middleLeftLegTranslateY = 0;
        middleLeftLegTranslateX = 60;
        middleEyeTranslate = -100;
        alienMiddleAntennae = alienMiddle.querySelectorAll(".antennae");
      } else if (alienMiddle.className === "side-alien-f") {
        middleArmTranslate = -170;
        middleEyeTranslate = -20;
      }

      animateX(
        alienMiddleArm,
        turnDuration,
        delay,
        iter,
        0,
        middleArmTranslate + 5
      );
      alienMiddleArm.previousElementSibling.animate(
        [
          { transform: "translateX(" + 0 + "px)  rotate(20deg)" },
          {
            transform: `translateX(${middleArmTranslate}px) rotate(-20deg) translateY(20px)`,
          },
        ],
        {
          delay: delay,
          iterations: iter,
          fill: "forwards",
          direction: "alternate",
          duration: turnDuration,
        }
      );

      animateY(
        alienMiddleRightLeg,
        turnDuration,
        delay,
        iter,
        0,
        -5,
        -10,
        false
      );
      animateY(
        alienMiddleLeftLeg,
        turnDuration,
        delay,
        iter,
        0,
        middleLeftLegTranslateMidY,
        middleLeftLegTranslateY,
        false
      );
      alienMiddleEyes.forEach((eye) => {
        animateX(eye, turnDuration, delay, iter, 0, middleEyeTranslate);
      });

      if (alienMiddleAntennae) {
        animateX(
          alienMiddleLeftLeg,
          turnDuration,
          delay,
          iter,
          0,
          middleLeftLegTranslateX
        );
        alienMiddleAntennae.forEach((antenna, idx) => {
          const animOptions = {
            delay: delay,
            iterations: iter,
            fill: "forwards",
            direction: "alternate",
            duration: turnDuration,
          };
          if (idx === 0) {
            antenna.animate(
              [
                { transform: "rotate(30deg)" },
                {
                  transform: `rotate(-20deg) translateX(-5px)`,
                },
              ],
              animOptions
            );
          } else if (idx === 1) {
            antenna.animate(
              [
                { transform: "rotate(20deg)" },
                {
                  transform: `rotate(-30deg) translateX(-5px)`,
                },
              ],
              animOptions
            );
          }
        });
      }
    }

    switch (throwEvent) {
      case "selfPlay": {
        totalAnimationDuration += 500; // start delay
        totalAnimationDuration += 3000; // main animation time

        turnMiddleAlien(500, 1);

        // animate the x direction in the ball (moving the outer div of the ball)
        alienBall.animate(
          [
            { transform: "translateX(" + 0 + "px)" },
            { transform: "translateX(" + ballTranslateX + "px)" },
          ],
          animationOptions
        );
        // animate in y direction and add timing (easing) such that the ball moves in the form a curve
        alienBall.firstChild.animate(
          [
            { transform: "translateY(" + 0 + "px)" },
            { transform: `translateY(-150px)` },
            { transform: "translateY(" + ballTranslateY + "px)" },
          ],
          (() => {
            animationOptions.easing = "cubic-bezier(.4,.85,.6,.15)";
            return animationOptions;
          })() // adds timing function to options
        );
        // arm movement for fist animation type
        const handAnimationOptionsLeft = {
          delay: 500,
          iterations: 2,
          fill: "forwards",
          direction: "alternate",
          duration: 500,
        };
        alienLeftArm.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(-20deg)" }],
          handAnimationOptionsLeft
        );
        alienLeftArm.previousElementSibling.animate(
          [{ transform: "rotate(20deg)" }, { transform: "rotate(-20deg)" }],
          handAnimationOptionsLeft
        );

        totalAnimationDuration += 3000 * 4; // main animation for self throw time
        alienBall.firstChild.animate(
          [
            { transform: "translateY(" + ballTranslateY + "px)" },
            { transform: `translateY(-150px)` },
            { transform: "translateY(" + ballTranslateY + "px)" },
          ],
          (() => {
            animationOptions.delay =
              animationOptions.duration * animationOptions.iterations +
              animationOptions.delay;
            animationOptions.iterations = 4;
            animationOptions.easing = "cubic-bezier(.4,.85,.6,.15)";
            return animationOptions;
          })() // adds timing and iterations to options
        );
        const handAnimationOptionsRight = {
          delay: 3500,
          iterations: 8,
          fill: "forwards",
          direction: "alternate",
          duration: 1500,
        };
        alienRightArm.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsRight
        );
        alienRightArm.previousElementSibling.animate(
          [
            { transform: "rotate(20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsRight
        );

        break;
      }
      case "betweenPlay": {
        turnMiddleAlien(500, 5);

        totalAnimationDuration += 500;
        totalAnimationDuration += 3000 * 5;
        // animate the x direction in the ball (moving the outer div of the ball)
        alienBall.animate(
          [
            { transform: "translateX(" + 0 + "px)" },
            { transform: "translateX(" + ballTranslateX + "px)" },
          ],
          (() => {
            animationOptions.iterations = 5;
            return animationOptions;
          })() // adds 5 iterations to options
        );
        // animate in y direction and add timing (easing) such that the ball moves in the form a curve
        alienBall.firstChild.animate(
          [
            { transform: "translateY(" + 0 + "px)" },
            { transform: `translateY(-150px)` },
            { transform: "translateY(" + ballTranslateY + "px)" },
          ],
          (() => {
            animationOptions.iterations = 5;
            animationOptions.easing = "cubic-bezier(.4,.85,.6,.15)";
            return animationOptions;
          })() // adds timing function and iterations to options
        );
        // arm movement for fist animation type
        const handAnimationOptionsLeft = {
          delay: 500,
          iterations: 5,
          fill: "forwards",
          direction: "alternate",
          duration: 3000,
        };

        alienLeftArm.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsLeft
        );
        alienLeftArm.previousElementSibling.animate(
          [
            { transform: "rotate(20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsLeft
        );

        const handAnimationOptionsRight = {
          delay: 3500,
          iterations: 4,
          fill: "forwards",
          direction: "alternate",
          duration: 3000,
        };

        alienRightArm.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsRight
        );
        alienRightArm.previousElementSibling.animate(
          [
            { transform: "rotate(20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsRight
        );
        break;
      }
      case "otherPlay": {
        const step1dDelay = 500;
        totalAnimationDuration += step1dDelay; // start delay
        totalAnimationDuration += 3000 * 5; // main animation time

        const middleAlienArmYTip =
          alienMiddleArmRect.top - alienLeftArmRect.top;

        const middleAlienArmXTip =
          alienMiddleArmRect.left -
          alienLeftArmRect.left -
          alienLeftArmRect.width;

        //0. set ball in middle aliens hand
        animateX(
          alienBall,
          step1dDelay,
          0,
          1,
          middleAlienArmXTip,
          middleAlienArmXTip
        );
        animateY(
          alienBall.firstChild,
          step1dDelay,
          0,
          1,
          middleAlienArmYTip,
          middleAlienArmYTip,
          middleAlienArmYTip,
          true
        );

        //1. throw to left alien
        animateX(alienBall, 3000, step1dDelay, 1, middleAlienArmXTip, 0);
        animateY(
          alienBall.firstChild,
          3000,
          step1dDelay,
          1,
          middleAlienArmYTip,
          -350,
          0,
          true
        );
        animateArm(alienMiddleArm, true, step1dDelay);
        animateArm(alienMiddleArm.previousElementSibling, false, step1dDelay);

        // 2. toss back and forth
        const step2Delay = step1dDelay + 3000;

        animateX(alienBall, 3000, step2Delay, 4, 0, ballTranslateX);
        animateY(
          alienBall.firstChild,
          3000,
          step2Delay,
          4,
          0,
          -150,
          ballTranslateY,
          true
        );

        // turn alien
        turnMiddleAlien(step2Delay, 4);

        // arm movement for fist animation type
        const handAnimationOptionsLeft = {
          delay: step2Delay,
          iterations: 4,
          fill: "forwards",
          direction: "alternate",
          duration: 3000,
        };

        alienLeftArm.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsLeft
        );
        alienLeftArm.previousElementSibling.animate(
          [
            { transform: "rotate(20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsLeft
        );

        const handAnimationOptionsRight = {
          delay: 6500,
          iterations: 4,
          fill: "forwards",
          direction: "alternate",
          duration: 3000,
        };

        alienRightArm.animate(
          [
            { transform: "rotate(0deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsRight
        );
        alienRightArm.previousElementSibling.animate(
          [
            { transform: "rotate(20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
            { transform: "rotate(-20deg)" },
          ],
          handAnimationOptionsRight
        );
        break;
      }
      case "allPlay": {
        const alternateBallTranslateX = ballTranslateX + alienLeftArmRect.width;
        const alternateBallStart = -1 * alienLeftArmRect.width;

        //1. pass ball from left to right
        const step1Delay = 500;
        if (gameNum === "2") {
          animateX(alienBall, 0, 0, 1, alternateBallStart, alternateBallStart);
        }

        animateX(
          alienBall,
          3000,
          step1Delay,
          1,
          gameNum === "2" ? alternateBallStart : 0,
          gameNum === "2" ? alternateBallTranslateX : ballTranslateX
        );
        animateY(
          alienBall.firstChild,
          3000,
          500,
          1,
          0,
          -150,
          ballTranslateY,
          true
        );
        animateArm(alienLeftArm, true, step1Delay);
        animateArm(alienLeftArm.previousElementSibling, false, step1Delay);

        //2. pass ball from right to middle
        const step2Delay = 3000 + step1Delay;
        let middleAlienArmXTip =
          alienMiddleArmRect.left -
          alienLeftArmRect.left -
          alienLeftArmRect.width +
          alienMiddleArmRect.width;
        if (gameNum === "2") {
          middleAlienArmXTip -= alienMiddleArmRect.width;
        }

        const middleAlienArmYTip =
          alienMiddleArmRect.top - alienLeftArmRect.top;
        animateX(
          alienBall,
          3000,
          step2Delay,
          1,
          gameNum === "2" ? alternateBallTranslateX : ballTranslateX,
          middleAlienArmXTip
        );
        animateY(
          alienBall.firstChild,
          3000,
          step2Delay,
          1,
          ballTranslateY,
          -300,
          middleAlienArmYTip,
          true
        );
        animateArm(alienRightArm, true, step2Delay);
        animateArm(alienRightArm.previousElementSibling, false, step2Delay);

        //2.5. rotate alien body to other side
        animateX(alienMiddleArm, 1500, 6500, 1, 0, 110);
        alienMiddleArm.previousElementSibling.animate(
          [
            { transform: "translateX(" + 0 + "px)  rotate(-20deg)" },
            { transform: `translateX(100px) rotate(20deg) translateY(-20px)` },
          ],
          {
            delay: 6500,
            iterations: 1,
            fill: "forwards",
            direction: "alternate",
            duration: 1500,
          }
        );
        const alienMiddleEye = document.getElementById(
          "side-alien-l-eye-right"
        );
        const alienMiddleRightLeg = document.getElementById(
          "side-alien-l-right-leg"
        );
        const alienMiddleLeftLeg = document.getElementById(
          "side-alien-l-left-leg"
        );
        animateX(alienMiddleEye, 1500, 6500, 1, 0, 100);
        animateY(alienMiddleRightLeg, 1500, 6500, 1, 0, -5, -10, false);
        animateY(alienMiddleLeftLeg, 1500, 6500, 1, 0, 5, 10, false);

        //2.5. turn ball with alien
        animateX(
          alienBall,
          1500,
          6500,
          1,
          middleAlienArmXTip,
          gameNum === "2"
            ? middleAlienArmXTip + alienMiddleArmRect.width + 110
            : middleAlienArmXTip - alienMiddleArmRect.width - 110
        );

        //3. pass to right alien
        const step3Delay = step2Delay + 1500 + 3000;
        animateX(
          alienBall,
          3000,
          step3Delay,
          1,
          gameNum === "2"
            ? middleAlienArmXTip + alienMiddleArmRect + 110
            : middleAlienArmXTip - alienMiddleArmRect.width - 110,
          gameNum === "2" ? alternateBallStart : 0
        );
        animateY(
          alienBall.firstChild,
          3000,
          step3Delay,
          1,
          middleAlienArmYTip,
          -300,
          0,
          true
        );

        // 4. pass from left to right
        const step4Delay = step3Delay + 3000;
        animateX(
          alienBall,
          3000,
          step4Delay,
          1,
          gameNum === "2" ? alternateBallStart : 0,
          gameNum === "2" ? alternateBallTranslateX : ballTranslateX
        );
        animateY(
          alienBall.firstChild,
          3000,
          step4Delay,
          1,
          0,
          -150,
          ballTranslateY,
          true
        );
        animateArm(alienLeftArm, true, step4Delay);
        animateArm(alienLeftArm.previousElementSibling, false, step4Delay);

        // 4.5 rotate middle alien
        animateX(alienMiddleArm, 3000, step4Delay, 1, 110, 0);
        alienMiddleArm.previousElementSibling.animate(
          [
            { transform: `translateX(100px) rotate(20deg) translateY(-20px)` },
            { transform: "translateX(" + 0 + "px) rotate(-20deg)" },
          ],
          {
            delay: step4Delay,
            iterations: 1,
            fill: "forwards",
            direction: "alternate",
            duration: 3000,
          }
        );
        animateX(alienMiddleEye, 3000, step4Delay, 1, 100, 0);
        animateY(alienMiddleRightLeg, 3000, step4Delay, 1, -10, -5, 0, false);
        animateY(alienMiddleLeftLeg, 3000, step4Delay, 1, 10, 5, 0, false);

        // 5. right to middle
        const step5Delay = step4Delay + 3000;
        animateX(
          alienBall,
          3000,
          step5Delay,
          1,
          gameNum === "2" ? alternateBallTranslateX : ballTranslateX,
          middleAlienArmXTip
        );
        animateY(
          alienBall.firstChild,
          3000,
          step5Delay,
          1,
          ballTranslateY,
          -300,
          middleAlienArmYTip,
          true
        );
        animateArm(alienRightArm, true, step5Delay);
        animateArm(alienRightArm.previousElementSibling, false, step5Delay);
        totalAnimationDuration += step5Delay + 3000;
        break;
      }

      default:
        break;
    }
    totalAnimationDuration += 500;
    window.setTimeout(
      () => {
        setShowPlayText(true);
        window.scrollTo(0, document.body.scrollHeight);
      },
      process.env.NODE_ENV === "development"
        ? totalAnimationDuration
        : totalAnimationDuration
    );
    // }, 1);
  }, [trialNum, gameNum, throwEvent]);

  return (
    <div>
      <div class="flex justify-between text-gray-800 text-2xl mt-64">
        <div
          id={leftAlienFirstName}
          ref={
            gameNum === "2" && throwEvent === "allPlay"
              ? alienRightRef
              : alienLeftRef
          }
          class="ml-16"
        >
          {<leftAlien.Side />}
          <p class="alien-label font-bold flex">
            {" "}
            {leftAlienFirstName + " " + leftAlien.name}{" "}
          </p>
        </div>
        <div class="-mt-64 md:ml-20">
          {/* throwEvent === "otherPlay" || throwEvent === "allPlay" ?  */}
          <div
            id={middleAlienFirstName}
            ref={alienMiddleRef}
            style={{
              transform: `scaleX(${
                gameNum === "2" && throwEvent === "allPlay" ? "1" : "-1"
              })`,
            }}
          >
            {<middleAlien.Side />}
          </div>

          <p class="alien-label font-bold flex">
            {" "}
            {middleAlienFirstName + " " + middleAlien.name}{" "}
          </p>
        </div>
        <div class="mr-16">
          <div
            id={rightAlienFirstName}
            ref={
              gameNum === "2" && throwEvent === "allPlay"
                ? alienLeftRef
                : alienRightRef
            }
            style={{ transform: `scaleX(-1)` }}
          >
            {<rightAlien.Side />}
          </div>
          <p class="alien-label font-bold flex">
            {" "}
            {rightAlienFirstName + " " + rightAlien.name}{" "}
          </p>
        </div>
        <div ref={alienBallRef} class="alien-ball">
          <div class="main-alien-ball" />
        </div>
      </div>
      {showPlayText ? (
        <div class="mt-16">
          {gameNum === "1" || gameNum === "2" ? (
            <p
              id="ball-toss-game-play-text"
              class="text-4xl font-bold text-center text-gray-800 mb-6"
            >
              Let's watch them play one more time!
            </p>
          ) : (
            <p
              id="ball-toss-game-play-text"
              class="text-4xl font-bold text-center text-gray-800 mb-6"
            >
              Let's find out what kind of alien you would be!
            </p>
          )}
          <div class="flex justify-around mb-16">
            <button
              onClick={() => {
                setShowPlayText(false);
                props.nextFunc();
              }}
              class="bg-orange-100 hover:text-orange-500 w-full font-bold rounded-lg py-4 px-8 shadow-lg uppercase tracking-wider"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BallTossPlay;

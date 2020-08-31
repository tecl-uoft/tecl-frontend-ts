import React from "react";
import "./frontAlienI.css";

function FrontAlienI() {
  return (
    <div className="front-alien-i">
      <div id="front-alien-i-head"></div>
      <div id="front-alien-i-body-1">
        <div id="front-alien-i-right-arm"></div>
        <div id="front-alien-i-left-arm"></div>
        <div className="front-alien-i-pants" />
      </div>
      <div id="front-alien-i-mouth"></div>
      <div className="front-alien-i-eye" id="front-alien-i-eye-right">
        <div className="front-alien-i-ret-line">
          <div className="front-alien-i-ret" />
        </div>
      </div>
      <div className="front-alien-i-eye" id="front-alien-i-eye-left">
        <div className="front-alien-i-ret-line">
          <div className="front-alien-i-ret" />
        </div>
      </div>
      <div id="front-alien-i-right-leg"></div>
      <div id="front-alien-i-left-leg"></div>
    </div>
  );
}

export default FrontAlienI;

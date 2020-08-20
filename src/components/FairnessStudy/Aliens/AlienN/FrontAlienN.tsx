import React from "react";
import "./frontAlienN.css";

function FrontAlienN() {
  return (
    <div className="front-alien-n">
      <div id="front-alien-n-head"></div>
      <div id="front-alien-n-body-1">
        <div id="front-alien-n-right-arm"></div>
        <div id="front-alien-n-left-arm"></div>
      </div>
      <div id="front-alien-n-body"></div>
      <div id="front-alien-n-mouth"></div>
      <div className="front-alien-n-eye" id="front-alien-n-eye-right">
        <div className="front-alien-n-ret-line">
          <div className="front-alien-n-ret" />
        </div>
      </div>
      <div className="front-alien-n-eye" id="front-alien-n-eye-left">
        <div className="front-alien-n-ret-line">
          <div className="front-alien-n-ret" />
        </div>
      </div>
      <div id="front-alien-n-right-leg"></div>
      <div id="front-alien-n-left-leg"></div>
    </div>
  );
}

export default FrontAlienN;

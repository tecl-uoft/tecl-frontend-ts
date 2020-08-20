import React from "react";
import "./frontAlienD.css";

function FrontAlienD() {
  return (
    <div className="front-alien-d">
      <div className="front-alien-d-eye-line" />
      <div className="front-alien-d-eye">
        <div className="front-alien-d-ret-line">
          <div className="front-alien-d-ret">
            <div className="front-alien-d-ret-inner"></div>
          </div>
        </div>
      </div>
      <div id="front-alien-d-body">
        <div id="front-alien-d-mouth"></div>
      </div>
      <div id="front-alien-d-right-leg"></div>
      <div id="front-alien-d-left-leg"></div>
      <div id="front-alien-d-right-arm"></div>
      <div id="front-alien-d-left-arm"></div>
    </div>
  );
}

export default FrontAlienD;

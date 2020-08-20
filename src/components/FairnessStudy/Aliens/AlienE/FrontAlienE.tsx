import React from "react";
import "./frontAlienE.css";

function FrontAlienE() {
  return (
    <div className="front-alien-e">
      <div className="front-alien-e-head-line" />
      <div className="front-alien-e-head-line" id="front-alien-e-head-line-left" />
      <div id="front-alien-e-body">
        <div className="front-alien-e-eye" id="front-alien-e-left-eye">
          <div className="front-alien-e-ret-line">
            <div className="front-alien-e-ret" />
          </div>
        </div>
        <div className="front-alien-e-eye" id="front-alien-e-right-eye">
          <div className="front-alien-e-ret-line">
            <div className="front-alien-e-ret" />
          </div>
        </div>
        <div id="front-alien-e-mouth"></div>
      </div>
      <div id="front-alien-e-shell"></div>
      <div id="front-alien-e-right-arm"></div>
      <div id="front-alien-e-left-arm"></div>
    </div>
  );
}

export default FrontAlienE;

import React from "react";
import "./frontAlienB.css"

function FrontAlienB() {
  return (
    <div className="front-alien-b">
      <div className="front-alien-b-eye-line" id="front-alien-b-left-eye-line" />
      <div className="front-alien-b-eye" id="front-alien-b-left-eye">
        <div className="front-alien-b-ret-line">
          <div className="front-alien-b-ret" />
        </div>
      </div>
      <div className="front-alien-b-eye-line" id="front-alien-b-right-eye-line" />
      <div className="front-alien-b-eye" id="front-alien-b-right-eye">
        <div className="front-alien-b-ret-line">
          <div className="front-alien-b-ret" />
        </div>
      </div>
      <div id="front-alien-b-body">
        <div id="front-alien-b-mouth"></div>
      </div>
      <div id="front-alien-b-right-arm"></div>
      <div id="front-alien-b-left-arm"></div>
      <div id="front-alien-b-right-leg"></div>
      <div id="front-alien-b-left-leg"></div>
    </div>
  );
}

export default FrontAlienB;

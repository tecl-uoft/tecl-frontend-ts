import React from "react";
import "./frontAlienG.css";

function FrontAlienG() {
  return (
    <div className="front-alien-g">
      <div id="front-alien-g-body">
        <div className="front-alien-g-eye" id="front-alien-g-top-eye">
          <div className="front-alien-g-ret-line">
            <div className="front-alien-g-ret" />
          </div>
        </div>
        <div className="front-alien-g-eye" id="front-alien-g-left-eye">
          <div className="front-alien-g-ret-line">
            <div className="front-alien-g-ret" />
          </div>
        </div>
        <div className="front-alien-g-eye" id="front-alien-g-right-eye">
          <div className="front-alien-g-ret-line">
            <div className="front-alien-g-ret" />
          </div>
        </div>
        <div id="front-alien-g-mouth"></div>
        <div id="front-alien-g-right-arm"></div>
        <div id="front-alien-g-left-arm"></div>
      </div>
    </div>
  );
}

export default FrontAlienG;

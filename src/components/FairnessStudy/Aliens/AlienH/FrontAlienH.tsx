import React from "react";
import "./frontAlienH.css";

function FrontAlienH() {
  return (
    <div className="front-alien-h">
      <div id="front-alien-h-body-left"></div>
      <div id="front-alien-h-body-right"></div>
      <div id="front-alien-h-body-bot"></div>
      <div className="front-alien-h-eye" id="front-alien-h-top-eye">
        <div className="front-alien-h-ret-line">
          <div className="front-alien-h-ret" />
        </div>
      </div>
      <div className="front-alien-h-eye" id="front-alien-h-left-eye">
        <div className="front-alien-h-ret-line">
          <div className="front-alien-h-ret" />
        </div>
      </div>
      <div className="front-alien-h-eye" id="front-alien-h-right-eye">
        <div className="front-alien-h-ret-line">
          <div className="front-alien-h-ret" />
        </div>
      </div>
      <div id="front-alien-h-mouth"></div>
      <div id="front-alien-h-right-arm"></div>
      <div id="front-alien-h-left-arm"></div>
      <div id="front-alien-h-right-leg"></div>
      <div id="front-alien-h-left-leg"></div>
    </div>
  );
}

export default FrontAlienH;

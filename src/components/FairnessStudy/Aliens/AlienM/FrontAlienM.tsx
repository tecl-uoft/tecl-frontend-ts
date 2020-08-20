import React from "react";
import "./frontAlienM.css";

function FrontAlienM() {
  return (
    <div className="front-alien-m">
      <div id="front-alien-m-body">
        <div className="front-alien-m-eye" id="front-alien-m-eye-right">
          <div className="front-alien-m-ret-line">
            <div className="front-alien-m-ret" />
          </div>
        </div>
        <div className="front-alien-m-eye" id="front-alien-m-eye-left">
          <div className="front-alien-m-ret-line">
            <div className="front-alien-m-ret" />
          </div>
        </div>
        <div id="front-alien-m-mouth"></div>
        <div id="front-alien-m-right-arm"></div>
        <div id="front-alien-m-left-arm"></div>
      </div>
      <div id="front-alien-m-right-leg"></div>
      <div id="front-alien-m-left-leg"></div>
    </div>
  );
}

export default FrontAlienM;

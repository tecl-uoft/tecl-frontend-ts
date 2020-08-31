import React from "react";
import "./sideAlienC.css";

function SideAlienC() {
  return (
    <div className="side-alien-c">
      <div id="side-alien-c-body">
        <div id="side-alien-c-eye" className="eyes">
          <div id="side-alien-c-ret-line">
            <div id="side-alien-c-ret" />
          </div>
        </div>
      </div>
      <div id="side-alien-c-body-bottom">
        <div id="side-alien-c-mouth"></div>
        <div className="side-alien-c-pants" />
      </div>
      <div id="side-alien-c-right-leg" className="right-leg"></div>
      <div id="side-alien-c-left-leg" className="left-leg"></div>
      <div id="side-alien-c-right-arm"></div>
      <div id="side-alien-c-left-arm"></div>
    </div>
  );
}

export default SideAlienC;

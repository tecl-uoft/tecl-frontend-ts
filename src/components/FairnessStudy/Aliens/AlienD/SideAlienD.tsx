import React from "react";
import "./sideAlienD.css";

function SideAlienD() {
  return (
    <div className="side-alien-d">
      <div className="side-alien-d-eye-line" />
      <div className="side-alien-d-eye">
        <div className="side-alien-d-ret-line eyes">
          <div className="side-alien-d-ret">
              <div className="side-alien-d-ret-inner"></div>
          </div>
        </div>
      </div>
      <div id="side-alien-d-body">
        <div id="side-alien-d-mouth"></div>
      </div>
      <div id="side-alien-d-right-leg" className="right-leg"></div>
      <div id="side-alien-d-left-leg" className="left-leg"></div>
      <div id="side-alien-d-right-arm"></div>
      <div id="side-alien-d-left-arm"></div>
    </div>
  );
}

export default SideAlienD;

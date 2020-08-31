import React from "react";
import "./sideAlienL.css";

function SideAlienL() {
  return (
    <div className="side-alien-l">
      <div id="side-alien-l-body">
        <div className="side-alien-l-eye eyes" id="side-alien-l-eye-right">
          <div className="side-alien-l-ret-line">
            <div className="side-alien-l-ret" />
          </div>
        </div>
        <div className="side-alien-l-pants" />
      </div>
      <div id="side-alien-l-mouth"></div>
      <div id="side-alien-l-right-leg" className="right-leg"></div>
      <div id="side-alien-l-left-leg" className="left-leg"></div>
      <div id="side-alien-l-right-arm"></div>
      <div id="side-alien-l-left-arm"></div>
    </div>
  );
}

export default SideAlienL;

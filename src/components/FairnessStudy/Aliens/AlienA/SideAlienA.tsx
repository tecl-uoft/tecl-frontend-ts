import React from "react";
import "./sideAlienA.css";

function SideAlien() {
  return (
    <div className="side-alien">
      <div id="side-alien-body">
        <div id="side-alien-eye" className="eyes">
          <div id="side-alien-ret-line" className="">
            <div id="side-alien-ret" />
          </div>
        </div>
        <div id="side-alien-mouth"></div>
      </div>
      <div id="side-alien-right-leg" className="right-leg"></div>
      <div id="side-alien-left-leg" className="left-leg"></div>
      <div id="side-alien-right-arm"></div>
      <div id="side-alien-left-arm"></div>
    </div>
  );
}

export default SideAlien;

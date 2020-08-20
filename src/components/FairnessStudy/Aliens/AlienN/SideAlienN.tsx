import React from "react";
import "./sideAlienN.css";

function SideAlienN() {
  return (
    <div className="side-alien-n">
      <div id="side-alien-n-head"></div>
      <div id="side-alien-n-body-1"></div>
      <div id="side-alien-n-body"></div>
      <div id="side-alien-n-mouth"></div>
      <div className="side-alien-n-eye" id="side-alien-n-eye-right">
        <div className="side-alien-n-ret-line">
          <div className="side-alien-n-ret" />
        </div>
      </div>
      {/* <div className="side-alien-n-eye" id="side-alien-n-eye-left">
        <div className="side-alien-n-ret-line">
          <div className="side-alien-n-ret" />
        </div>
      </div> */}
      <div id="side-alien-n-right-arm"></div>
      <div id="side-alien-n-left-arm"></div>
    </div>
  );
}

export default SideAlienN;

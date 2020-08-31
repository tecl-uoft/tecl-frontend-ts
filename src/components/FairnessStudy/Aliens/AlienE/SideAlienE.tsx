import React from "react";
import "./sideAlienE.css";

function SideAlienE() {
  return (
    <div className="side-alien-e">
      <div className="side-alien-e-head-line antennae" />
      <div
        className="side-alien-e-head-line antennae"
        id="side-alien-e-head-line-left"
      />
      <div id="side-alien-e-body">
        <div id="side-alien-e-eye-left" className="side-alien-e-eye eyes">
          <div id="side-alien-e-ret-line-left" className="side-alien-e-ret-line pupil">
            <div id="side-alien-e-ret" />
          </div>
        </div>
        <div id="side-alien-e-eye-right" className="side-alien-e-eye eyes">
          <div id="side-alien-e-ret-line-right" className="side-alien-e-ret-line pupil">
            <div id="side-alien-e-ret" />
          </div>
        </div>
        <div id="side-alien-e-mouth"></div>
        <div className="side-alien-e-pants" />
      </div>
      <div className=" right-leg"></div>
      <div id="side-alien-e-shell" className="left-leg"></div>
      <div id="side-alien-e-right-arm"></div>
      <div id="side-alien-e-left-arm"></div>
    </div>
  );
}

export default SideAlienE;

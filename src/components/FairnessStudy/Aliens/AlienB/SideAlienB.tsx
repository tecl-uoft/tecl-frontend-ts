import React from "react";
import "./sideAlienB.css";

function SideAlienB() {
  return (
    <div className="side-alien-b">
      <div className="side-alien-b-eye-line" id="side-alien-b-left-eye-line" />
      <div className="side-alien-b-eye" id="side-alien-b-left-eye">
        <div className="side-alien-b-ret-line eyes">
          <div className="side-alien-b-ret" />
        </div>
      </div>
      <div
        className="side-alien-b-eye-line "
        id="side-alien-b-right-eye-line"
      />
      <div className="side-alien-b-eye" id="side-alien-b-right-eye">
        <div className="side-alien-b-ret-line eyes">
          <div className="side-alien-b-ret" />
        </div>
      </div>
      <div className="body" id="side-alien-b-body">
        <div id="side-alien-b-mouth"></div>
        <div className="side-alien-b-pants" />
      </div>
      <div className="right-leg" id="side-alien-b-right-leg"></div>
      <div className="left-leg" id="side-alien-b-left-leg"></div>
      <div id="side-alien-b-right-arm"></div>
      <div id="side-alien-b-left-arm"></div>
    </div>
  );
}

export default SideAlienB;

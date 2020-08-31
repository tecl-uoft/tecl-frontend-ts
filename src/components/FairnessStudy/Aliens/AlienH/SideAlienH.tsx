import React from "react";
import "./sideAlienH.css";

function SideAlienH() {
  return (
    <div className="side-alien-h">
      <div id="side-alien-h-body-left"></div>
      <div id="side-alien-h-body-right">
        <div className="side-alien-h-eye" id="side-alien-h-top-eye">
          <div className="side-alien-h-ret-line">
            <div className="side-alien-h-ret" />
          </div>
        </div>
        <div className="side-alien-h-eye" id="side-alien-h-left-eye">
          <div className="side-alien-h-ret-line">
            <div className="side-alien-h-ret" />
          </div>
        </div>
        <div className="side-alien-h-eye" id="side-alien-h-right-eye">
          <div className="side-alien-h-ret-line">
            <div className="side-alien-h-ret" />
          </div>
        </div>
      </div>
      <div id="side-alien-h-body-bot">
        <div className="side-alien-h-pants" />
      </div>

      <div id="side-alien-h-mouth"></div>
      <div id="side-alien-h-right-leg"></div>
      <div id="side-alien-h-left-leg"></div>
      <div id="side-alien-h-right-arm"></div>
      <div id="side-alien-h-left-arm"></div>
    </div>
  );
}

export default SideAlienH;

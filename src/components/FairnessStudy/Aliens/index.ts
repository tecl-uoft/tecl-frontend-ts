import SideAlienA from "./AlienA/SideAlienA";
import SideAlienB from "./AlienB/SideAlienB";
import SideAlienC from "./AlienC/SideAlienC";
import SideAlienD from "./AlienD/SideAlienD";
import SideAlienE from "./AlienE/SideAlienE";
import SideAlienF from "./AlienF/SideAlienF";

import FrontAlienA from "./AlienA/FrontAlienA";
import FrontAlienB from "./AlienB/FrontAlienB";
import FrontAlienC from "./AlienC/FrontAlienC";
import FrontAlienD from "./AlienD/FrontAlienD";
import FrontAlienE from "./AlienE/FrontAlienE";
import FrontAlienF from "./AlienF/FrontAlienF";
import FrontAlienG from "./AlienG/FrontAlienG";
import FrontAlienH from "./AlienH/FrontAlienH";
import SideAlienH from "./AlienH/SideAlienH";
import SideAlienL from "./AlienL/SideAlienL"

import FrontAlienI from "./AlienI/FrontAlienI";
import FrontAlienL from "./AlienL/FrontAlienL";
import FrontAlienM from "./AlienM/FrontAlienM";
import FrontAlienN from "./AlienN/FrontAlienN";
import SideAlienN from "./AlienN/SideAlienN";

const Aliens = {
  A: { Front: FrontAlienA, Side: SideAlienA, name: "Flurp" },
  B: { Front: FrontAlienB, Side: SideAlienB, name: "Zazz" },
  C: { Front: FrontAlienC, Side: SideAlienC, name: "Bem" },
  D: { Front: FrontAlienD, Side: SideAlienD, name: "Tig" },
  E: { Front: FrontAlienE, Side: SideAlienE, name: "Wump" },
  F: { Front: FrontAlienF, Side: SideAlienF, name: "Gack" },
  G: { Front: FrontAlienG, name: "Dax" },
  H: { Front: FrontAlienH, Side: SideAlienH, name: "Woggle" },
  I: { Front: FrontAlienI, name: "Spux" },
  L: { Front: FrontAlienL, Side: SideAlienL, name: "Cangle" },
  M: { Front: FrontAlienM, name: "Fep" },
  N: { Front: FrontAlienN, Side: SideAlienN, name: "Chesky" },
};

export default Aliens;

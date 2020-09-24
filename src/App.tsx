import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import Header from "./components/Header";

/* Route Pages */
import Home from "./pages/Home";
import ErrorNotFound from "./pages/ErrorNotFound";
import Loading from "./pages/Loading";
import TeamsStudyEntry from "./pages/TeamsStudyEntry";
import FroggerStudyEntry from "./pages/FroggerStudyEntry";
import EyeTrackingEntry from "./pages/EyeTrackingEntry";
import { Scheduling } from "./pages/Scheduling";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

const TeamsStudyGame = lazy(() => import("./pages/TeamsStudyGame"));
const EyeTrackingGame = lazy(() => import("./pages/EyeTrackingGame"));
const FroggerStudyGame = lazy(() => import("./pages/FroggerStudyGame"));
/* End Route Pages */

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/scheduling" component={Scheduling} />
            <Route
              exact
              path="/study/fairness/information"
              component={TeamsStudyEntry}
            />
            <Route
              exact
              path="/study/fairness/game"
              component={TeamsStudyGame}
            />
            <Route
              exact
              path="/study/frogger/information"
              component={FroggerStudyEntry}
            />
            <Route
              exact
              path="/study/frogger/game"
              component={FroggerStudyGame}
            />
            <Route
              exact
              path="/study/eyetracking/information"
              component={EyeTrackingEntry}
            />
            <Route
              exact
              path="/study/eyetracking/game"
              component={EyeTrackingGame}
            />

            <Route path="/404" component={ErrorNotFound} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;

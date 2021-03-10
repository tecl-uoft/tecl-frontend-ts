import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import Header from "./components/Header";
import { Notification } from "./components/Notification";

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
import { AuthProvider } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { StudyProvider } from "./context/StudyContext";
import { EventCancelation } from "./pages/EventCancelation";
import { TouchStudy } from "./pages/TouchStudy";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Toaster } from "react-hot-toast";
import { ParticipationSelection } from "./pages/ParticipationSelection";
import { ParticipationSignup } from "./pages/ParticipationSignup";

const TeamsStudyGame = lazy(() => import("./pages/TeamsStudyGame"));
const EyeTrackingGame = lazy(() => import("./pages/EyeTrackingGame"));
const FroggerStudyGame = lazy(() => import("./pages/FroggerStudyGame"));
/* End Route Pages */

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <StudyProvider>
          <Toaster />
          <Notification />
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route
                  exact
                  path="/participation/selection"
                  component={ParticipationSelection}
                />
                <Route
                  exact
                  path="/participation/signup"
                  component={ParticipationSignup}
                />
                <Route
                  exact
                  path="/scheduling/cancel-event"
                  component={EventCancelation}
                />
                <Route exact path="/scheduling" component={Scheduling} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route
                  exact
                  path="/study/fairness/information"
                  component={TeamsStudyEntry}
                />
                <Route exact path="/study/touch/game" component={TouchStudy} />
                <Route
                  exact
                  path="/study/fairness/game"
                  component={TeamsStudyGame}
                />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
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
        </StudyProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import Header from "./components/Header";

/* Route Pages */
import Home from "./pages/Home";
import ErrorNotFound from "./pages/ErrorNotFound";
import Loading from "./pages/Loading";
import TeamsStudyEntry from "./pages/TeamsStudyEntry";

/* End Route Pages */

function App() {
  return (
    <div className="App">
      <Suspense fallback={Loading}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/study/fairness/information"
              component={TeamsStudyEntry}
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

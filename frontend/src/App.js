import React from "react";
import "./App.scss";
import "./modal.scss";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import ReportCenter from "./components/reportCenter";
import PageNotFound from "./components/pageNotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/expenses" component={Dashboard} />;
        <Route path="/expense-report" component={ReportCenter} />
        <Route path="/notfound" component={PageNotFound} />
        <Redirect from="/" to="/expenses" exact />
        <Redirect to="/notfound" />
      </Switch>
    </Router>
  );
}

export default App;

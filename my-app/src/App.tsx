import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import Header from "./components/header";
import SWAPIProvider from "./Providers/swAPIProvider";
export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div>
      <div className="background-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <Header />
        <Switch>
          <Route exact path="/home">
            <SWAPIProvider>
              <Home />
            </SWAPIProvider>
          </Route>
          <Route>
            <Redirect to="/home" />;
          </Route>
        </Switch>
      </div>
    </div>
  );
}

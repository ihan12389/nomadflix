/* 라우팅 기능 제어부 */
import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import Header from "../Components/Header";
import Detail from "../Routes/Detail";
import TV from "../Routes/TV";

//Router의 Switch 기능을 통해 url을 받아 component를 반환
// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/movie/:id" component={Detail} />
      <Route path="/show/:id" component={Detail} />
      <Route path="/tv" component={TV} />
    </Switch>
  </Router>
);

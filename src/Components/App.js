/* 어플리케이션 */
import React, { Component } from "react";
import Router from "./Router";
import GlobalStyles from "./GlobalStyles";

//Router에 출력을 맡김
class App extends Component {
  render() {
    return (
      <div>
        <Router />
        <GlobalStyles />
      </div>
    );
  }
}

export default App;

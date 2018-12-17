import React, { Component } from "react";
import Searchcomp from "./components/search";
import Graph from './components/graph'


class App extends Component {
  render() {
    return (
      <div>
        <Searchcomp />
        <Graph />
      </div>
    );
  }
}

export default App;

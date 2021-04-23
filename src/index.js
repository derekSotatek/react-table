import React from "react";
import ReactDOM from "react-dom";
import SmartTable from "./smart-table";

function App() {
  return (
    <div className="App">
      <SmartTable />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

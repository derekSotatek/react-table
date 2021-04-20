import React from "react";
import ReactDOM from "react-dom";

// import "./styles.scss";
import MyTable from "./TableParent/MyTable";

function App() {
  return (
    <div className="App">
      <MyTable />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

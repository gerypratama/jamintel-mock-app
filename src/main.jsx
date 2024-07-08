import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Neo4jProvider, createDriver } from "use-neo4j";
import { BrowserRouter } from "react-router-dom";

const driver = createDriver(
  "neo4j",
  "192.168.18.16",
  7687,
  "neo4j",
  "Ddi12345!"
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Neo4jProvider driver={driver} database="jamintel2">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Neo4jProvider>
);

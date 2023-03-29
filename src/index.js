import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { SpeechProvider } from "@speechly/react-client";
import { Provider } from "./context/context.js";
import "./index.css";

ReactDOM.render(
  <SpeechProvider appId="250a8f74-8ab5-4b4c-b6a2-6dc73c759c36" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);

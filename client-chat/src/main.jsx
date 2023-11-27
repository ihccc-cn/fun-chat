import React from "react";
import ReactDOM from "react-dom/client";
import ChatApp from "./chat";
import "./index.css";

const server = "ws://localhost:3016";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="chat-app-container">
      <ChatApp server={server} />
    </div>
  </React.StrictMode>
);

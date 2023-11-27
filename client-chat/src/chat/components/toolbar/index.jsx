import React from "react";
import "./index.css";

function Toolbar({ logo, title, children }) {
  return (
    <div className="toolbar">
      <div>{logo}</div>
      <div className="toolbar-center">{title}</div>
      <div>{children}</div>
    </div>
  );
}

export default Toolbar;

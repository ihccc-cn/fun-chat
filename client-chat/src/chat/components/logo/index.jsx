import React from "react";
import clsx from "clsx";
import "./index.css";

function Logo({ message, floatCenter, src }) {
  return (
    <div className={clsx("logo", floatCenter && "floatCenter")}>
      <img src={src} alt="logo" />
      <div className="logo-msg">
        <span>Hello {!message ? "!" : ","}</span>
        <span className="logo-msg-text">{message}</span>
      </div>
    </div>
  );
}

export default Logo;

import React from "react";
import clsx from "clsx";

function SystemMessage({ data }) {
  return <div className={clsx("message", "system")}>{data.msg}</div>;
}

export default SystemMessage;

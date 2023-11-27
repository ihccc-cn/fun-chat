import React from "react";
import clsx from "clsx";

function DismissMessage({ data }) {
  return (
    <div className={clsx("message", "system")}>
      房主（{data.user.username}）已解散房间
    </div>
  );
}

export default DismissMessage;

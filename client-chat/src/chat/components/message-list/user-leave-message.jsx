import React from "react";
import clsx from "clsx";

function UserLeaveMessage({ data }) {
  return (
    <div className={clsx("message", "system")}>
      （{data.user.username}）已离开房间
    </div>
  );
}

export default UserLeaveMessage;

import React from "react";
import clsx from "clsx";

function UserJoinMessage({ self, data }) {
  return (
    <div className={clsx("message", "system")}>
      （{self ? "您" : data.user.username}）已加入房间
    </div>
  );
}

export default UserJoinMessage;

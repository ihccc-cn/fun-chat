import React from "react";
import clsx from "clsx";

function JabMessage({ isSelf, data }) {
  const message = React.useMemo(() => {
    let message = null;
    if (isSelf(data.source.id) && isSelf(data.target.id)) {
      message = `👉 我戳了戳自己 ~`;
    }
    if (!isSelf(data.source.id) && isSelf(data.target.id)) {
      message = `👉 ${data.source.username} 戳了戳我 ~`;
    }
    if (isSelf(data.source.id) && !isSelf(data.target.id)) {
      message = `👉 我戳了戳 ${data.target.username} ~`;
    }
    if (!isSelf(data.source.id) && !isSelf(data.target.id)) {
      message = `👉 ${data.source.username} 戳了戳 ${data.target.username} ~`;
    }
    if (
      !isSelf(data.source.id) &&
      !isSelf(data.target.id) &&
      data.source.id === data.target.id
    ) {
      message = `👉 ${data.source.username} 戳了戳自己 ~`;
    }
    return message;
  }, [data]);

  return <div className={clsx("message", "system")}>{message}</div>;
}

export default JabMessage;

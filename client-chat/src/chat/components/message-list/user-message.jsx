import React from "react";
import clsx from "clsx";
import useReady from "../../hooks/useReady";

const splitName = (name) => {
  return name[0] || "";
};

const colors = [
  "#9575CD",
  "#E57373",
  "#F06292",
  "#26A69A",
  "#64B5F6",
  "#81C784",
  "#d4c750",
  "#eaba2c",
  "#8D6E63",
  "#6f96a9",
  "linear-gradient(45deg, #673AB7, #4FC3F7)",
  "linear-gradient(315deg, #F44336, #FFEB3B)",
];

function UserMessage({ self, data, onAvatarDbClick }) {
  const ready = useReady();
  return (
    <div
      className={clsx(
        "message",
        !ready ? "chat-hidden" : "chat",
        self && "self"
      )}
    >
      <div
        className="avatar"
        onDoubleClick={onAvatarDbClick}
        style={{
          background: colors[data.user.index % colors.length],
        }}
      >
        {splitName(data.user?.username)}
      </div>
      <div className="message-container">
        <div className="message-info">
          <span>{data.user?.username}</span>
          <span className="time">{data.sendTime}</span>
        </div>
        <div
          className="message-content"
          dangerouslySetInnerHTML={{ __html: data.message }}
        ></div>
      </div>
    </div>
  );
}

export default UserMessage;

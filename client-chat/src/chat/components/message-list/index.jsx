import React from "react";
import clsx from "clsx";
import UserMessage from "./user-message";
import SystemMessage from "./system-message";
import DismissMessage from "./dismiss-message";
import UserJoinMessage from "./user-join-message";
import UserLeaveMessage from "./user-leave-message";
import JabMessage from "./jab-message";
import "./index.css";

function MessageList({ slogan, isSelf, list = [], onAvatarDbClick }) {
  const containerRef = React.useRef(null);
  const [overflow, setOverflow] = React.useState(false);

  const goChatBottom = () => {
    const overflow =
      containerRef.current?.scrollHeight > containerRef.current?.offsetHeight;
    if (overflow) {
      containerRef.current?.scrollTo({
        top: containerRef.current?.scrollHeight,
        behavior: "smooth",
      });
    }
    setOverflow(overflow);
  };

  React.useEffect(() => {
    goChatBottom();
  }, [list]);

  return (
    <div
      ref={containerRef}
      className={clsx("chat-container scroll-list", overflow && "full-list")}
    >
      {slogan}
      {list.map((item) => {
        const self = isSelf?.(item.user.id);
        if (item.type === "chat") {
          return (
            <UserMessage
              self={self}
              data={item}
              onAvatarDbClick={() => onAvatarDbClick?.(item.user)}
              key={item.id}
            />
          );
        }
        if (item.type === "dismiss") {
          return <DismissMessage data={item} key={item.id} />;
        }
        if (item.type === "userJoin") {
          return <UserJoinMessage self={self} data={item} key={item.id} />;
        }
        if (item.type === "userLeave") {
          return <UserLeaveMessage data={item} key={item.id} />;
        }
        if (item.type === "jab") {
          return <JabMessage isSelf={isSelf} data={item} key={item.id} />;
        }
        return <SystemMessage data={item} key={item.id} />;
      })}
    </div>
  );
}

export default MessageList;

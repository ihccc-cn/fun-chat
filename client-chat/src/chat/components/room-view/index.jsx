import React from "react";
import RoomForm from "./room-form";
import RoomAsk from "./room-ask";
import RoomList from "./room-list";
import "./index.css";

const title = {
  ask: "申请加入",
  add: "创建房间",
  list: "房间列表",
};

function RoomView({ icon, list, isSelf, onAdd, onJoin }) {
  const [mode, setMode] = React.useState("list");
  const [room, setRoom] = React.useState(null);

  const showList = () => setMode("list");

  const handleJoin = (item) => {
    if (item.ask === "0" || isSelf?.(item.creator.id)) {
      onJoin(item);
    } else {
      setMode("ask");
      setRoom(item);
    }
  };

  return (
    <div className="room-container">
      <h3 className="room-title">{title[mode]}</h3>
      {mode === "ask" && <RoomAsk room={room} onCancel={showList} />}
      {mode === "add" && (
        <RoomForm
          onSubmit={(values) => onAdd(values, showList)}
          onCancel={showList}
        />
      )}
      {mode === "list" && (
        <RoomList
          icon={icon}
          list={list}
          isSelf={isSelf}
          onAdd={() => setMode("add")}
          onItem={handleJoin}
        />
      )}
    </div>
  );
}

export default RoomView;

import React from "react";
import Popup from "../../popup";
import "./index.css";

function RoomList({ icon, list, isSelf, onAdd, onItem }) {
  return (
    <div className="room-list">
      <div className="room-item add-room" onClick={onAdd}>
        {icon.iconPlus}
      </div>
      {list.map((item) => (
        <div className="room-item" onClick={() => onItem?.(item)} key={item.id}>
          <div className="room-name">
            {icon.iconHouse}
            <span className="room-name-text">{item.name}</span>
          </div>
          <div className="room-info">
            <div className="room-creator">{item.creator?.username}</div>
            <div className="room-num">
              {icon.iconUsers}
              <span>{item.users.length} 人</span>
            </div>
          </div>
          {item.ask && !isSelf?.(item.creator.id) && (
            <Popup
              className="room-lock"
              content="进入需申请"
              contentStyle={{ padding: "4px 12px" }}
              trigger="onMouseOver"
            >
              {icon.iconLock}
            </Popup>
          )}
        </div>
      ))}
    </div>
  );
}

export default RoomList;

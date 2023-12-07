import React from "react";
import List from "../list";
import "./index.css";

function EmojiImageList({ column, data, onItem }) {
  return (
    <List
      grid
      column={column || 4}
      style={{ height: 240, overflow: "hidden auto" }}
    >
      {data.map((item) => (
        <List.Item onClick={() => onItem(item)} key={item.key}>
          <img
            className="emoji-image"
            src={item.src}
            title={item.name}
            alt={item.name}
          />
        </List.Item>
      ))}
    </List>
  );
}

export default EmojiImageList;

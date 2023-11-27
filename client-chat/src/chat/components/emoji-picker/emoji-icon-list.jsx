import React from "react";
import List from "../list";
import "./index.css";

function EmojiIconList({ column, data, onItem }) {
  return (
    <List grid column={column || 10} style={{ height: 240 }}>
      {(data.glyphs || []).map((item) => {
        const font_class = data.css_prefix_text + item.font_class;
        return (
          <List.Item
            onClick={() => onItem({ ...item, font_class })}
            title={item.name}
            key={item.icon_id}
          >
            <svg className="emoji-icon" aria-hidden="true">
              <use xlinkHref={`#${font_class}`}></use>
            </svg>
          </List.Item>
        );
      })}
    </List>
  );
}

export default EmojiIconList;

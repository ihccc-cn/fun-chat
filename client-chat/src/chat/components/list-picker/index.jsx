import React from "react";
import Popup from "../popup";
import List from "../list";
import "./index.css";

function CommonList({ data, onItem }) {
  return (
    <List column={1} style={{ width: 360, height: 240 }}>
      {data.map((item) => {
        const styleAttr = !item.style ? "" : `style="${item.style}"`;
        return (
          <List.Item
            dangerouslySetInnerHTML={{
              __html: `<span ${styleAttr}>${item.text}</span>`,
            }}
            onClick={() => onItem(item)}
            key={item.key}
          />
        );
      })}
    </List>
  );
}

function PhrasePicker({ title, list, children, onChange, style }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popup
      title={title}
      open={open}
      onOpenChange={setOpen}
      placement="top-left"
      content={<CommonList data={list} onItem={onChange} />}
      style={style}
    >
      {children}
    </Popup>
  );
}

export default PhrasePicker;

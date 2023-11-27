import React from "react";
import Popup from "../popup";
import Tabs from "../tabs";
import EmojiImageList from "./emoji-image-list";
import EmojiIconList from "./emoji-icon-list";
import loadEmoticon from "./load-emoticon";
import { forEachPromised } from "./for-each";
import "./index.css";

function EmojiPicker({ title, tabs, children, onChange, style }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [emojiTabs, setEmojiTabs] = React.useState([]);

  const loadTabs = React.useCallback(async () => {
    const tabsData = await forEachPromised(
      tabs,
      async ({
        label,
        labelSrc,
        list,
        url,
        config,
        style,
        column,
        ...item
      }) => {
        const curentLabel = !!labelSrc ? (
          <img className="tab-label" src={labelSrc} alt="previewIcon" />
        ) : (
          <div className="tab-label">{label}</div>
        );
        if (!!list) {
          const children = (
            <EmojiImageList
              data={list}
              onItem={(item) => onChange(item, style)}
            />
          );
          return { ...item, label: curentLabel, children };
        }
        if (!!config) {
          const emojiData = await loadEmoticon.load(url, config);
          const children = (
            <EmojiIconList
              data={emojiData}
              column={column}
              onItem={(item) => onChange(item, style)}
            />
          );
          return { ...item, label: curentLabel, children };
        }
        return { ...item, label: curentLabel };
      }
    );
    setEmojiTabs(tabsData);
  }, [tabs]);

  React.useEffect(() => {
    loadTabs();
  }, [loadTabs]);

  return (
    <Popup
      title={title}
      open={open}
      onOpenChange={setOpen}
      placement="top-left"
      content={<Tabs active={active} onChange={setActive} tabs={emojiTabs} />}
      style={style}
    >
      {children}
    </Popup>
  );
}

export default EmojiPicker;

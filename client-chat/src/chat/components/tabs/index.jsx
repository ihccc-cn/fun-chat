import React from "react";
import clsx from "clsx";
import "./index.css";

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      <div className="tabs-container">{tabs[active]?.children}</div>
      <div className="tabs-nav">
        {tabs.map((item, index) => (
          <div
            className={clsx(
              "tabs-nav-item",
              index === active ? "tabs-nav-item-active" : ""
            )}
            onClick={() => onChange?.(index, item)}
            key={item.key}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

Tabs.defaultProps = {
  tabs: [],
  active: 0,
};

export default Tabs;

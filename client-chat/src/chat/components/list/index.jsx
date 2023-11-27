import React from "react";
import clsx from "clsx";
import "./index.css";

function List({ grid, column, ...restProps }) {
  return (
    <div
      className={clsx(
        "list scroll-list",
        grid ? "list-grid" : "list-column",
        grid && `list-grid-${column}`
      )}
      {...restProps}
    />
  );
}

function Item({ ...restProps }) {
  return <div className="list-item" {...restProps} />;
}

List.Item = Item;
List.defaultProps = {
  column: 1,
};

export default List;

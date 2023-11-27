import clsx from "clsx";
import "./index.css";

function Icon({ type, status, className, onClick, ...restProps }) {
  return (
    <span
      className={clsx(
        "icon",
        !!onClick && "icon-btn",
        "icon-status-" + status,
        className
      )}
      onClick={onClick}
      {...restProps}
    >
      <svg aria-hidden="true">
        <use xlinkHref={`#${type}`}></use>
      </svg>
    </span>
  );
}

export default Icon;

import React from "react";
import clsx from "clsx";
import "./index.css";

function Popup({
  className,
  placement,
  title,
  content,
  contentStyle,
  open,
  trigger,
  onOpenChange,
  children,
  style,
}) {
  const popupRef = React.useRef();
  const [_open, setOpen] = React.useState(false);

  const openChange = (state) => {
    if (open === void 0) {
      setOpen(state);
    } else {
      onOpenChange(state);
    }
  };

  const handleOpen = () => {
    openChange(true);
  };

  const handleOuterClick = React.useCallback((e) => {
    if (popupRef.current.contains(e.target)) return;
    openChange(false);
  }, []);

  React.useEffect(() => {
    document.addEventListener("click", handleOuterClick);
    return () => {
      document.removeEventListener("click", handleOuterClick);
    };
  }, []);

  return (
    <div
      ref={popupRef}
      className={clsx(
        "popup-container",
        "popup-placement-" + (placement || "top-center"),
        className
      )}
      style={style}
    >
      <div className="popup-body">
        {(open || _open) && (
          <div className="popup-content" style={contentStyle}>
            {content}
          </div>
        )}
      </div>
      {React.cloneElement(children, {
        title,
        [trigger || "onClick"]: handleOpen,
      })}
    </div>
  );
}

export default Popup;

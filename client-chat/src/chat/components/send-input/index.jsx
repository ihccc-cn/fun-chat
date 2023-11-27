import React from "react";
import Textarea from "./textarea";
import "./index.css";

function SendInput({ disabled, buttons, value, onChange, onSend }) {
  const send = () => {
    if (disabled) return;
    onSend();
    onChange("");
  };

  // const handleKeyDown = (e) => {
  //   if (e.ctrlKey && e.key === "Enter") {
  //     e.preventDefault();
  //     console.log("value::", value);
  //     onSend();
  //   }
  // };

  // React.useEffect(() => {
  //   const event = (e) => handleKeyDown(e);
  //   document.body.addEventListener("keydown", event);
  //   return () => {
  //     document.body.removeEventListener("keydown", event);
  //   };
  // }, []);

  return (
    <div className="send-message">
      <div className="tools">
        <div>{buttons}</div>
        <button
          className="button send"
          disabled={disabled || !value}
          onClick={send}
          // title="[Ctrl + Enter：发送]"
        >
          发送
        </button>
      </div>
      <Textarea
        rows={5}
        disabled={disabled}
        value={value || ""}
        onChange={onChange}
      />
      {disabled && <div className="send-message-mask"></div>}
    </div>
  );
}

export default SendInput;

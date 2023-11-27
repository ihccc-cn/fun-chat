import React from "react";
import ContentEditable from "react-contenteditable";
import "./textarea.css";

function EditDiv({ rows, disabled, value, onChange }) {
  // const inputRef = React.useRef();

  return (
    <ContentEditable
      // ref={inputRef}
      className="editable-input-field scroll-list"
      disabled={disabled}
      html={value}
      onChange={onChange}
      style={{ height: `${rows * 22 + 16}px` }}
    />
  );
}

export default EditDiv;

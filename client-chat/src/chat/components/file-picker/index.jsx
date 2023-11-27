import React from "react";
import getBase64 from "./getBase64";

function FilePicker({
  accept,
  title,
  onChange,
  children,
  style,
  ...restProps
}) {
  const inputRef = React.useRef();

  const onInputChange = React.useCallback(
    async (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.size > 1024 * 1024 * 1) {
          alert("图片大小不能超过 1MB !");
          return;
        }
        const base64 = await getBase64(files[0]);
        onChange?.(base64);
      }
    },
    [onChange]
  );

  return (
    <div style={{ display: "inline-block", ...style }}>
      <input
        {...restProps}
        ref={inputRef}
        type="file"
        onClick={(e) => e.stopPropagation()}
        onChange={onInputChange}
        style={{ display: "none" }}
        accept={accept}
        multiple={false}
      />
      {React.cloneElement(children, {
        title,
        onClick: (e) => {
          e.stopPropagation();
          inputRef.current.click();
        },
      })}
    </div>
  );
}

FilePicker.defaultProps = {
  accept: "image/*",
};

export default FilePicker;

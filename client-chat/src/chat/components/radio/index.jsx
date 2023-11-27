import React from "react";
import "./index.css";

function Radio({ name, options, onChange }) {
  return (
    <div className="radio-group">
      {options.map((item) => (
        <div className="radio-item" key={item.value}>
          <input
            id={`${name}-${item.value}`}
            type="radio"
            name={name}
            value={item.value}
            onChange={onChange}
          />
          <label htmlFor={`${name}-${item.value}`}>{item.label}</label>
        </div>
      ))}
    </div>
  );
}

export default Radio;

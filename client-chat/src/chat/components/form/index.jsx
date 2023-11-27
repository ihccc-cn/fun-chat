import React from "react";
import "./index.css";

function Form({ onSubmit, children }) {
  const formRef = React.useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    onSubmit?.(Object.fromEntries(formData));
  };

  return (
    <form ref={formRef} className="form-body" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

function Field({ label, name, desc, children }) {
  return (
    <div className="form-field">
      {label && (
        <label className="form-field-label" htmlFor={name}>
          {label}
        </label>
      )}
      {React.isValidElement(children)
        ? React.cloneElement(children, { name })
        : children}
      {desc && <p className="field-desc">{desc}</p>}
    </div>
  );
}

Form.Item = Field;

export default Form;

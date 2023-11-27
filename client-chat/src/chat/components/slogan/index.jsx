import "./index.css";

function Slogan({ text, ...restProps }) {
  return (
    <div className="slogan" {...restProps}>
      <span className="slogan-title">{text}</span>
    </div>
  );
}

export default Slogan;

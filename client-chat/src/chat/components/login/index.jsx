import "./index.css";

function Login({ value, onChange, onLogin }) {
  return (
    <div className="login-box">
      <input
        className="input-field radius"
        type="input"
        value={value || ""}
        placeholder="请输入用户名："
        onChange={onChange}
        onKeyDown={(e) => {
          e.key === "Enter" && onLogin && onLogin();
        }}
      />
      <button className="button login" disabled={!value} onClick={onLogin}>
        登入 / 注册
      </button>
    </div>
  );
}

export default Login;

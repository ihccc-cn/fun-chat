import React from "react";
import Form from "../../form";
import Radio from "../../radio";

function RoomForm({ onSubmit, onCancel }) {
  const [ask, setAsk] = React.useState("0");

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item label="房间名称" name="name">
        <input className="input-field" placeholder="请输入" />
      </Form.Item>
      <Form.Item label="需要申请才能加入" name="ask">
        <Radio
          defaultValue="0"
          options={[
            { value: "0", label: "不需要" },
            { value: "1", label: "需要" },
          ]}
          onChange={(e) => setAsk(e.target.value)}
        />
      </Form.Item>
      {ask === "1" && (
        <Form.Item
          label="申请时询问"
          name="question"
          desc="对方申请时，需要回答你设置的问题才能申请加入房间。"
        >
          <input className="input-field" placeholder="请输入" />
        </Form.Item>
      )}
      <Form.Item>
        <button className="button" type="submit">
          添加
        </button>
        <button
          className="button link"
          onClick={onCancel}
          style={{ marginTop: 12 }}
        >
          取消
        </button>
      </Form.Item>
    </Form>
  );
}

export default RoomForm;

import React from "react";
import Form from "../../form";

function RoomAsk({ room, onCancel }) {
  return (
    <Form onSubmit={() => {}}>
      {!room?.question ? (
        <div className="room-sub-title">
          当前房间需要申请加入，点击按钮申请。
        </div>
      ) : (
        <Form.Item
          label={room?.question}
          name="answer"
          desc="你申请时，需要回答房主设置的问题才能加入房间。"
        >
          <input className="input-field" placeholder="请输入" />
        </Form.Item>
      )}
      <Form.Item>
        <button className="button" type="submit">
          申请
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

export default RoomAsk;

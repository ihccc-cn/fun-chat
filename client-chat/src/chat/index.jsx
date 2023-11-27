import React from "react";
import Layout from "./layout";
import Logo from "./components/logo";
import Toolbar from "./components/toolbar";
import Login from "./components/login";
import RoomView from "./components/room-view";
import MessageList from "./components/message-list";
import SendInput from "./components/send-input";
import Slogan from "./components/slogan";
import FilePicker from "./components/file-picker";
import EmojiPicker from "./components/emoji-picker";
import ListPicker from "./components/list-picker";
import useSocket from "./hooks/useSocket";
import events from "./events";
import defaultIcon from "./common/icons";
import emojiTabs from "./common/emoji";
import phraseData from "./common/phrase";
import { getStorage, setStorage, removeStorage } from "./utils";
import "./index.css";

import iconMessage from "./static/message.svg";

const StorageNames = {
  username: "chat-username",
  loginData: "chat-login-data",
};

const slogan = "Let's chat ~";

function Chat({ server, icons }) {
  const icon = Object.assign(defaultIcon, icons);
  const [username, setUsername] = React.useState(
    getStorage(StorageNames.username, "")
  );
  /** 登录后获取的 userData */
  const udRef = React.useRef(getStorage(StorageNames.loginData, null));
  const [rooms, setRooms] = React.useState([]);
  const [currentRoom, setCurrentRoom] = React.useState(null);
  const [textMessage, setTextMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [_, update] = React.useState();
  // const [errorMessage, setErrorMessage] = React.useState();

  const addMessage = (msg) => setMessages((msgs) => [...msgs, msg]);

  const setLocalUsername = (username) => {
    setUsername(username);
    setStorage(StorageNames.username, username);
  };

  const setLocalLoginData = (data) => {
    udRef.current = data;
    setStorage(StorageNames.loginData, data);
    update({});
  };

  const data = {
    udRef,
    currentRoom,
    setRooms,
    setCurrentRoom,
    setMessages,
    addMessage,
    setLocalLoginData,
  };

  const { connected, socket } = useSocket(server, {
    userId: udRef.current?.id,
    events,
    data,
  });

  const handleClear = () => {
    setMessages([{ id: "-1", msg: "已清空消息", type: "system" }]);
  };

  const handleUsername = (e) => {
    const name = e.target.value || "";
    setLocalUsername(name.substring(0, 22).replace(/\n/g, ""));
  };

  const handleInput = (e) => {
    setTextMessage(typeof e === "string" ? e : e.target.value);
  };

  const handleLogin = () => {
    socket.emit("login", { username });
  };

  const handleLogout = () => {
    setLocalUsername("");
    setLocalLoginData(null);
    setRooms([]);
    removeStorage([StorageNames.username, StorageNames.loginData]);
    socket.emit("logout", { user: udRef.current });
  };

  const handleJoinRoom = (room) => {
    socket.emit("join", { user: udRef.current, roomId: room.id });
  };

  const handleAddRoom = (roomInfo, callback) => {
    socket.emit("addRoom", { ...roomInfo, user: udRef.current }, callback);
  };

  const handleLeaveRoom = () => {
    socket.emit("leave", { user: udRef.current, roomId: currentRoom.id });
  };

  const handleDismiss = () => {
    socket.emit("dismissRoom", { user: udRef.current, roomId: currentRoom.id });
  };

  const handleJab = (target) => {
    socket.emit("message", {
      type: "jab",
      roomId: currentRoom.id,
      target,
      source: udRef.current,
    });
  };

  const handleSend = () => {
    if (!textMessage) return;
    socket.emit("message", {
      type: "chat",
      roomId: currentRoom.id,
      user: udRef.current,
      message: textMessage,
      sendTime: new Date().toLocaleString(),
    });
  };

  const addTextMessage = (type, data, style) => {
    setTextMessage((text) => {
      let content;
      let styleAttr = !style ? "" : `style="${style}"`;
      if (type === "image") {
        content = `<img class="msg-img" src="${data}" alt="img" />`;
      }
      if (type === "emoji-image") {
        content = `<img class="msg-emoji-img" src="${data}" alt="img" />`;
      }
      if (type === "emoji-icon") {
        content = `<svg class="msg-emoji-icon" aria-hidden="true" ${styleAttr}><use xlink:href="#${data}"></use></svg>`;
      }
      if (type === "text") {
        content = `<span ${styleAttr}>${data}</span>`;
      }
      return (text || "") + content;
    });
  };

  const handleFilePicker = (src) => {
    addTextMessage("image", src);
  };

  const hanleEmojiPicker = (emoji, style) => {
    if (!!emoji.src) {
      addTextMessage("emoji-image", emoji.src, style);
      return;
    }
    if (!!emoji.font_class) {
      addTextMessage("emoji-icon", emoji.font_class, style);
      return;
    }
  };

  const hanlePhrasePicker = (phrase) => {
    addTextMessage("text", phrase.text, phrase.style);
  };

  return (
    <Layout>
      <Toolbar
        logo={
          <Logo
            message={udRef.current?.username || username}
            floatCenter={!udRef.current}
            src={iconMessage}
          />
        }
        title={currentRoom?.name}
      >
        {!connected &&
          React.cloneElement(icon.iconDisconnect, {
            onClick: handleClear,
            title: "服务未连接",
          })}
        {messages.length > 1 &&
          React.cloneElement(icon.iconClear, {
            onClick: handleClear,
            title: "清空",
          })}
        {!!currentRoom &&
          !currentRoom.dismissed &&
          currentRoom.creator.id === udRef.current?.id &&
          React.cloneElement(icon.iconJiesan, {
            onClick: handleDismiss,
            title: "解散",
          })}
        {!!currentRoom &&
          React.cloneElement(icon.iconLeave, {
            onClick: handleLeaveRoom,
            title: "退出",
          })}
        {!!udRef.current &&
          !currentRoom &&
          React.cloneElement(icon.iconZhuxiao, {
            onClick: handleLogout,
            title: "注销",
          })}
      </Toolbar>
      <div style={{ flex: 1, height: "50%" }}>
        {!udRef.current && <Slogan text={slogan} style={{ paddingTop: 180 }} />}
        {!!udRef.current && !currentRoom && (
          <RoomView
            icon={icon}
            list={rooms}
            isSelf={(id) => id === udRef.current?.id}
            onJoin={handleJoinRoom}
            onAdd={handleAddRoom}
          />
        )}
        {!!currentRoom && (
          <MessageList
            slogan={<Slogan text={slogan} />}
            isSelf={(id) => id === udRef.current?.id}
            list={messages}
            onAvatarDbClick={handleJab}
          />
        )}
      </div>
      {!udRef.current && connected && (
        <Login
          value={username}
          onChange={handleUsername}
          onLogin={handleLogin}
        />
      )}
      {!!udRef.current && !!currentRoom && (
        <SendInput
          disabled={currentRoom.dismissed}
          buttons={
            <React.Fragment>
              <FilePicker
                title="添加图片"
                onChange={handleFilePicker}
                style={{ marginRight: 12 }}
              >
                {icon.iconPicture}
              </FilePicker>
              <EmojiPicker
                title="表情"
                tabs={emojiTabs}
                onChange={hanleEmojiPicker}
                style={{ marginRight: 12 }}
              >
                {icon.iconEmoji}
              </EmojiPicker>
              <ListPicker
                title="快捷回复"
                list={phraseData.phrase}
                onChange={hanlePhrasePicker}
                style={{ marginRight: 12 }}
              >
                {icon.iconHuifu}
              </ListPicker>
              <ListPicker
                title="样式模板"
                list={phraseData.styleTemplate}
                onChange={hanlePhrasePicker}
              >
                {icon.iconTextStyle}
              </ListPicker>
            </React.Fragment>
          }
          value={textMessage}
          onChange={handleInput}
          onSend={handleSend}
        />
      )}
    </Layout>
  );
}

export default Chat;

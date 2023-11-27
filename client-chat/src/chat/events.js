const uid = () => new Date().getTime() + "-" + Math.random();

export default {
  /** 用户登录成功 */
  "user-login": ({ setLocalLoginData }, data) => {
    setLocalLoginData(data);
  },

  /** 用户房间变化 */
  "user-rooms": ({ setRooms }, data) => {
    setRooms(data);
  },

  /** 房主解散房间 */
  "user-dismissRoom": ({ setCurrentRoom, addMessage }, data) => {
    setCurrentRoom((room) => ({ ...room, dismissed: true }));
    addMessage({ type: "dismiss", user: data.user, id: uid() });
  },

  /** 用户加入房间 */
  "user-join": ({ udRef, setCurrentRoom, addMessage, setMessages }, data) => {
    const loginData = udRef.current || {};
    if (data.user.id === loginData.id) {
      setCurrentRoom(data.room);
      setMessages(data.messages);
    }
    addMessage({ type: "userJoin", user: data.user, id: uid() });
  },

  /** 自己离开房间 */
  "user-leave-self": ({ setCurrentRoom, setMessages }) => {
    setCurrentRoom(null);
    setMessages([]);
    return;
  },

  /** 用户离开房间 */
  "user-leave": ({ addMessage }, data) => {
    addMessage({ type: "userLeave", user: data.user, id: uid() });
  },

  /** 用户消息 */
  "user-message": ({ addMessage }, data) => {
    addMessage(data);
  },
};

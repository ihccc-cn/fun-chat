const { userStore, roomManager } = require("./store");

const getUserId = (client) => {
  return client.id;
  // return (
  //   client.handshake.auth?.id ||
  //   new Date().getTime() + "." + Math.floor(Math.random() * 10000)
  // );
};

function handleSocket(socket) {
  socket.on("connection", (client) => {
    const userId = getUserId(client);
    console.log("user connected", userId);

    // 如果客户端
    if (userStore.has(userId)) {
      const data = userStore.get(userId);

      console.log("user relogin::", JSON.stringify(data));
      // 登录成功，响应登录成功
      client.emit("user-login", data);
      // 登录成功，返回房间信息
      client.emit("user-rooms", roomManager.getRooms());
    }

    /** 用户断开连接 */
    client.on("disconnect", () => {
      const user = userStore.get(userId);
      console.log("user disconnect:", JSON.stringify(user));
      // userStore.delete(userId);

      const room = roomManager.getRoom(user?.roomId);

      if (!!room) {
        roomManager.removeRoomUser(user.roomId, user);
        socket.emit("user-rooms", roomManager.getRooms());
      }

      socket.emit("user-disconnect", { user });
    });

    /** 用户登录/注册 */
    client.on("login", ({ username }) => {
      const ip = client.handshake.address;
      const user = {
        username,
        id: userId,
        loginTime: new Date().toLocaleString(),
        room: null,
        ip,
        index: Math.floor(Math.random() * 10000),
      };
      console.log("user login:", JSON.stringify(user));
      // if(userStore.has(ip)) {
      //   client.emit("user-system-error", { msg: "你已登录", user: userStore.get(ip) });
      // }
      userStore.set(userId, user);
      // 登录成功，响应登录成功
      client.emit("user-login", user);
      // 登录成功，返回房间信息
      client.emit("user-rooms", roomManager.getRooms());
    });

    /** 用户注销 */
    client.on("logout", () => {
      console.log("user logout:", userId);
      userStore.delete(userId);
    });

    /** 用户申请加入房间 */
    client.on("apply", (data) => {});

    /** 用户加入房间 */
    client.on("join", (data) => {
      console.log("user join:", JSON.stringify(data));

      const room = roomManager.getRoom(data.roomId);

      if (!room) {
        client.emit("system-error", { msg: "房间不存在" });
        return;
      }

      roomManager.addRoomUser(data.roomId, data.user);

      const user = userStore.get(userId);
      userStore.set(userId, { ...user, roomId: data.roomId });

      const messages = roomManager.getRoomMessages(data.roomId);

      client.join(data.roomId);
      socket
        .to(data.roomId)
        .emit("user-join", { user: data.user, room, messages });
      socket.emit("user-rooms", roomManager.getRooms());
    });

    /** 用户离开房间 */
    client.on("leave", (data) => {
      console.log("user leave:", JSON.stringify(data));

      client.leave(data.roomId);
      // 自己离开房间的回调
      client.emit("user-leave-self", { user: data.user });

      const room = roomManager.getRoom(data.roomId);

      if (!room) return;

      roomManager.removeRoomUser(data.roomId, data.user);

      const user = userStore.get(userId);
      userStore.set(userId, { ...user, roomId: null });

      socket.emit("user-rooms", roomManager.getRooms());
      // 向房间内所有人通知，某人已离开房间
      socket.to(data.roomId).emit("user-leave", { user: data.user, room });
    });

    /** 用户新建房间 */
    client.on("addRoom", (data, callback) => {
      console.log("user add room:", JSON.stringify(data));

      roomManager.addRoom(data);

      socket.emit("user-rooms", roomManager.getRooms());
      callback();
    });

    /** 用户解散房间 */
    client.on("dismissRoom", (data) => {
      console.log("user dismiss room:", JSON.stringify(data));

      const room = roomManager.getRoom(data.roomId);

      if (!room) {
        client.emit("system-error", { msg: "房间不存在" });
        return;
      }

      if (room.creator.id === data.user?.id) {
        roomManager.removeRoom(data.roomId);
        socket.emit("user-rooms", roomManager.getRooms());
        socket
          .to(data.roomId)
          .emit("user-dismissRoom", { user: data.user, room });
      }
    });

    /** 用户发消息 */
    client.on("message", (data) => {
      const room = roomManager.getRoom(data.roomId);

      if (!room) {
        client.emit("system-error", { msg: "房间不存在" });
        return;
      }

      // 消息转发给所有客户端，包括自己
      const msg = {
        ...data,
        id: new Date().getTime() + "-" + Math.random(),
        // ip: client.handshake.address.replace("::ffff:", ""),
      };

      roomManager.addRoomMessage(data.roomId, msg);

      console.log("user message:", JSON.stringify(msg));
      socket.to(data.roomId).emit("user-message", msg);
    });
  });
}

module.exports = handleSocket;

const userStore = new Map();

class RoomsManager {
  constructor() {
    this.rooms = {
      default: {
        id: "default",
        name: "默认房间",
        creator: { username: "system", id: "system" },
        users: [],
      },
    };
    this.messages = {};
  }

  /** 获取房间列表 */
  getRooms() {
    return Object.values(this.rooms);
  }

  /** 获取房间信息 */
  getRoom(id) {
    return this.rooms[id];
  }

  /** 创建新房间 */
  addRoom(data) {
    const { user, name, ask, question } = data || {};

    const id = new Date().getTime() + "-" + Math.random();

    this.rooms[id] = {
      id: id,
      name: name || `（${user.username}）创建的房间`,
      ask: ask || false,
      question: question || false,
      creator: user,
      users: [],
    };
  }

  /** 删除房间 */
  removeRoom(id) {
    delete this.rooms[id];
  }

  /** 获取房间用户列表 */
  getRoomUsers(id) {
    return this.rooms[id].users;
  }

  /** 房间新增用户 */
  addRoomUser(id, user) {
    this.rooms[id].users.push(user);
  }

  /** 房间删除用户 */
  removeRoomUser(id, user) {
    this.rooms[id].users = this.rooms[id].users.filter(
      (item) => item.id !== user.id
    );
  }

  /** 获取房间消息列表 */
  getRoomMessages(id) {
    const messages = this.messages[id] || [];
    return messages.slice(messages.length - 100);
  }

  /** 记录房间消息 */
  addRoomMessage(id, message) {
    if (!this.messages[id]) this.messages[id] = [];
    this.messages[id].push(message);
  }
}

module.exports = {
  userStore,
  roomManager: new RoomsManager(),
};

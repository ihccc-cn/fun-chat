const http = require("http");
const Koa = require("koa");
const koaStatic = require("koa-static");
const path = require("path");
const handleSocket = require("./socket");

const io = require("socket.io");

const { PORT = 3000 } = process.env;

const app = new Koa();

// 使用 koa-static 中间件来提供静态资源访问
app.use(koaStatic(path.join(__dirname, "public")));

app.on("server:run", () => {
  console.log(`--------------------------------------`);
  console.log(`🚀 Running on http://127.0.0.1:${PORT}`);
  console.log(`--------------------------------------`);
});

const server = http.createServer(app.callback());
const socket = io(server, { cors: true });

handleSocket(socket);

server.listen(PORT, () => app.emit("server:run"));

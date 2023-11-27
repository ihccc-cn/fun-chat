import React from "react";
import { io } from "socket.io-client";
import useUnmountRef from "./useUnmountRef";

const useSocket = (server, { userId, events, data }) => {
  const unmountRef = useUnmountRef();
  const socketRef = React.useRef();
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    if (unmountRef.current) {
      return () => {
        socketRef.current?.off();
      };
    }
    if (!server || socketRef.current) return;

    const socket = io(server, { auth: { id: userId } });

    socket.on("connect", () => {
      for (const name in events) {
        if (!events[name]) continue;
        socket.on(
          name,
          events[name].bind(null, Object.assign({}, data, { socket }))
        );
      }

      setConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      setConnected(socket.connected);
    });

    socketRef.current = socket;
  }, [server]);

  return { connected, socket: socketRef.current };
};

export default useSocket;

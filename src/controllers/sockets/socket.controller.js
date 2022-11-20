import { Server } from "socket.io";

import {
  generateMessage,
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
  join,
  isDuplicate,
} from "../users/user.controller.js";

export default function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (client) => {
    console.log("new client connection", client.id);

    client.on("join", (data) => {
      const { room, username } = data;
      if (!room) return;

      if (isDuplicate(username)) {
        client.emit("join-error", { message: `username taken` });
      } else {
        join(io, client, data);
      }
    });

    client.on("message", (data) => {
      const user = getUser(client.id);
      // console.log(data);

      if (user?.room) {
        client.broadcast.to(user.room).emit("message-recieve", data);
      }
    });

    client.on("type", (data) => {
      const user = getUser(client.id);
      // console.log(user);
      if (user?.room) {
        client.broadcast.to(user.room).emit("typeing", data);
      }
    });

    client.on("logout", () => {
      console.log("client logout", client.id);

      const user = getUser(client.id);
      console.log("removed", user);

      if (user?.room) {
        const { room } = user;
        io.to(room).emit(
          "message-recieve",
          generateMessage(`${user.username} has left!`)
        );
        io.to(room).emit("roomData", {
          room,
          users: getUsersInRoom(room),
        });
      }

      removeUser(client.id);
    });

    client.on("disconnect", () => {
      console.log("client disconnect", client.id);

      const user = getUser(client.id);
      console.log("removed", user);

      if (user?.room) {
        const { room } = user;
        io.to(room).emit(
          "message-recieve",
          generateMessage(`${user.username} has left!`)
        );
        io.to(room).emit("roomData", {
          room,
          users: getUsersInRoom(room),
        });
      }

      removeUser(client.id);
    });
  });
}

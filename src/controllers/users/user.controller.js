// let onlineUsers = new Set()
let users = [];

export const addUser = (user) => {
  const { username, room } = user;
  if (!username || !room) return;

  users.push({ ...user, room: room.trim() });
  return user;
};

export const removeUser = (id) => {
  users = users.filter((user) => user?.id !== id);
  return users;
};

export const getUsersInRoom = (id, room) => {
  const usersInRoom = users.filter((user) => user?.room == room);
  // return usersInRoom.filter((u) => u.id !== id)
  return usersInRoom;
};
export const generateMessage = (message) => ({
  username: "Admin",
  message,
  time: new Date().toDateString(),
});

export const isDuplicate = (username) =>
  users.filter((user) => user.username === username).length > 0;

export const join = (io, client, data) => {
  const { room, username } = data;
  // console.log(data);
  const user = addUser({ id: client.id, ...data });
  client.join(room);

  client.emit("joined");

  setTimeout(() => {
    client.broadcast
      .to(room)
      .emit("message-recieve", generateMessage(`${user.username} has joined!`));

    io.to(room).emit("roomData", {
      room,
      users: getUsersInRoom(client.id, room),
    });
    io.sockets.to(client.id).emit("userData", { username });
  }, 1000);
};

export const getUser = (id) => users.find((user) => user.id == id);

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
export const generateMessage = (username, message) => ({
  username,
  message,
  time: new Date().toDateString(),
});

export const getUser = (id) => users.find((user) => user.id == id);

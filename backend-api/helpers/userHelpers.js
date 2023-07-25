const users = [];

function newUser(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  return user;
}

function getIndividualRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function exitRoom(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index != -1) {
    return users.splice(index, (1)[0]);
  }
}

function getActiveUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = { newUser, getIndividualRoomUsers, exitRoom, getActiveUser };

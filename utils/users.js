const users = [];

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const user = users[index];
    users.splice(index, 1);
    return user;
  }
}

function getRoomUsers(id) {
  return users.filter(user => user.room === id);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
}

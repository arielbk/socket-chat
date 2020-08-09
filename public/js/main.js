const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// get username and room from url params
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// join chatroom
socket.emit('joinRoom', { username, room });

// get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// message received from server
socket.on('message', message => {
  outputMessage(message);

  // scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get message text
  const msg = e.target.elements.msg.value;

  // emit message to server
  socket.emit('chatMessage', msg);

  // clear input
  e.target.elements.msg.value = '';
});

// output message to dom
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
};

// output room to dom
function outputRoomName(room) {
  const element = document.getElementById('room-name');
  element.innerText = room;
};

// output users to dom
function outputUsers(users) {
  const usersList = document.getElementById('users');
  usersList.innerHTML = users.map(user => `<li>${user.username}</li>`).join('');
};

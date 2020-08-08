const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// message received from server
socket.on('message', message => {
  console.log(message);
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
  div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
};

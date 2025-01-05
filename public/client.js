const socket = io();
let name;
const textarea = document.querySelector('#textarea');
const messageArea = document.querySelector('.message__area');

// Prompt user for a name
if (!name) {
    name = prompt('Please enter your name: ');
}

// Listen for Enter key in the textarea
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

// Function to send a message
function sendMessage(message) {
    const msg = {
        user: name,
        message: message.trim()
    };

    // Append the message to the message area
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send the message to the server
    socket.emit('message', msg);
}

// Function to append a message to the message area
function appendMessage(msg, type) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add(type, 'message');

    const markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Listen for incoming messages from the server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

// Function to scroll to the bottom of the message area
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

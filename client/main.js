var socket = io.connect('http://192.168.1.14:6677', {
    'forceNew': true
});

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> says:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');

    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(event) {
    var data = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', data);

    document.getElementById('text').value = '';

    return false;
}

const session = require("./sessions.js");

let messages = [];
let io = null;

const genRandomColor = () => {
    return Math.floor(Math.random() * 100000000).toString(16).substring(0, 6);
};

function onMessage(message) {
    const send_message = {message: message, color: this.request.session.color, username: this.request.session.username};
    messages = [send_message, ...messages.slice(0, 49)];
    io.emit("message", send_message);
}

function onDisconnect() {
    io.emit("user disconnected", {username: this.request.session.username});
}

const setOnEventListeners = socket => {
    socket.on("message", onMessage);
    socket.on("disconnect", onDisconnect);
};

const getConnectedUsers = async () => {
    const connected = Object.values(io.sockets.connected);
    const users = [];
    for (let socket of connected)
        users.push({username: socket.request.session.username, color: socket.request.session.color});
    return users;
};

module.exports = _io => {
    _io.use((socket, next) => {
        session(socket.request, socket.request.res, () => {
            if (socket.request.session.username === undefined) {
                socket.disconnect();
                return next(Error("unauthorized"));
            } else
                next();
        });
    });
    _io.on("connection", async socket => {
        socket.request.session.color = genRandomColor();
        setOnEventListeners(socket);
        socket.emit("recover messages", messages);
        const sess = socket.request.session;
        delete sess.cookie;
        socket.broadcast.emit("user connected", sess);
        socket.emit("recover users", await getConnectedUsers());
    });
    io = _io;
};
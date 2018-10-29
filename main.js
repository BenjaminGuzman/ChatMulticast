const express = require("express");
const body_parser = require("body-parser");
const http = require("http");
const joinPath = require("path").join;
const socket_io = require("socket.io");

const session = require("./sessions.js");
const configChat = require("./chat.js");

const PORT = process.env.PORT;

const app = express();

app.get("/", (req, res) => res.sendFile("index.html", {root: joinPath(__dirname, "public/html")}));

app.use(/^\/css/, express.static("public/css"));
app.use(/^\/js/, express.static("public/js"));
app.use(/^\/img/, express.static("public/img"));
app.use(/^\/fonts/, express.static("public/fonts"));
app.use(/^\/emoji-data\/img\-apple\-64/, express.static("node_modules/emoji-datasource-apple/img/apple/64"));

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.post("/join", session, (req, res) => {
    if (!req.body)
        return res.status(403).end("Usa bien la pagina");
    if (req.body.username === undefined)
        return res.status(403).end("Usa bien la pagina");
    if (req.body.username.length === 0)
        return res.send({error: true, msg: "Escriba un nombre de usuario"});
    if (req.body.username.length > 50)
        return res.send({error: true, msg: "El nombre de usuario no puede exceder los 50 caracteres"});
    if (!/^[a-zA-Zá-úÁ-Úä-üÄ-ÜñÑ 0-9]+$/.test(req.body.username))
        return res.send({error: true, msg: "Sólo se aceptan caracteres del alfabeto español"});

    req.session.username = req.body.username;
    return res.sendFile("chat.html", {root: joinPath(__dirname, "public/html")}, err => {
        if (err)
            return res.sendFile("error.html", {root: joinPath(__dirname, "public/html")});
    });
});


const server = http.createServer(app);
server.listen(PORT, () => console.log("\033[32;1mServer listening on PORT " + PORT + "\033[0m"));

const io = socket_io(server, {pingTimeout: 10000, pingInterval: 50000});
configChat(io);
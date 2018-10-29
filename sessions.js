const session = require("express-session");

const sess = session({
    secret: "Chat con Node.js por BenjaminGuzman",
    saveUninitialized: false,
    resave: false
});

module.exports = sess;
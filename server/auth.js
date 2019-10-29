"use strict";
const { Users } = require("./models");
const bcrypt = require("bcrypt");
const { validateData } = require("./utils");
const users = [
  {
    username: "audionoise",
    name: "ricardo",
    email: "ricardomoreno@gmail.com",
    password: "$2b$10$pD1Yez/2E5qkfcKtdGGhQuBK16qtD8WS9mfH1Gva8co15jZmbXVeq"
  }
];

function authInit(app) {
  // Endpoint para registro de usuario

  app.post("/api/v1/user/sing-up", async (req, res, next) => {
    const { body } = req;
    const valid = validateData(["name", "lastname", "email", "password"], body);
    if (!valid) {
      return res.status(400).json({ message: "invalid data" });
    }
    try {
      const passwordHash = await bcrypt.hash(body.password, 10);
      body.password = passwordHash;

      const newUser = Users(body);
      newUser.save((error, event) => {
        !error ? console.log(event) : console.log(error);
      });
    } catch (err) {
      return res.status(500).send("internal server error");
    }

    return res.status(201).json({ message: "ok" });
  });

  // Endpoint para login

  app.post("/api/v1/user/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Invalid data" });
    }
    const user = users.find(item => item.username === username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    try {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        delete user.password;
        return res.status(200).json(user);
      }
    } catch (err) {
      return res.status(500).json({ nessage: "internal server error" });
    }
    return res.status(404).json({ nessage: "usuario o contraseña invalidos" });
  });
}

module.exports = authInit;

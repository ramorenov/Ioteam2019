"use strict";
const { Users } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateData } = require("./utils");
const KEY = "ecd9dc751157592c84721936aee4c7fd66aebc843a896b8bad1b49d31f9c54e2";
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
      await newUser.save();
      res.status(201).json({ message: "Register user ok" });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  // Endpoint para login

  app.post("/api/v1/user/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const dbuser = await Users.find({ email: email });
    const user = dbuser[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    try {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        user.password = undefined;
        const token = jwt.sign({ name: user.name, email: user.email }, KEY);
        //console.log(token);

        return res.status(200).json({ user, token });
      }
    } catch (err) {
      return res.status(500).json({ nessage: "internal server error" });
    }

    return res.status(404).json({ nessage: "usuario o contraseña invalidos" });
  });
}

module.exports = authInit;

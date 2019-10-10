let sensorsData = require("../datasens.json");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("Hello IoTeam 2019");
  });

  app.get("/sensors", (req, res, next) => {
    return res.status(200).json(sensorsData);
  });

  app.post("/sensors", (req, res, next) => {
    const { body } = req;
    //body.id = sensorsData.length + 1;
    sensorsData.push(body);
    return res.status(201).json(body);
  });

  app.get("/reset", (req, res, next) => {
    const { body } = req;
    const newbody = [{ deviceId: "rasp001" }];
    sensorsData = newbody;
    return res.status(201).json(body);
  });
};

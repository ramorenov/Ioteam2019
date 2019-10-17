let sensorsData = require("../datasens.json");
const { Sensors } = require("./models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("Hello IoTeam 2019");
  });
  // -- Rutas para guardar en base de datos

  app.post("/api/v1/newevent/sensor", (req, res) => {
    const newEvent = Sensors(req.body);

    newEvent.save((error, event) => {
      !error ? res.send(event) : res.send(error);
    });
  });

  app.get("/api/v1/allevents/sensors", (req, res) => {
    sensors
      .find()
      .then(events => {
        res.status(200).send(events);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  app.get("/api/v1/event/sensors/:eventid", (req, res) => {
    sensors
      .findById(req.params.eventid)
      .then(event => {
        res.status(200).send(event);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  //--------Rutas para escribir en datasens.json
  // app.get("/sensors", (req, res, next) => {
  //   return res.status(200).json(sensorsData);
  // });

  // app.post("/sensors", (req, res, next) => {
  //   const { body } = req;
  //   //body.id = sensorsData.length + 1;
  //   sensorsData.push(body);
  //   return res.status(201).json(body);
  // });

  // app.get("/reset", (req, res, next) => {
  //   const { body } = req;
  //   const newbody = [{ deviceId: "rasp001" }];
  //   sensorsData = newbody;
  //   return res.status(201).json(body);
  // });
};

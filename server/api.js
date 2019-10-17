let sensorsData = require("../datasens.json");
const { Sensors } = require("./models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("Hello IoTeam 2019");
  });

  // Ruta para recibir datos de raspberry

  app.post("/api/v1/sensors", (req, res, next) => {
    const { body } = req;

    if (body.potSensor > 3) {
      const data = {
        sensor_type: "potVoltaje",
        instant_value: body.potSensor,
        event_type: "se detecto voltaje nivel alto",
        activated: true
      };
      const newEvent = Sensors(data);

      newEvent.save((error, event) => {
        !error ? res.send(event) : res.send(error);
      });
    }
    if (body.gasSensor > 120) {
      const data = {
        sensor_type: "Gas",
        instant_value: body.gasSensor,
        event_type: "se detecto concentracion de gas nivel alto",
        activated: true
      };
      const newEvent = Sensors(data);

      newEvent.save((error, event) => {
        !error ? res.send(event) : res.send(error);
      });
    }
    return res.status(201).json(body);
  });

  // -- Rutas para base de datos MongoDB

  app.get("/api/v1/allevents/sensors", (req, res) => {
    Sensors.find()
      .then(events => {
        res.status(200).send(events);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  app.get("/api/v1/event/sensors/:eventid", (req, res) => {
    Sensors.findById(req.params.eventid)
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

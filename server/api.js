const { logSens } = require("./utils");
const { Sensors } = require("./models");
let realTimedata = {};

module.exports = function(app) {
  // Enpoint principal

  app.get("/", function(req, res) {
    res.send("Hello IoTeam 2019");
  });

  // Endpoints para que el cliente solicite datos de Raspberry devise en "tiempo real"

  app.get("/api/v1/sensors/realtime", function(req, res) {
    res.send(realTimedata);
  });

  // Enpoints para que Raspberry device envie datos de sensores

  app.post("/api/v1/sensors", (req, res, next) => {
    const { body } = req;
    realTimedata = body; // almacena en evento recibido en una variable
    const dataforDB = logSens(body);
    dataforDB.forEach(reg => {
      const newEvent = Sensors(reg);
      newEvent.save((error, event) => {
        return !error ? event : error;
      });
    });
    return res.status(201).json(body);
  });

  // -- Endpoints para consultas a la base de datos MongoDB

  app.get("/api/v1/allevents/sensors", (req, res) => {
    Sensors.find()
      .then(events => {
        res.status(200).send(events);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });

  app.get("/api/v1/event/sensors-type/:type", (req, res) => {
    Sensors.find({ sensor_type: req.params.type })
      .then(event => {
        res.status(200).send(event);
      })
      .catch(err => {
        res.status(404).send(err);
      });
  });
};

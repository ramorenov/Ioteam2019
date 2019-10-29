"use strict";

const { validateData } = require("./validateData");
const { logSens } = require("./logsens");

module.exports = { validateData, logSens };

// function validateData(props, data) {
//   let valid = true;
//   props.forEach(key => {
//     if (!data[key]) {
//       valid = false;
//     }
//   });
//   return valid;
// }

// module.exports = {
//   validateData
// };

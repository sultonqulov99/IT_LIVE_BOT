const { Scenes } = require("telegraf");

const stage = new Scenes.Stage([
  require("./start"),
  require("./register"),
  require('./check'),
  require('./certificate'),
  ...require("./admin"),
]);

module.exports = stage;

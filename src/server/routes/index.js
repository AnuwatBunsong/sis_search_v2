const express    = require("express");
const controller = require("../controllers");
const routes     = express.Router();

routes.route("/").get(controller.getQuotes);
routes.route("/").get(controller.getQuotes_name);
routes.route("/new").post(controller.addQuote);

module.exports = routes;
const router = require("express").Router();
const { generateCrudRoutes } = require("../../db/helpers");

router.use("/", generateCrudRoutes("items"));

module.exports = router;

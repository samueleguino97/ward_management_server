const router = require("express").Router();
const { generateCrudRoutes } = require("../../db/helpers");

router.use("/", generateCrudRoutes("movements"));

module.exports = router;

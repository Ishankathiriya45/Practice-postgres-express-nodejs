const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/match", require("./match.routes"));
router.use("/season", require("./season.routes"));

module.exports = router;

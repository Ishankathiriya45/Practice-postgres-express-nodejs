const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/match", require("./match.routes"));

module.exports = router;

const router = require("express").Router();

<<<<<<< HEAD:src/routes/v1/admin/index.js
router.use("/group", require("./group.routes"));
=======
router.use("/room", require("./room.routes"));
router.use("/auth", require("./auth.routes"));
>>>>>>> 4eba98c (Update auth module with services):src/router/v1/admin/index.js

module.exports = router;

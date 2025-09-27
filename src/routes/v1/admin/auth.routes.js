const router = require("express").Router();
const {
  AdminModule: { AuthController },
} = require("../../../controller/v1");

const AuthCtrl = new AuthController();

router.post("/register", async (req, res) => {
  const result = await AuthCtrl.register(req, res);
  return res.status(result.status).send(result);
});

router.post("/login", async (req, res) => {
  const result = await AuthCtrl.login(req, res);
  return res.status(result.status).send(result);
});

router.delete("/delete/:userId", async (req, res) => {
  const result = await AuthCtrl.deleteUser(req, res);
  return res.status(result.status).send(result);
});

router.post("/otp-send", async (req, res) => {
  const result = await AuthCtrl.sendOtp(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;

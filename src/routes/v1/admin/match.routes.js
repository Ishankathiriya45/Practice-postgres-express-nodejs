const router = require("express").Router();
const {
  AdminModule: { MatchController },
} = require("../../../controller/v1");

const matchCtrl = new MatchController();

router.post("/create/:userId", async (req, res) => {
  const result = await matchCtrl.setMatch(req, res);
  return res.status(result.status).send(result);
});

router.get("/list", async (req, res) => {
  const result = await matchCtrl.list(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;

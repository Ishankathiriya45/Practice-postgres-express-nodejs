const router = require("express").Router();
const {
  AdminModule: { SeasonController },
} = require("../../../controller/v1");

const seasonCtrl = new SeasonController();

router.post("/create", async (req, res) => {
  const result = await seasonCtrl.create(req, res);
  return res.status(result.status).send(result);
});

router.post("/create/participant", async (req, res) => {
  const result = await seasonCtrl.createSeasonParticipant(req, res);
  return res.status(result.status).send(result);
});

router.get("/list", async (req, res) => {
  const result = await seasonCtrl.list(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;

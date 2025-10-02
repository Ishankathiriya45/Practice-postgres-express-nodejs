const router = require("express").Router();
const {
  AdminModule: { MatchController },
} = require("../../../controller/v1");

const matchCtrl = new MatchController();

router.post("/create/:userId", async (req, res) => {
  const result = await matchCtrl.setMatch(req, res);
  return res.status(result.status).send(result);
});

router.post("/create", async (req, res) => {
  const result = await matchCtrl.createSeason(req, res);
  return res.status(result.status).send(result);
});

router.post("/create/season/member", async (req, res) => {
  const result = await matchCtrl.createSeasonParticipant(req, res);
  return res.status(result.status).send(result);
});

router.post("/create/match/scores", async (req, res) => {
  const result = await matchCtrl.createMatchScore(req, res);
  return res.status(result.status).send(result);
});

router.get("/season/list/:userId", async (req, res) => {
  const result = await matchCtrl.listSeasonParticipant(req, res);
  return res.status(result.status).send(result);
});

router.get("/list/:userId", async (req, res) => {
  const result = await matchCtrl.list(req, res);
  return res.status(result.status).send(result);
});

module.exports = router;

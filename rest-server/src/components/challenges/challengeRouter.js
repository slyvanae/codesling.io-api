import express from "express";

import {
  addChallengeController,
  addTopScoreController,
  fetchTopScoreForChallengeController,
  replaceTopScoreForChallengeController
} from "./challengeControllers";

const router = express.Router();

router.route("/").post(addChallengeController);

router.route("/addTopScore").post(addTopScoreController);

router.route("/currentTopScore").post(fetchTopScoreForChallengeController);

router.route("/newTopScore").put(replaceTopScoreForChallengeController);

export default router;

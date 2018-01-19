import express from "express";

import { addChallengeController, addTopScoreController } from "./challengeControllers";

const router = express.Router();

router.route("/").post(addChallengeController)

router.route('/topScore').post(addTopScoreController);

export default router;

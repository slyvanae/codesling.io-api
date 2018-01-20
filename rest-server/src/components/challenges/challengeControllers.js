import { addChallengeQuery, addTopScoreQuery, fetchTopScoreForChallengeQuery, replaceTopScoreForChallengeQuery } from "./challengeQueries";
import { addUserChallengeQuery } from "../usersChallenges/usersChallengesQueries";
import { success, error } from "../../lib/log";
import topScores from "../../config/mongodb";

export const addChallengeController = async (req, res) => {
  try {
    /**
     *
     */
    const { rows } = await addChallengeQuery(req.body);
    success("addChallengeController - successfully added challenge ", rows[0]);
    req.body.challenge_id = rows[0].id;
    await addUserChallengeQuery(req.body);
    success("addUserChallengeQuery - successfully added user challenge ");
    return res.status(200).send(rows[0]);
  } catch (err) {
    error("addChallengeController - error= ", error);
  }
};

export const addTopScoreController = async (req, res) => {
  try {
    const topScore = await addTopScoreQuery(req.body);
    success(
      "addTopScoreController - successfully added topScoreForChallenge",
      topScore
    );
    return res.status(201).send(topScores)
  } catch (err) {
    error("addTopScoreController - error= ", err);
  }
};

export const fetchTopScoreForChallengeController = async (req, res) => {
  try {
    const currentTopScore = await fetchTopScoreForChallengeQuery(req.body);
    success(
      "fetchTopScoreForChallenge - successfully fetched topScoreForChallenge",
      currentTopScore
    );
    return res.status(201).send(currentTopScore);
  } catch (err) {
    error('fetchTopScoreForChallenge - error=", err')
  }
}

export const replaceTopScoreForChallengeController = async (req, res) => {
  try {
  console.log('controller for replace', req.body)
    const newTopScore = await replaceTopScoreForChallengeQuery(req.body);
    success(
      "replaceTopScoreForChallenge - successfully replaced topScoreForChallenge",
      newTopScore
    );
    // return res.status(201).send(newTopScore);
  } catch (err) {
    error('replaceTopScoreForChallenge - error=", err')
  }
}


import db from "../../config/database";
import {
  addChallengeHelper,
  addTopScoreHelper,
  fetchTopScoreForChallenge,
  replaceTopScoreForChallenge
} from "./challengeSQLHelpers";
import { success, error } from "../../lib/log";
import topScores from "../../config/mongodb";

export const addChallengeQuery = async body => {
  try {
    const queryString = addChallengeHelper(body);
    const data = await db.queryAsync(queryString);
    success("addChallengeQuery - successfully added challenge ", data);
    return data;
  } catch (err) {
    error("addChallengeQuery - error= ", err);
  }
};

export const addTopScoreQuery = async body => {
  try {
    const topScore = addTopScoreHelper(body);
    const data = await topScore.save();
    success("addTopScoreQuery - successfully added topScore ", data);
    return data;
  } catch (err) {
    error("addTopScoreQuery - error=", err);
  }
};

export const fetchTopScoreForChallengeQuery = async body => {
  try {
    const currentTopScore = fetchTopScoreForChallenge(body);
    console.log('currentTopScore', currentTopScore)
    const data = await currentTopScore.exec();
    success("fetchTopScoreForChallengeQuery - successfully fetched current topScore ", data);
    return data;
  } catch (err) {
    error("fetchTopScoreForChallengeQuery - error=", err);
  }
}

export const replaceTopScoreForChallengeQuery = async body => {
  try {
    console.log(newTopScore)
    const newTopScore = replaceTopScoreForChallenge(body);
    const data = await newTopScore.exec();
    success("replaceTopScoreForChallengeQuery - successfully fetched new topScore ", data);
    return data;
  } catch (err) {
    error("replaceTopScoreForChallengeQuery - error=", err);
  }
}

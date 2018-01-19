import db from "../../config/database";
import { addChallengeHelper, addTopScoreHelper } from "./challengeSQLHelpers";
import { success, error } from "../../lib/log";
import topScores from '../../config/mongodb';

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
    console.log('in addtopscorequery', body);
    const topScore = addTopScoreHelper(body)
    const data = await topScore.save();
    success("addTopScoreQuery - successfully added topScore ", data);
    return data;
  } catch ( err ) {
    error('addTopScoreQuery - error=', err)
  }
};

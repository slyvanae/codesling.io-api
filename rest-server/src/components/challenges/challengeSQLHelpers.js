import topScores from "../../config/mongodb";

export const addChallengeHelper = ({ title, content, difficulty }) => {
  return `
    INSERT INTO challenges (title, content, difficulty, rating)
    VALUES ('${title}', '${content}', ${difficulty}, 0)
    RETURNING id, title, content, difficulty
  `;
};

export const addTopScoreHelper = ({ challengeId, contents, email, time }) => {
  return new topScores({
    challengeId: challengeId,
    contents: contents,
    email: email,
    time: time
  });
};

export const fetchTopScoreForChallenge = ({ challengeId }) => {
  return topScores.findOne({ challengeId: challengeId });
};

export const replaceTopScoreForChallenge = ({challengeId,contents,email,time}) => {
  return topScores.findOneAndUpdate(
    {
      challengeId
    },
    {
      $set:
      {
        challengeId: challengeId,
        contents: contents,
        email: email,
        time: time
      }
    },
    {
      new: true
    },
  );
};


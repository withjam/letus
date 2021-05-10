const {
  verify,
  useRedisClient,
  contextUnauthorized,
  contextInvalid,
  getAuthToken,
} = require('../shared/LetusShared');

// COULDN'T FIGURE OUT HOW TO DELETE RATHER THAN DISABLE
// USE EditUser to CREATE NEW USERS VIA UID

module.exports = async function (context, req) {
  context.log('Defunct');
};

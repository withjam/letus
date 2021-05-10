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
  context.log('CreateUser HTTP trigger function processed a request.');

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? 'Hello, ' + name + '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.';

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

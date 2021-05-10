const {
  verify,
  useRedisClient,
  contextUnauthorized,
  contextInvalid,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('FindFriends function processed a request.');
  const res = {};
  const { body } = req;

  if (!body) {
    contextInvalid(context);
  } else {
    try {
      const authToken = getAuthToken(req);
      if (!authToken) throw 'Missing auth token';
      userid = await verify(authToken);
      // ensure we got a user id
      if (!userid) throw 'Invalid auth token';
      const client = useRedisClient();
      const { name } = req.body;
      if (!name) {
        return contextInvalid(context);
      }
      const result = await client.query(
        `MATCH (them:Person) 
          MATCH (me:Person {userid:$userid}) 
          WHERE NOT them.userid = $userid 
          AND them.name STARTS WITH $name 
          AND NOT (me)-[:friended]->(them) 
          RETURN them`,
        { userid, name }
      );
      respondWithRecords(result, client, context);
    } catch (ex) {
      context.log(ex);
      contextUnauthorized(context);
    }
  }
};

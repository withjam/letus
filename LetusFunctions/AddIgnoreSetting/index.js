const {
  verify,
  useRedisClient,
  contextUnauthorized,
  contextInvalid,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('AddIgnoreSetting HTTP trigger function processed a request.');
  const { body } = req;

  if (!body) {
    contextInvalid(context);
  } else {
    let userid;
    try {
      const authToken = getAuthToken(req);
      if (!authToken) throw 'Missing auth token';
      userid = await verify(authToken);
      // ensure we got a user id
      if (!userid) throw 'Invalid auth token';
      const client = useRedisClient();
      const { poster: themid, category, sentiment } = req.body;
      if (!themid && !category && !sentiment) {
        return contextInvalid(context);
      }
      const query = `
          MATCH (me:Person { userid: $userid }) 
          MERGE (me)-[:ignores]->(ignore:IgnoreSetting {poster:$themid, category: $category, sentiment: $sentiment})
          RETURN me, ignore`;
      context.log(query);
      const params = { userid, themid, category, sentiment };
      const result = await client.query(query, params);
      respondWithRecords(result, client, context);
    } catch (ex) {
      context.log(ex);
      contextUnauthorized(context);
    }
  }
};

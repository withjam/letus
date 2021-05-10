const {
  verify,
  useRedisClient,
  contextUnauthorized,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('GetFriendRequests HTTP trigger function processed a request.');

  let userid;
  try {
    const authToken = getAuthToken(req);
    if (!authToken) throw 'Missing auth token';
    userid = await verify(authToken);
    console.log('got user id', userid);
    // ensure we got a user id
    if (!userid) throw 'Invalid auth token';
    const client = useRedisClient();
    const query = `MATCH (me:Person {userid: $userid}) WITH me MATCH (them:Person)-[:friended]->(me) WHERE NOT (me)-[:friended]->(them) RETURN them`;
    const result = await client.query(query, { userid });
    respondWithRecords(result, client, context);
  } catch (ex) {
    context.log(ex);
    contextUnauthorized(context);
  }
};

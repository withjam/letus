const {
  verify,
  useRedisClient,
  contextUnauthorized,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger GetPosts processed a request.');

  try {
    const authToken = getAuthToken(req);
    if (!authToken) throw 'Missing auth token';
    userid = await verify(authToken);
    // ensure we got a user id
    if (!userid) throw 'Invalid auth token';
    const client = useRedisClient();
    const limit = req.query.limit || 25;
    const skip = req.query.skip || 0;
    const query = `MATCH (me:Person {userid: $userid})-[:friended]->()-[:posted]->(post:Post) 
    WITH me, post
    ORDER BY post.created DESC
    SKIP $skip
    LIMIT $limit
    MATCH (poster:Person)-[:posted]->(post)
    OPTIONAL MATCH (post)-[:hasComment]->(comment:Comment)<-[:commented]-(commenter:Person)<-[:friended]-(me) 
    RETURN post, poster, collect(comment) as comments, collect(commenter) as commenters
    ORDER BY post.created DESC`;
    const result = await client.query(query, { userid, limit, skip });
    respondWithRecords(result, client, context);
  } catch (ex) {
    context.log(ex);
    contextUnauthorized(context);
  }
};

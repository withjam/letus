const {
  verify,
  useRedisClient,
  contextUnauthorized,
  contextInvalid,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('AddComment function processed a request.');
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
      const { text, onPost, replyTo } = req.body;
      const now = new Date().toISOString();
      // TODO: Make this handle replies
      const result = await client.query(
        'MATCH (me:Person), (post:Post) WHERE me.userid = $userid AND ID(post) = $onPost CREATE (me)-[:commented]->(comment:Comment {text:$text,created:$now}) CREATE (post)-[:hasComment]->(comment) RETURN post',
        { userid, text, onPost, now }
      );
      respondWithRecords(result, client, context);
    } catch (ex) {
      context.log(ex);
      contextUnauthorized(context);
    }
  }
};

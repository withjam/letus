const {
  verify,
  useRedisClient,
  contextUnauthorized,
  contextInvalid,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
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
      const { text } = req.body;
      const sentiment = req.body.sentiment || 'neutral';
      const categories = req.body.categories || [];
      const now = new Date().getTime();

      const query = `MATCH (me:Person {userid:$userid}) ${categories
        .map(
          (cat, index) =>
            'MERGE (cat' + index + ':Category {name: $cat' + index + '})'
        )
        .join(
          ' '
        )}  MERGE (sentiment:Sentiment {name: $sentiment}) CREATE (me)-[:posted]->(post:Post {text:$text,created:$now}) MERGE (post)-[:hasSentiment]->(sentiment) ${categories
        .map((cat, index) => 'MERGE (post)-[:inCategory]->(cat' + index + ')')
        .join(' ')} RETURN post`;
      const params = {
        userid,
        text,
        now,
        sentiment,
        ...categories.reduce((acc, val, index) => {
          acc['cat' + index] = val.name;
          return acc;
        }, {}),
      };
      context.log(query, params);
      const result = await client.query(query, params);
      respondWithRecords(result, client, context);
    } catch (ex) {
      context.log(ex);
      contextUnauthorized(context);
    }
  }
};

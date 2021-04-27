const RedisGraph = require('redisgraph.js').Graph;

module.exports = async function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  const res = {};
  const { body } = req;

  if (!body) {
    res.status = 422;
    res.body = {
      message: 'Invalid or missing POST body',
    };
  } else {
    const client = new RedisGraph(
      process.env.REDIS_GRAPH,
      process.env.REDIS_HOST,
      process.env.REDIS_PORT,
      { password: process.env.REDIS_PASS }
    );
    const { name, text } = req.body;
    const sentiment = req.body.sentiment || 'neutral';
    const categories = req.body.categories || [];
    const now = new Date().getTime();
    const query = `MATCH (me:Person {name:$name}) CREATE (me)-[:posted]->(post:Post {text:$text,created:$now}) MERGE (post)-[:hasSentiment]-(:Sentiment {name: $sentiment}) ${categories
      .map(
        (cat, index) =>
          'MERGE (post)-[:inCategory]->(:Category {name: $cat' + index + '})'
      )
      .join(' ')} RETURN post`;
    const params = {
      name,
      text,
      now,
      sentiment,
      ...categories.reduce((acc, val, index) => {
        acc['cat' + index] = val.name;
        return acc;
      }, {}),
    };
    const result = await client.query(query, params);
    const body = {};
    body.stats = result.getStatistics();
    while (result.hasNext()) {
      body.record = result.next();
    }
    client.close();
    res.body = {
      body,
    };
  }
  context.res = res;
};

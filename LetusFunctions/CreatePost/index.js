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
    const now = new Date().toISOString();
    const result = await client.query(
      'MATCH (me:Person {name:$name}) CREATE (me)-[:posted]->(post:Post {text:$text,created:$now}) RETURN post',
      { name, text, now }
    );
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

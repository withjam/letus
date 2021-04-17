const RedisGraph = require('redisgraph.js').Graph;
const client = new RedisGraph(
  process.env.REDIS_GRAPH,
  process.env.REDIS_HOST,
  process.env.REDIS_PORT,
  { password: process.env.REDIS_PASS }
);

module.exports = async function (context, req) {
  context.log('AddComment function processed a request.');
  const res = {};
  const { body } = req;

  if (!body || !body.text || !body.onPost) {
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
    const { name, text, onPost, replyTo } = req.body;
    const now = new Date().toISOString();
    // TODO: Make this handle replies
    const result = await client.query(
      'MATCH (me:Person), (post:Post) WHERE me.name = $name AND ID(post) = $onPost CREATE (me)-[:commented]->(comment:Comment {text:$text,created:$now}) CREATE (post)-[:hasComment]->(comment) RETURN post',
      { name, text, onPost, now }
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

const RedisGraph = require('redisgraph.js').Graph;

module.exports = async function (context, req) {
  const client = new RedisGraph(
    process.env.REDIS_GRAPH,
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
    { password: process.env.REDIS_PASS }
  );
  context.log('JavaScript HTTP trigger GetPosts processed a request.');

  const name = req.query.as || 'Paul';
  const limit = req.query.limit || 25;
  const skip = req.query.skip || 0;
  const query = `MATCH (me:Person {name: $name})-[:friended]->()-[:posted]->(post:Post) 
  WITH me, post
  ORDER BY post.created DESC
  SKIP $skip
  LIMIT $limit
  MATCH (poster:Person)-[:posted]->(post)
  OPTIONAL MATCH (post)-[:hasComment]->(comment:Comment)<-[:commented]-(commenter:Person)<-[:friended]-(me) 
  RETURN post, poster, collect(comment) as comments, collect(commenter) as commenters
  ORDER BY post.created DESC`;
  const result = await client.query(query, { name, limit, skip });
  const body = {
    records: [],
  };
  while (result.hasNext()) {
    body.records.push(result.next());
  }
  client.close();
  context.res = {
    body,
  };
};

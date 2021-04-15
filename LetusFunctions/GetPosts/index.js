const RedisGraph = require('redisgraph.js').Graph;

module.exports = async function (context, req) {
  const client = new RedisGraph(
    process.env.REDIS_GRAPH,
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
    { password: process.env.REDIS_PASS }
  );
  context.log('JavaScript HTTP trigger GetPosts processed a request.');

  const name = req.query.as || (req.body && req.body.as) || 'Paul';
  const query = `MATCH (me:Person {name: $name})-[:friended]->()-[:posted]->(post:Post) 
  WITH me, post 
  OPTIONAL MATCH (post)-[:hasComment]->(comment:Comment)<-[:commented]-(commenter:Person)<-[:friended]-(me) 
  RETURN post, collect(comment) as comments, collect(commenter) as commenters`;
  context.log(query);
  const result = await client.query(query, { name });
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

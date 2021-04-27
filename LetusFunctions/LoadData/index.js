// TODO: this should be an authenticated function, just for development for now

const RedisGraph = require('redisgraph.js').Graph;
const client = new RedisGraph(
  process.env.REDIS_GRAPH,
  process.env.REDIS_HOST,
  process.env.REDIS_PORT,
  { password: process.env.REDIS_PASS }
);

const now = new Date().getTime();
const query = `MERGE (paul:Person {id: 1, name:"Paul"})-[:posted]->(post:Post {text:"This is Paul", created: $now})
MERGE (ringo:Person {name:"Ringo"})-[:friended]->(paul)
MERGE (john:Person {name:"John"})-[:friended]->(paul)
MERGE (george:Person {name:"George"})-[:friended]->(paul)
MERGE (peter:Person {name:"Peter"})-[:friended]->(paul)
MERGE (mary:Person {name:"Mary"})-[:friended]->(paul)
MERGE (ringo)-[:commented]->(rc:Comment {text: "What is it?", created: $now})
MERGE (post)-[:hasComment]->(rc)
MERGE (mary)-[:commented]->(mc:Comment {text: "Love it!", created: $now})
MERGE (post)-[:hasComment]->(mc)
MERGE (paul)-[:commented]->(pc:Comment {text: "Thanks!", created: $now})
MERGE (post)-[:hasComment]->(pc)
MERGE (ringo)-[:friended]->(john)
MERGE (ringo)-[:friended]->(george)
MERGE (george)-[:friended]->(ringo)
MERGE (george)-[:friended]->(john)
MERGE (john)-[:friended]->(ringo)
MERGE (john)-[:friended]->(george)
MERGE (mary)-[:friended]->(peter)
MERGE (peter)-[:friended]->(mary)
MERGE (paul)-[:friended]->(john)
MERGE (paul)-[:friended]->(ringo)
MERGE (paul)-[:friended]->(george)
MERGE (paul)-[:friended]->(peter)
MERGE (paul)-[:friended]->(mary)`;

module.exports = async function (context, req) {
  context.log('Azure trigger - Loading initial data.');

  const result = await client.query(query, { now });
  const body = {
    stastics: result.getStatistics(),
  };
  client.close();
  context.res = {
    body,
  };
};

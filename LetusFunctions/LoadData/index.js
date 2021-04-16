// TODO: this should be an authenticated function, just for development for now

const RedisGraph = require('redisgraph.js').Graph;
const client = new RedisGraph(
  process.env.REDIS_GRAPH,
  process.env.REDIS_HOST,
  process.env.REDIS_PORT,
  { password: process.env.REDIS_PASS }
);

const query = `MERGE (paul:Person {id: 1, name:"Paul"})-[:posted]->(post:Post {id: 2, title:"This is Paul"})
MERGE (ringo:Person {id: 3, name:"Ringo"})-[:friended]->(paul)
MERGE (john:Person {id: 4, name:"John"})-[:friended]->(paul)
MERGE (george:Person {id: 5, name:"George"})-[:friended]->(paul)
MERGE (peter:Person {id: 6, name:"Peter"})-[:friended]->(paul)
MERGE (mary:Person {id: 7, name:"Mary"})-[:friended]->(paul)
MERGE (ringo)-[:commented]->(rc:Comment {text: "What is it?"})
MERGE (post)-[:hasComment]->(rc)
MERGE (mary)-[:commented]->(mc:Comment {text: "Love it!"})
MERGE (post)-[:hasComment]->(mc)
MERGE (paul)-[:commented]->(pc:Comment {text: "Thanks!"})
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
  context.log(
    'Azure trigger - Loading initial data.',
    process.env.REDIS_GRAPH,
    process.env.REDIS_HOST,
    process.env.REDIS_PORT,
    process.env.REDIS_PASS
  );

  const result = await client.query(query);
  const body = {
    stastics: result.getStatistics(),
  };
  client.close();
  context.res = {
    body,
  };
};

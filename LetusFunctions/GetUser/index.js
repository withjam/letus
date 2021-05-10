const {
  verify,
  useRedisClient,
  contextUnauthorized,
  getAuthToken,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('GetUser HTTP trigger function processed a request.');

  let userid;
  try {
    const authToken = getAuthToken(req);
    if (!authToken) throw 'Missing auth token';
    userid = await verify(authToken);
    console.log('got user id', userid);
    // ensure we got a user id
    if (!userid) throw 'Invalid auth token';
    const client = useRedisClient();
    const query = `MATCH (me:Person { userid: $userid }) RETURN me`;
    const result = await client.query(query, { userid });
    const body = {
      records: [],
    };
    body.stats = result.getStatistics();
    while (result.hasNext()) {
      body.records.push(result.next());
    }
    client.close();
    console.log('got results', body);
    context.res = {
      body,
    };
  } catch (ex) {
    context.log(ex);
    contextUnauthorized(context);
  }
};

const {
  verify,
  useRedisClient,
  contextUnauthorized,
  contextInvalid,
  getAuthToken,
  respondWithRecords,
} = require('../shared/LetusShared');

module.exports = async function (context, req) {
  context.log('Edit User HTTP trigger function processed a request.');
  const { body } = req;

  if (!body) {
    contextInvalid(context);
  } else {
    let userid;
    try {
      const authToken = getAuthToken(req);
      if (!authToken) throw 'Missing auth token';
      userid = await verify(authToken);
      // ensure we got a user id
      if (!userid) throw 'Invalid auth token';
      const client = useRedisClient();
      const { name, pic } = req.body;
      // only update if we have some data
      if (name || pic) {
        const query = `
          MERGE (me:Person { userid: $userid }) 
          SET me.userid = $userid${name ? ', me.name = $name' : ''} ${
          pic ? ', me.pic = $pic' : ''
        } RETURN me`;
        context.log(query);
        const params = { name, pic, userid };
        const result = await client.query(query, params);
        respondWithRecords(result, client, context);
      }
    } catch (ex) {
      context.log(ex);
      contextUnauthorized(context);
    }
  }
};

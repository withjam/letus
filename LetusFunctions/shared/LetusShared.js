const RedisGraph = require('redisgraph.js').Graph;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT);
const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.applicationDefault(),
});

module.exports = {
  verify: async function verify(idToken) {
    const decoded = await firebaseAdmin.auth().verifyIdToken(idToken);
    const userid = decoded.uid;
    return userid;
  },
  useRedisClient: function useRedisClient() {
    return new RedisGraph(
      process.env.REDIS_GRAPH,
      process.env.REDIS_HOST,
      process.env.REDIS_PORT,
      { password: process.env.REDIS_PASS }
    );
  },
  getAuthToken: function (request) {
    return request.headers['x-letus-app'];
  },
  contextUnauthorized: function (context) {
    context.res = {
      status: 401,
      body: {
        message: 'Unauthorized',
      },
    };
  },
  contextInvalid: function (context) {
    context.res = {
      status: 422,
      body: {
        message: 'Invalid or missing POST body',
      },
    };
  },
  respondWithRecords: function (result, client, context) {
    const body = {
      records: [],
    };
    body.stats = result.getStatistics();
    while (result.hasNext()) {
      body.records.push(result.next());
    }
    client.close();
    context.res = {
      body,
    };
  },
};

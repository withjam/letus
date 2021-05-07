const RedisGraph = require('redisgraph.js').Graph;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT);

module.exports = {
  verify: async function verify(idToken) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_OAUTH_CLIENT,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
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
};

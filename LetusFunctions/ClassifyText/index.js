const apiKey = process.env.GCP_API_KEY;
const language = require('@google-cloud/language');
const { GoogleAuth, grpc } = require('google-gax');

function getApiKeyCredentials() {
  const sslCreds = grpc.credentials.createSsl();
  const googleAuth = new GoogleAuth();
  const authClient = googleAuth.fromAPIKey(apiKey);
  const credentials = grpc.credentials.combineChannelCredentials(
    sslCreds,
    grpc.credentials.createFromGoogleCredential(authClient)
  );
  return credentials;
}

module.exports = async function (context, req) {
  context.log('ClassifyText function processed a request.');
  let categories = [];

  if (req.body && req.body.split(' ').length > 20) {
    const sslCreds = getApiKeyCredentials();
    const client = new language.LanguageServiceClient({ sslCreds });

    const document = {
      content: req.body,
      type: 'PLAIN_TEXT',
    };

    const [result] = await client.classifyText({ document: document });
    categories = result.categories || [];
  }

  context.res = {
    body: {
      categories,
    },
  };
};

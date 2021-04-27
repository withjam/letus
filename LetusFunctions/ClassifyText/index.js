const apiKey = process.env.GCP_API_KEY;
const language = require('@google-cloud/language');
const { GoogleAuth, grpc } = require('google-gax');

const preps = [
  'amongst',
  'along',
  'across',
  'at',
  'between',
  'from',
  'into',
  'toward',
  'upon',
  'within',
];

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

  const { text } = req.body;
  const len = text ? text.split(' ').length : 0;
  // GCP requires 20 word input, we will pad with prepositions if at least 10 words so we at least get its best guess
  if (text && len > 9) {
    let content = text;
    if (len < 20) {
      content = [...content.split(' '), ...preps.slice(0, 20 - len)].join(' ');
    }
    context.log('using content ' + content);
    const sslCreds = getApiKeyCredentials();
    const client = new language.LanguageServiceClient({ sslCreds });

    const document = {
      content,
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

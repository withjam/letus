const apiKey = process.env.GCP_API_KEY;
const language = require('@google-cloud/language');
const { GoogleAuth, grpc } = require('google-gax');

function mapSentiment(score) {
  if (score > 0.25) {
    return 'positive';
  }
  if (score < -0.25) {
    return 'negative';
  }
  return 'neutral';
}

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
  context.log('Analyze Sentiment function processed a request.');
  let sentiment = 'neutral';

  const { text } = req.body;

  if (text) {
    const sslCreds = getApiKeyCredentials();
    const client = new language.LanguageServiceClient({ sslCreds });

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [result] = await client.analyzeSentiment({ document: document });
    sentiment = mapSentiment(result.documentSentiment.score || 0);
  }

  context.res = {
    body: {
      sentiment,
    },
  };
};

// const {
//   TextAnalyticsClient,
//   AzureKeyCredential,
// } = require('@azure/ai-text-analytics');
// const key = process.env.AZURE_TEXT_API_KEY;
// const endpoint = process.env.AZURE_TEXT_API_ENDPOINT;

// module.exports = async function (context, req) {
//   context.log('Analyze Sentiment function processed a request.');
//   let sentiment = 'neutral';

//   const { text } = req.body;
//   if (text) {
//     const textAnalyticsClient = new TextAnalyticsClient(
//       endpoint,
//       new AzureKeyCredential(key)
//     );
//     const sentimentResult = await textAnalyticsClient.analyzeSentiment([text]);

//     sentiment = sentimentResult; //[0].sentiment;
//   }

//   context.res = {
//     // status: 200, /* Defaults to 200 */
//     body: {
//       sentiment,
//     },
//   };
// };

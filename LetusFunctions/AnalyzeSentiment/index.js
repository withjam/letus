const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require('@azure/ai-text-analytics');
const key = process.env.AZURE_TEXT_API_KEY;
const endpoint = process.env.AZURE_TEXT_API_ENDPOINT;

module.exports = async function (context, req) {
  context.log('Analyze Sentiment function processed a request.');
  let sentiment = 'neutral';

  const { text } = req.body;
  if (text) {
    const textAnalyticsClient = new TextAnalyticsClient(
      endpoint,
      new AzureKeyCredential(key)
    );
    const sentimentResult = await textAnalyticsClient.analyzeSentiment([text]);

    sentiment = sentimentResult[0].sentiment;
  }

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: {
      sentiment,
    },
  };
};
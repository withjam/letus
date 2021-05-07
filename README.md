# Letus
## Project Structure 

* `LetusApp` is an Expo project for easy mobile development.  _see the [expo docs](https://docs.expo.io/) if you are new to expo_
* `LetusFunctions` are a set of Azure functions to create a serverless API. _see the [azure functions docs](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local) if you are new to Azure function development_ 

## Dependencies

* This project relies on RedisGraph - a [Redis Module](https://redis.io/modules). By default, the project expects to use a cloud instance of the database which can be obtained for free at [RedisLabs](https://redislabs.com/)
* This project uses [GCP](https://cloud.google.com/) to both [classify text](https://cloud.google.com/natural-language/docs/classify-text-tutorial) and [analyze sentiment](https://cloud.google.com/natural-language/docs/analyzing-sentiment).  For local development, you should be able to use the free tier for both of these APIs
* This project uses [Azure Funtions](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local) which can be accessed directly in your local development.  If you wish to publish these functions to the cloud, you must create your own [Azure account](https://azure.microsoft.com/en-us/free/). _Tip: There is a very useful [VS Code Extension](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=csharp) to help manage your azure projects and functions._
* This project uses [Google Identity](https://developers.google.com/identity/protocols/oauth2) to authenticate users via web-based **Oauth 2.0** Follow the [Expo Google Auth](https://docs.expo.io/guides/authentication/#google) documentation to create your **ClientID**, **JavaScript origin**, and **authorized redirect URI**. _Tip: follow instructions for the [Expo Go](https://expo.io/client) app as they are the easiest steps.  If you are not using the Expo Go app during development, follow the steps based on your dev environment._

### Recomended

* NodeJS runtime (version based on [Azure functions support](https://docs.microsoft.com/en-us/azure/azure-functions/functions-versions)
* VS Code
* VS Code Azure Functions extension

## Development Setup

* Clone this repository

### LetusApp (Expo)

* `cd LetusApp`
* `npm install --global expo-cli`
* `expo install`
* create a `.env.local` file to store your local configuration
* set the value of `LETUS_API_URL` to the location of your API (can use `.env` if local functions)
* set the value of `GOOGLE_WEB_CLIENT_ID` to use a Web OAUTH credential created in your Google Identity account.
* `expo start`
* press `i` to launch iOS simulator or `a` for android.  (note: android simulator requires Android Studio and sdk setup)
  
### LetusFunctions

* Azure functions can be run locally.  Easiest option is to use [VS Code Extension](https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code?tabs=csharp) and then use `f5` to launch in debug mode
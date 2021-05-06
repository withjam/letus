import React, { useContext } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { styles } from '../Styles';
import { AppContext } from '../AppContext';

WebBrowser.maybeCompleteAuthSession();

export const Login = () => {
  const context = useContext(AppContext);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_WEB_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        const { authentication } = response;
        console.log('auth', authentication.accessToken);
        const token = authentication.accessToken;
        const info = await fetch(
          'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' +
            authentication.accessToken
        );
        const jsonInfo = await info.json();
        console.log('user', jsonInfo);
        context.setUser(jsonInfo);
      })();
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text>Login</Text>
      </Pressable>
    </SafeAreaView>
  );
};

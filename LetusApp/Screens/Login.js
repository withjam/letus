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
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_WEB_CLIENT_ID,
    androidClientId: GOOGLE_WEB_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log('new login', response);
      const {
        params: { id_token: idToken },
      } = response;
      context.setUserKey(idToken);
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

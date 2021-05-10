import React, { useContext, useState } from 'react';
import { Pressable, SafeAreaView, View, Text, TextInput } from 'react-native';
import { COLORS, SIZES, styles } from '../Styles';
import { AppContext } from '../AppContext';
import * as firebase from 'firebase';

const MODE = {
  signin: 'Sign In',
  register: 'Register',
};

export const Login = () => {
  const context = useContext(AppContext);
  const [mode, setMode] = useState(MODE.signin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  function toggleMode() {
    setPassword('');
    setPassword2('');
    setMode(mode === MODE.signin ? MODE.register : MODE.signin);
  }

  async function doIt() {
    setError(false);
    try {
      if (mode === MODE.signin) {
        const creds = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log('logged in with creds', creds);
      } else {
        const creds = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log('created user', creds);
        context.setUserInfo({ nickname: nickname || 'New User' });
      }
    } catch (ex) {
      console.log(ex);
      setError(ex.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          flex: 1,
          width: '90%',
        }}
      >
        <Text style={styles.h1}>Letus {mode}</Text>
        {mode === MODE.signin ? (
          <>
            <Text style={styles.text}>Don't have an account with us?</Text>
            <Pressable onPress={toggleMode}>
              <Text style={[styles.bold, { color: COLORS.link }]}>
                Register for free!
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={[styles.text, { textAlign: 'center' }]}>
              Simply give us your favorite email address and provide a nicname
              for others to use.
            </Text>
            <View style={[styles.text, { textAlign: 'center' }]}>
              <Text style={styles.text}>Already have an account? </Text>
              <Pressable onPress={toggleMode} style={{ alignItems: 'center' }}>
                <Text style={[styles.bold, { color: COLORS.link }]}>
                  Sign in instead.
                </Text>
              </Pressable>
            </View>
          </>
        )}
        <View style={styles.containerForm}>
          <View style={styles.formInput}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={[styles.textInput]}
              placeholder='Email address'
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
          <View style={styles.formInput}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={[styles.textInput]}
              placeholder='Password'
              secureTextEntry={!showPassword}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
          {mode === MODE.register ? (
            <>
              <View style={styles.formInput}>
                <TextInput
                  value={password2}
                  onChangeText={setPassword2}
                  style={[styles.textInput]}
                  placeholder='Confirm password'
                  secureTextEntry={!showPassword}
                  autoCapitalize='none'
                  autoCorrect={false}
                />
              </View>
              <View style={styles.formInput}>
                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  style={[styles.textInput]}
                  placeholder='Nickname'
                  autoCorrect={false}
                />
              </View>
            </>
          ) : null}
        </View>
        {error ? (
          <View style={styles.formInput}>
            <Text
              style={[
                styles.text,
                { fontSize: SIZES.sm, color: COLORS.danger },
              ]}
            >
              {error}
            </Text>
          </View>
        ) : null}
        <Pressable
          onPress={() => {
            doIt();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {mode === MODE.signin ? 'Sign In' : 'Register'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

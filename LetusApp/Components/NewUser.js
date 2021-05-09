import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { AppContext } from '../AppContext';
import { FetchUserInfo } from '../Screens/Login';
import { pickerSelectStyles, SIZES, styles } from '../Styles';

export const NewUser = () => {
  const { userKey } = useContext(AppContext);
  const [name, setName] = useState('');

  useEffect(() => {
    if (userKey) {
      (async () => {
        const info = await FetchUserInfo(userKey);
        console.log('new user info', info);
        setName(info.name || 'New User');
      })();
    }
  }, [userKey]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Welcome!</Text>
      <View style={myStyles.row}>
        <Text style={styles.text}>Please </Text>
        <Text style={styles.strong}>let us</Text>
        <Text style={styles.text}> know your name</Text>
      </View>
      <View>
        <Text style={styles.textLight}>
          (this is what others will call you)
        </Text>
      </View>
      <View style={myStyles.row}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={[
            pickerSelectStyles.inputIOS,
            { width: '75%', textAlign: 'center' },
          ]}
        />
      </View>
      <View style={myStyles.row}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styleDef = {};

styleDef.row = {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingVertical: SIZES.xs,
};

const myStyles = StyleSheet.create(styleDef);

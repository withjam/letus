import React, { useContext, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { AppContext } from './AppContext';
import { styles, pickerSelectStyles } from './Styles';

export const Login = () => {
  const context = useContext(AppContext);
  const [userName, setUserName] = useState('nobody');
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h2}>Please Sign In</Text>
      <View style={{ marginVertical: 40, width: '65%' }}>
        <RNPickerSelect
          placeholder={{}}
          style={pickerSelectStyles}
          value={userName}
          onValueChange={(value) => setUserName(value)}
          items={[
            { label: 'Select a user', value: 'nobody' },
            { label: 'Peter', value: 'Peter' },
            { label: 'Paul', value: 'Paul' },
            { label: 'Mary', value: 'Mary' },
          ]}
        />
      </View>
      <Pressable
        style={({ pressed }) => (pressed ? styles.buttonAlt : styles.button)}
        onPress={() => {
          if (userName !== 'nobody') {
            context.setUser(userName);
          }
        }}
      >
        {({ pressed }) => (
          <Text style={pressed ? styles.buttonAltText : styles.buttonText}>
            Sign In
          </Text>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

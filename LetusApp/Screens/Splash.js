import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import { styles } from '../Styles';

export const Splash = () => {
  return (
    <SafeAreaView style={styles.splash}>
      <Image
        source={require('../assets/icon.png')}
        style={{ width: 375, height: 375 }}
      />
    </SafeAreaView>
  );
};

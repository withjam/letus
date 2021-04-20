import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { styles } from '../Styles';

export const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Letus</Text>
    </SafeAreaView>
  );
};

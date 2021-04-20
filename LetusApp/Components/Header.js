import React from 'react';
import { View, Text } from 'react-native';
import { styles, COLORS, SIZES } from '../Styles';
import { Ionicons } from '@expo/vector-icons';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Ionicons name='menu-outline' size={SIZES.icon} color={COLORS.light} />
      <Text style={styles.headerText}>Letus</Text>
      <Ionicons name='create-outline' size={SIZES.icon} color={COLORS.light} />
    </View>
  );
};

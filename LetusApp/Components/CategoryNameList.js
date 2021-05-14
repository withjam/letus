import React from 'react';
import { View, FlatList, Text, StyleSheet, Pressable } from 'react-native';
import { styles, COLORS, SIZES } from '../Styles';

const categories = require('../ContentCategoriesDemo.json');

export const ANY_CATEGORY = '_anything_';

export function getCategoryFromKey(key) {
  return key > -1 ? categories[key] : null;
}

export function getCategoryName(path) {
  return path ? path.substring(path.lastIndexOf('/') + 1) : ANY_CATEGORY;
}

export function getCategoryNameFromKey(key) {
  return getCategoryName(getCategoryFromKey(key));
}

const categoryNames = categories
  .map((cat, index) => ({
    label: getCategoryName(cat),
    key: index + '',
  }))
  .sort((a1, a2) => a1.label.localeCompare(a2.label));

categoryNames.unshift({
  label: '_anything_',
  key: '-1',
});

export const CategoryNameList = ({ onSelection, selected }) => {
  return (
    <View style={listStyles.container}>
      <FlatList
        style={{ flex: 1 }}
        data={categoryNames}
        renderItem={({ item }) => (
          <Pressable onPress={() => onSelection(item)} style={listStyles.item}>
            <Text style={listStyles.text}>{item.label}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styleDef = {};

styleDef.container = {
  height: 300,
  width: 200,
  backgroundColor: COLORS.white,
  alignItems: 'stretch',
};

styleDef.item = {
  padding: SIZES.xs,
};

styleDef.text = {
  ...styles.text,
  fontSize: SIZES.sm - 2,
};

const listStyles = StyleSheet.create(styleDef);

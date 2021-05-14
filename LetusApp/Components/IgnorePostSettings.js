import React, { useState } from 'react';
import {
  Modal,
  View,
  Pressable,
  SafeAreaView,
  Text,
  StyleSheet,
} from 'react-native';
import { styles, SIZES } from '../Styles';
import {
  CategoryNameList,
  getCategoryFromKey,
  getCategoryName,
} from './CategoryNameList';
import { Pillbox } from './Pillbox';

const sentiments = require('../Sentiments.json');
const ignoreTypes = ['this post', 'any post'];

export const IgnorePostSettings = ({ data, shown, onCancel, onSave }) => {
  if (!data) return null;
  const { post, poster } = data;
  const posterName = poster.properties.name;
  const [ignoreType, setIgnoreType] = useState(ignoreTypes[0]);
  const [ignoreTarget, setIgnoreTarget] = useState(posterName);
  const [ignoreSentiment, setIgnoreSentiment] = useState('any');
  const [ignoreCategories, setIgnoreCategories] = useState();

  return (
    <Modal presentationStyle='fullScreen' visible={shown} animationType='slide'>
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Text style={styles.modalHeaderText}>Ignore Settings</Text>
          <Pressable
            onPress={() =>
              onSave({
                poster: ignoreTarget === 'anybody' ? undefined : poster.id,
                sentiment: ignoreSentiment,
                category: ignoreCategories,
              })
            }
          >
            <Text style={styles.cancelText}>Save</Text>
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalRow}>
            <Text style={[ignoreStyles.text, { marginRight: SIZES.xs }]}>
              Ignore
            </Text>
            <Pillbox
              value={ignoreType}
              values={['this post', 'any post']}
              onChange={(v) => {
                setIgnoreType(v);
                if (v === 'this post') {
                  setIgnoreTarget(posterName);
                }
              }}
            />
            <Text style={[ignoreStyles.text, { marginHorizontal: SIZES.xs }]}>
              from
            </Text>
            <Pillbox
              disabled={ignoreType === 'this post'}
              value={ignoreTarget}
              values={[posterName, 'anybody']}
              onChange={setIgnoreTarget}
            />
          </View>
          <View
            style={
              ignoreType !== 'this post'
                ? styles.modalRow
                : styles.modalRowDisabled
            }
          >
            <Text style={[ignoreStyles.text, { marginRight: SIZES.xs }]}>
              With
            </Text>
            <Pillbox
              disabled={ignoreType === 'this post'}
              value={ignoreSentiment}
              values={['any', ...sentiments]}
              onChange={setIgnoreSentiment}
            />
            <Text style={[ignoreStyles.text, { marginLeft: SIZES.xs }]}>
              vibes
            </Text>
          </View>
          <View
            style={
              ignoreType !== 'this post'
                ? styles.modalRow
                : styles.modalRowDisabled
            }
          >
            <Text style={[ignoreStyles.text, { marginRight: SIZES.xs }]}>
              About
            </Text>
            <Pillbox
              disabled={ignoreType === 'this post'}
              value={getCategoryName(ignoreCategories)}
              values={<CategoryNameList />}
              onChange={(index) => {
                setIgnoreCategories(getCategoryFromKey(index));
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const ignoreStyles = StyleSheet.create({
  text: {
    ...styles.text,
    fontSize: SIZES.sm,
  },
});

import React, { useState } from 'react';
import { Modal, View, Pressable, SafeAreaView, Text } from 'react-native';
import { styles } from '../Styles';

export const IgnorePostSettings = ({ data, shown, onCancel, onSave }) => {
  if (!data) return null;
  const { post, poster } = data;
  return (
    <Modal presentationStyle='fullScreen' visible={shown}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={onCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Text style={styles.modalHeaderText}>Ignore Settings</Text>
          <Pressable onPress={() => onSave(text)}>
            <Text style={styles.cancelText}>Save</Text>
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.modalForm}>
            <Text>Posts from this user</Text>
            <Text>{poster.properties.name}</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

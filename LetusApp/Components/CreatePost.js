import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { styles } from '../Styles';

export const CreatePost = ({ shown, onClose }) => {
  const [text, setText] = useState('');

  return (
    <Modal
      presentationStyle='fullScreen'
      visible={shown}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
          <Text style={styles.modalHeaderText}>New Post</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.cancelText}>Share</Text>
          </Pressable>
        </View>
        <View style={styles.modalBody}>
          <Text>Body</Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const mstyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

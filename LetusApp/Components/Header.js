import React, { useContext, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles, COLORS, SIZES } from '../Styles';
import { Ionicons } from '@expo/vector-icons';
import { CreatePost } from '../Components/CreatePost';
import { AppContext } from '../AppContext';
import { Sidebar } from './Sidebar';

export const Header = () => {
  const context = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  function doSave(text) {
    setShowModal(false);
    context.client.createPost(text);
  }

  return (
    <View style={styles.header}>
      <Pressable onPress={() => setShowSidebar(true)}>
        <Ionicons name='menu-outline' size={SIZES.icon} color={COLORS.light} />
      </Pressable>
      <Text style={styles.headerText}>Letus</Text>
      <Pressable onPress={() => setShowModal(true)}>
        <Ionicons
          name='create-outline'
          size={SIZES.icon}
          color={COLORS.light}
        />
      </Pressable>
      <CreatePost
        shown={showModal}
        onCancel={() => setShowModal(false)}
        onSave={doSave}
      />
      <Sidebar shown={showSidebar} onClose={() => setShowSidebar(false)} />
    </View>
  );
};

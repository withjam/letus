import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, Modal, Pressable, Animated } from 'react-native';
import { AppContext } from '../AppContext';
import { COLORS, SIZES, styles, sidebarWidth } from '../Styles';
import * as firebase from 'firebase';

export const Sidebar = ({ shown, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const context = useContext(AppContext);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = (fn) => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(slideAnim, {
      toValue: -sidebarWidth,
      duration: 150,
      useNativeDriver: true,
    }).start(fn);
  };

  useEffect(() => {
    if (shown) {
      slideIn();
    }
  }, [shown]);

  function startClose() {
    slideOut(() => {
      onClose();
    });
  }

  function makeSelection(item) {
    startClose();
    switch (item) {
      case 'signout':
        firebase.auth().signOut();
    }
  }

  return (
    <Modal visible={shown} transparent={true} style={{ flex: 1 }}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.25)' }}
        onPress={startClose}
      >
        <Animated.View
          style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}
        >
          <Pressable style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={styles.sidebarTop}>
                <Text style={styles.text}>
                  {context.userInfo.me.properties.name}
                </Text>
                <Pressable onPress={startClose}>
                  <Text
                    style={[
                      styles.textMuted,
                      { fontSize: SIZES.md, paddingHorizontal: SIZES.xs / 2 },
                    ]}
                  >
                    X
                  </Text>
                </Pressable>
              </View>
              <Pressable style={styles.sidebarItem}>
                <Text style={styles.sidebarText}>Your Feed</Text>
              </Pressable>
              <Pressable style={styles.sidebarItem}>
                <Text style={styles.sidebarText}>Manage Friends</Text>
              </Pressable>
              <Pressable
                style={styles.sidebarItem}
                onPress={() => makeSelection('signout')}
              >
                <Text style={[styles.sidebarText, { color: COLORS.danger }]}>
                  Sign Out
                </Text>
              </Pressable>
              <Pressable style={[styles.sidebarItem, { flex: 1 }]}></Pressable>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

import React, { useRef, useEffect } from 'react';
import { Animated, Text, Modal, Pressable } from 'react-native';
import { styles } from '../Styles';

export const BottomDrawer = ({ open, onDismiss }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    if (open) {
      Animated.spring(slideAnim, {
        toValue: 100,
      }).start();
    }
  }, [slideAnim]);

  return (
    <Modal
      presentationStyle='overFullScreen'
      visible={open}
      animationType='fade'
      transparent={true}
      style={styles.bottomDrawer}
    >
      <Pressable onPress={onDismiss} style={styles.drawer}>
        <Animated.View
          style={[
            styles.drawerContainer,
            {
              transform: [
                {
                  translateY: slideAnim,
                },
              ],
            },
          ]}
        >
          <Text>Menu Item</Text>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

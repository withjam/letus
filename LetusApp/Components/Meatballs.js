import React, { useEffect, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, COLORS, SIZES } from '../Styles';
import RBSheet from 'react-native-raw-bottom-sheet';

export const Meatballs = ({ withRef, children }) => {
  const drawer = useRef();
  return (
    <View>
      <Pressable onPress={() => drawer.current.open()}>
        <Ionicons
          name='ellipsis-horizontal'
          size={SIZES.icon_sm}
          color={COLORS.black}
        />
      </Pressable>
      <RBSheet
        ref={(ref) => {
          drawer.current = ref;
        }}
        height={350}
        openDuration={250}
        onOpen={withRef ? () => withRef(drawer.current) : () => null}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        closeOnDragDown={true}
      >
        {children}
      </RBSheet>
    </View>
  );
};

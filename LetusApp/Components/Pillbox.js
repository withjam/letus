import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { COLORS, SIZES, styles } from '../Styles';

export const Pillbox = ({ value, values, onChange, disabled }) => {
  const [menuRef, setMenuRef] = useState();

  function showMenu() {
    if (menuRef && !disabled) {
      menuRef.show();
    }
  }

  function hideMenu() {
    if (menuRef) {
      menuRef.hide();
    }
  }

  return (
    <View>
      <Menu
        ref={setMenuRef}
        button={
          <Pressable
            style={
              disabled
                ? pillStyles.pillContainerDisabled
                : pillStyles.pillContainer
            }
            onPress={showMenu}
          >
            <Text style={pillStyles.pillText}>{value}</Text>
          </Pressable>
        }
      >
        {values.map((opt, index) => (
          <MenuItem
            key={index}
            onPress={() => {
              onChange(opt);
              hideMenu();
            }}
          >
            {opt}
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
};

const pillStyleDef = {};

pillStyleDef.pillContainer = {
  borderColor: COLORS.primary,
  borderRadius: SIZES.md,
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: SIZES.xs * 1.25,
  paddingVertical: SIZES.xs / 1.5,
};
pillStyleDef.pillContainerDisabled = {
  ...pillStyleDef.pillContainer,
  borderColor: COLORS.shadow,
};
pillStyleDef.pillText = {
  ...styles.text,
  fontSize: SIZES.sm - 2,
};

const pillStyles = StyleSheet.create(pillStyleDef);

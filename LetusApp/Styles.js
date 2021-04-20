import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const GUTTER = 12;

export const SIZES = {
  xs: 12,
  sub: 15,
  sm: 16,
  md: 18,
  lg: 22,
  xl: 26,
  title: 40,
  icon: 32,
  icon_sm: 24,
  icon_xs: 16,
  icon_lg: 40,
};

export const COLORS = {
  primary: '#91c788',
  secondary: '#ddffbc',
  dark: '#52734d',
  light: '#feffde',
  white: '#fff',
  black: '#000',
  muted: '#393939',
};

export const WEIGHTS = {
  light: '300',
  regular: '400',
  bold: '700',
};

const styleDef = {
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

styleDef.main = {
  ...styleDef.container,
  alignSelf: 'stretch',
  backgroundColor: COLORS.white,
  alignItems: 'stretch',
  justifyContent: 'space-between',
};

styleDef.header = {
  flex: 0,
  flexDirection: 'row',
  paddingTop: Constants.statusBarHeight + 6,
  paddingBottom: 6,
  paddingHorizontal: GUTTER,
  alignSelf: 'stretch',
  backgroundColor: COLORS.primary,
  alignItems: 'center',
  justifyContent: 'space-between',
};

styleDef.text = {
  fontFamily: 'NotoSansJP_300Light',
  fontSize: SIZES.md,
};

styleDef.textLight = {
  fontFamily: 'NotoSansJP_100Thin',
};

styleDef.textMuted = {
  fontFamily: 'NotoSansJP_100Thin',
  color: COLORS.muted,
};

styleDef.strong = {
  fontFamily: 'NotoSansJP_500Medium',
};

styleDef.bold = {
  fontFamily: 'NotoSansJP_700Bold',
};

styleDef.heavy = {
  fontFamily: 'NotoSansJP_900Black',
};

styleDef.headerText = {
  ...styleDef.bold,
  color: COLORS.light,
  fontSize: SIZES.lg,
  flex: 0,
};

styleDef.h1 = {
  ...styleDef.text,
  fontSize: SIZES.title,
};

styleDef.h2 = {
  ...styleDef.text,
  fontSize: SIZES.xl,
};

styleDef.button = {
  backgroundColor: COLORS.secondary,
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 10,
};

styleDef.buttonText = {
  ...styleDef.strong,
  fontSize: SIZES.md,
  color: COLORS.dark,
};

styleDef.buttonAlt = {
  ...styleDef.button,
  backgroundColor: COLORS.dark,
};

styleDef.buttonAltText = {
  ...styleDef.buttonText,
  color: COLORS.secondary,
};

styleDef.postContainer = {};

styleDef.postHeader = {
  paddingHorizontal: GUTTER,
  paddingTop: GUTTER,
  paddingBottom: 0,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};

styleDef.postHeaderMeta = {
  flex: 0,
  alignItems: 'flex-end',
  justifyContent: 'space-evenly',
};

styleDef.postHeaderMetaText = {
  ...styleDef.textMuted,
  fontSize: SIZES.xs,
};

styleDef.postFooter = {
  paddingHorizontal: GUTTER,
  paddingTop: GUTTER / 2,
  paddingBottom: GUTTER,
  flex: 1,
  alignItems: 'flex-start',
};

styleDef.postHeaderText = {
  ...styleDef.bold,
  fontSize: SIZES.sm,
  color: COLORS.black,
};

styleDef.postText = {
  ...styleDef.text,
  fontSize: SIZES.md,
  paddingHorizontal: GUTTER,
  paddingVertical: SIZES.sm,
};

styleDef.postFooterText = {
  ...styleDef.text,
  fontSize: SIZES.sub,
  color: COLORS.muted,
};

export const styles = StyleSheet.create(styleDef);

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styleDef.text,
    fontSize: SIZES.md,
    paddingVertical: SIZES.xs,
    paddingHorizontal: GUTTER,
    borderWidth: 1,
    borderColor: COLORS.light,
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: SIZES.lg,
    paddingHorizontal: GUTTER,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

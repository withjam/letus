import { StyleSheet } from 'react-native';

const styleDef = {
  container: {
    flex: 1,
    backgroundColor: '#91c788',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

styleDef.text = {
  color: '#feffde',
  fontSize: 18,
};

styleDef.h1 = {
  ...styleDef.text,
  fontSize: 42,
};

styleDef.h2 = {
  ...styleDef.text,
  fontSize: 28,
};

styleDef.button = {
  backgroundColor: '#ddffbc',
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 10,
};

styleDef.buttonText = {
  ...styleDef.text,
  color: '#52734d',
};

styleDef.buttonAlt = {
  ...styleDef.button,
  backgroundColor: '#52734d',
};

styleDef.buttonAltText = {
  ...styleDef.text,
  color: '#ddffbc',
};

export const styles = StyleSheet.create(styleDef);

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    ...styleDef.text,
    fontSize: 22,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#feffde',
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

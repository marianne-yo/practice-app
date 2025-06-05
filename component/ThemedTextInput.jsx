import { View, TextInput, useColorScheme, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';

const ThemedTextInput = ({ style, rightIcon, ...props }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={[styles.inputWrapper, { backgroundColor: theme.uiBackground, borderColor: theme.txtinputBorder }, style]}>
      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholderTextColor={theme.placeholderColor ?? '#aaa'}
        {...props}
      />
      {rightIcon && (
        <View style={styles.iconWrapper}>
          {rightIcon}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  iconWrapper: {
    marginLeft: 10,
  }
});

export default ThemedTextInput;

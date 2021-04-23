import React from 'react';
import { Platform } from 'react-native';
import styled from "styled-components/native";
import colors from "../variables/color";



const Wrapper = styled.View`

`
const InputFieldStyle = styled.TextInput`
  width: 100%;
  padding: 12px 10px;
  font-size: 16px;
  border-radius: 12px;
  background: ${colors.secondary};
  border: 0;
  color: ${colors.text};
`;

const InputField = ({
  placeholder,
  label,
  onChangeText,
  value,
  style,
  keyboardType,
  textContentType,
  autoCompleteType,
  secureTextEntry,
  minLength,
  maxLength,
  amountOfCharacters,
  icon,
  multiline,
  numberOfLines,
}) => {
  return (
    <InputFieldStyle
      style={style}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      textContentType={textContentType}
      autoCompleteType={autoCompleteType}
      secureTextEntry={secureTextEntry}
      inlineImageLeft={icon}
      placeholderTextColor={colors.unFocused}
      minHeight={
        Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : null
      }
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={numberOfLines ? "top" : "center"}
      maxLength={maxLength}
    />
  );
};

export default InputField;
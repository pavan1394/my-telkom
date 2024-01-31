import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
// import styles, { Input, Label } from './style';
import styled from "styled-components";

const OTPInput = (props) => {
  const {
    label,
    length = 8,
    onChange,
    style
  } = props

  const [value, setValue] = useState([]);
  const inputs = Array(length).fill(0);
  const refs = [];

  useEffect(() => {
    refs[0].focus();
  }, []);

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0 && !value[index])
      refs[index - 1].focus();
  }

  const focusNext = (index, val) => {
    if (index < refs.length - 1 && val) {
      refs[index + 1].focus();
    }
    if (index === refs.length - 1 && val) {
      refs[index].blur();
    }
    const otp = value;
    otp[index] = val;
    setValue(otp)
    if (onChange) {
      onChange(value.join(''));
    }
  }

  return (
    <View style={style}>
      {label && <Label>{label}</Label>}
      <View style={styles.container}>
        {
          inputs.map((input, index) => (
            <Input
              key={index}
              keyboardType="numeric"
              onChangeText={text => focusNext(index, text)}
              onKeyPress={e => focusPrevious(e.nativeEvent.key, index)}
              ref={ref => refs[index] = ref}
              maxLength={1}
            />
          ))
        }
      </View>
    </View>
  )
}

export default OTPInput;

export const Label = styled.Text`
  font-family: Gordita-Medium;
  font-size: 12px;
  text-align: left;
  color: #32545A;
  ${Platform.OS == "ios" ? "padding-top: 10px" : ""}
  ${props => props.style}
`;

export const Input = styled.TextInput`
  
  flex: 1;
  margin: 8px;
  text-align: center; 
  font-family: Gordita-Regular;
  font-size: 24px;
  font-weight: 400;
  color: #0083c2;
  padding: 8px 0px;
  border-bottom-width: 2;
  border-color: #0083c2;
  ${Platform.OS == "ios" ? "padding-top: 10px" : ""}
  ${props => props.style}
`;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  }
});
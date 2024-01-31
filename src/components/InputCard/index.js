import React, { forwardRef } from "react";
import { View, TouchableOpacity, Text, } from 'react-native';
import styles, {
  TextInput as StyledTextInput,
  InputLabel,
  InputHelperText,
  TextInputContainer,
} from "./styles";

const InputCard = (props, ref) => {

  const {
    label,
    labelStyle = {},
    subLabel,
    subLabelText,
    subLabelStyle = {},
    helperText,
    helperTextStyle = {},
    inputStyle = {},
    textInputContainer = {},
    containerStyle = {},
    errorMessage = '',
    shouldHighlightErrorContainer = true,
    leftIcon,
    onLeftIconPress = () => { },
    rightIcon,
    onRightIconPress = () => { },
    onPress = () => { },
    rightLabel,
    hasFocus = false,
    ...inputProps
  } = props

  const Label = () => {
    return label && rightLabel ? (
      <View style={styles.dualLabelContainer}>
        <InputLabel style={labelStyle}>
          {label}
        </InputLabel>
        {rightLabel}
      </View>
    ) : label ? (
      <InputLabel style={labelStyle}>
        {label}
      </InputLabel>
    ) : null
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={containerStyle}>

      <TextInputContainer style={textInputContainer}>

        <View style={styles.flexRow}>
          {
            leftIcon && <View style={styles.rightActionContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  onLeftIconPress();
                }}
              >
                {leftIcon}
              </TouchableOpacity>
            </View>
          }
          <View style={[hasFocus ? styles.activeInputContainer : styles.inActiveInputContainer]}>
            {Label()}
            <View style={styles.flexRow}>
              {!subLabel ? <StyledTextInput
                ref={ref}
                style={[inputStyle,
                  (errorMessage && shouldHighlightErrorContainer) && {
                    backgroundColor: '#FFF3F6',
                    borderWidth: 1,
                    borderColor: '#FE84A8',
                  }]} {...inputProps}
              />
                :
                <View style={[styles.flexRow, {
                  flex: 1,
                  paddingLeft: 3,
                  paddingTop: 8,
                  alignItems: 'center',
                  alignSelf: 'center',
                }]}>
                  <Text style={inputStyle}>{subLabel}</Text>
                  <Text style={[inputStyle, subLabelStyle]}>{subLabelText}</Text>
                </View>
              }
            </View>
          </View>
          {
            rightIcon && <View style={styles.rightActionContainer}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  onRightIconPress();
                }}
              >
                {rightIcon}
              </TouchableOpacity>
            </View>
          }
        </View>
      </TextInputContainer>

      {
        (errorMessage) ? <InputLabel style={[labelStyle, { color: '#CB6A86', padding: 5, }]}>
          {errorMessage}
        </InputLabel>
          :
          null
      }
    </TouchableOpacity>
  );
}

export default forwardRef(InputCard)

import React, { forwardRef } from "react";
import { View, TouchableOpacity } from 'react-native';
import styles, {
  TextInput as StyledTextInput,
  InputLabel,
  InputHelperText,
  TextInputContainer,
} from "./styles";

const Input = (props, ref) => {

  const {
    label,
    labelStyle = {},
    helperText,
    helperTextStyle = {},
    inputStyle = {},
    textInputContainer = {},
    containerStyle = {},
    errorMessage = '',
    shouldHighlightErrorContainer = true,
    rightIcon,
    onRightIconPress,
    rightLabel,
    ...inputProps
  } = props

  const Label = () => {
    return label && rightLabel ? (
      <View style={styles.dualLabelContainer}>
        <InputLabel style={labelStyle}>
          {label}
        </InputLabel>
        { rightLabel }
      </View>
    ) : label ? (
      <InputLabel style={labelStyle}>
        {label}
      </InputLabel>
    ) : null
  }

  return (
    <View style={containerStyle}>
      
      { Label() }

      {
        helperText && <InputHelperText style={helperTextStyle}>
          {helperText}
        </InputHelperText>
      }

      <TextInputContainer style={textInputContainer}>
        <StyledTextInput
          ref={ref}
          style={[inputStyle,
            (errorMessage && shouldHighlightErrorContainer) && {
              backgroundColor: '#FFF3F6',
              borderWidth: 1,
              borderColor: '#FE84A8',
            }]} {...inputProps}
        />
        {
          rightIcon && <View style={styles.rightActionContainer}>
            <TouchableOpacity
              onPress={() => {
                onRightIconPress();
              }}
            >
              {rightIcon}
            </TouchableOpacity>
          </View>
        }
      </TextInputContainer>

      {
        (errorMessage) ? <InputLabel style={[labelStyle, { color: '#CB6A86', padding: 5, }]}>
          {errorMessage}
        </InputLabel>
          :
          null
      }
    </View>
  );
}

export default forwardRef(Input)

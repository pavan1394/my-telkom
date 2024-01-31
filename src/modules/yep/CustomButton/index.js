import React from "react";
import styles, { CustomButtomWrapper, CustomButtomText } from "./styles";

const CustomButton = ({ title, bgColor, onPress, textColor, borderColor, buttonStyles = {}, titleStyles = {} }) => {
  return (
    <CustomButtomWrapper
      onPress={onPress}
      underlayColor={bgColor}
      bgColor={bgColor}
      borderColor={borderColor}
      style={[styles.customButtomWrapper, { ...buttonStyles }]}
    >
      <CustomButtomText
        textColor={textColor}
        style={[styles.customButtomText,{ ...titleStyles }]}
      >
        {title}
      </CustomButtomText>
    </CustomButtomWrapper>
  );
}

export default CustomButton;

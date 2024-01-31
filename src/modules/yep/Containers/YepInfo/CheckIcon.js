import React from 'react';
import Svg, { Path, Circle } from "react-native-svg"

export default (props) => {

  const {
    style = { color: '#32545A' }
  } = props;

  const { color, ...otherStyles } = style;
  
  return (
    <Svg style={otherStyles} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx="11.5004" cy="11.5629" r="8.93789" stroke={color} strokeWidth="1.37506"/>
      <Path d="M8.42188 12.245L10.0107 13.7137L14.5809 9.40234" stroke={color} strokeWidth="1.37506" strokeLinecap="round"/>
    </Svg>
  )
}
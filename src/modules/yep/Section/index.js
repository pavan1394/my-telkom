import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import Metrics from '../Metrics';

import styles from './styles';

const propTypes = {
  verticalCenter: PropTypes.bool,
  horizontalCenter: PropTypes.bool,
  children: PropTypes.node,
};

const defaultProps = {
  resizeMode: 'cover',
};

const Section = ({
  verticalCenter,
  verticalEnd,
  horizontalCenter,
  padded,
  children,
  style,
  contentContainerStyle,
  imageURI,
  resizeMode,
}) => {
  const verticalCenterStyles = verticalCenter && {
    justifyContent: 'center',
  };
  const verticalEndStyles = verticalEnd && {
    justifyContent: 'flex-end',
  };
  const horizontalCenterStyles = horizontalCenter && {
    alignItems: 'center',
  };

  const paddingStyle = padded && {
    paddingHorizontal: Metrics.materialUnits(3),
    paddingVertical: Metrics.materialUnits(3),
  };

  return (
    <View style={[styles.container, verticalCenterStyles, horizontalCenterStyles, style]}>
      {imageURI && (
        <Image
          source={imageURI}
          style={[styles.image, resizeMode ? {resizeMode: resizeMode} : null]}
        />
      )}

      <View
        style={[
          styles.nestedContainer,
          verticalCenterStyles,
          verticalEndStyles,
          horizontalCenterStyles,
          paddingStyle,
          contentContainerStyle,
        ]}>
        {children}
      </View>
    </View>
  );
};

Section.propTypes = propTypes;
Section.defaultProps = defaultProps;

export default Section;

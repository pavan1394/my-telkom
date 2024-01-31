import Dimensions from './Dimensions';
/**
 * This file contains metric values that are global to the application.
 */

// Examples of metrics you can define:
const hairline = 1;
const tiny = 4;
const small = tiny * 2; // 10
const normal = tiny * 3; // 15
const medium = normal * 2; // 30
const large = normal * 3; // 45

// START USING MATERIAL UNITS FOR PADDING AND MARGIN
// One material unit equals 8 density independent pixels
// typical usage = materialUnits(.5), materialUnits(1), materialUnits(2), etc.
const materialUnits = (value) => {
  if (!value) {
    return 8;
  }
  return 8 * value;
};

// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

export default {
  materialUnits,
  hairline,
  tiny,
  small,
  normal,
  medium,
  large,
  bottomMargin: {
    marginBottom: normal,
  },
  mediumBottomMargin: {
    marginBottom: medium,
  },

  tinyVerticalMargin: {
    marginVertical: tiny,
  },
  smallVerticalMargin: {
    marginVertical: small,
  },
  verticalMargin: {
    marginVertical: normal,
  },
  mediumVerticalMargin: {
    marginVertical: medium,
  },

  tinyHorizontalMargin: {
    marginHorizontal: tiny,
  },
  smallHorizontalMargin: {
    marginHorizontal: small,
  },
  horizontalMargin: {
    marginHorizontal: normal,
  },
  mediumHorizontalMargin: {
    marginHorizontal: medium,
  },

  tinyHorizontalPadding: {
    paddingHorizontal: tiny,
  },
  smallHorizontalPadding: {
    paddingHorizontal: small,
  },
  horizontalPadding: {
    paddingHorizontal: normal,
  },
  mediumHorizontalPadding: {
    paddingHorizontal: medium,
  },

  tinyVerticalPadding: {
    paddingVertical: tiny,
  },
  smallVerticalPadding: {
    paddingVertical: small,
  },
  verticalPadding: {
    paddingVertical: normal,
  },
  mediumVerticalPadding: {
    paddingVertical: medium,
  },
  largeVerticalPadding: {
    paddingVertical: large,
  },
  largeHorizontalPadding: {
    paddingHorizontal: large,
  },
};

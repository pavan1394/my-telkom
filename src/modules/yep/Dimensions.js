import {Dimensions} from 'react-native';

const dimensions = {};
const {width, height} = Dimensions.get('window');

Dimensions.addEventListener('change', ({window, screen}) => {
  dimensions.window = window;
});

dimensions.window = {
  width,
  height,
};

dimensions.pHeight = (percentage) => {
  return (dimensions.window.height / 100) * percentage;
};

dimensions.pWidth = (percentage) => {
  return (dimensions.window.width / 100) * percentage;
};

export default dimensions;

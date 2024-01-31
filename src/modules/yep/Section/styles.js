import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    position: 'relative',
    backgroundColor: 'transparent',
  },

  nestedContainer: {
    flex: 1,
    width: '100%',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default styles;

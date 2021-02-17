import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: Math.round((Dimensions.get('screen').width * 30) / 100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Math.round((Dimensions.get('screen').width * 40) / 100),
    height: Math.round((Dimensions.get('screen').width * 20) / 100),
  },
});
export default styles;

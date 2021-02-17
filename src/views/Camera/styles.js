import {StyleSheet, Dimensions} from 'react-native';
import Commons from '../../theme/commons';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: `${Commons.color.primary}`,
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  viewButtons: {
    flexDirection: 'row',
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    flex: 1,
  },
});

export default styles;

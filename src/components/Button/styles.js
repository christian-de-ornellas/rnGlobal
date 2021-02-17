import {StyleSheet} from 'react-native';
import Commons from '../../theme/commons';

const styles = StyleSheet.create({
  button: {
    backgroundColor: `${Commons.color.primary}`,
    paddingBottom: 7,
    paddingTop: 7,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  font: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;

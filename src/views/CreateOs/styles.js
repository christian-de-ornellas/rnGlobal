import {StyleSheet} from 'react-native';
import Commons from '../../theme/commons';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  checkbox: {
    flexDirection: 'row',
    backgroundColor: `${Commons.color.secodary}`,
    borderColor: `${Commons.color.secodary}`,
  },
  selectorStatusContainer: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: `${Commons.color.primary}`,
    margin: 10,
  },
  selectorStatus: {
    color: `${Commons.color.primary}`,
  },
});
export default styles;

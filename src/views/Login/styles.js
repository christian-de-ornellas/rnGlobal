import {StyleSheet, Dimensions} from 'react-native';
import Commons from '../../theme/commons';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  content: {
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    height: Math.round((Dimensions.get('screen').width * 70) / 100),
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 50,
    color: `${Commons.color.secodary}`,
    borderColor: `${Commons.color.primary}`,
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    marginBottom: 20,
  },
  button: {
    backgroundColor: `${Commons.color.secodary}`,
  },
});
export default styles;

export const Container = styled(LinearGradient).attrs({
  colors: [`${Commons.color.primary}`, `${Commons.color.info}`],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

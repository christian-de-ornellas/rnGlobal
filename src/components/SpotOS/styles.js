import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  spotText: {
    justifyContent: 'center',
    flex: 4,
  },
  font: {
    margin: 5,
  },
  fontOS: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  primary: {
    flexDirection: 'row',
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    height: 100,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  secondary: {
    flexDirection: 'row',
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    height: 100,
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#ccc',
  },
});

export default styles;

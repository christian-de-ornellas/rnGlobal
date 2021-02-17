import {StyleSheet, Dimensions} from 'react-native';
import Commons from '../../theme/commons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  headDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    fontSize: 20,
    color: '#000',
  },
  client: {
    marginTop: 10,
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#ddd',
    elevation: 5,
  },
  detailsClient: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleInformation: {
    color: `${Commons.color.primary}`,
  },
  fontPrimary: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
    marginBottom: 5,
  },
  font: {
    fontSize: 17,
    marginBottom: 5,
  },
  viewButtons: {
    flexDirection: 'row',
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    height: 75,
  },
  Button: {
    flex: 1,
    height: '100%',
  },
  detailsAddress: {
    flex: 2,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  numberAddress: {
    flexDirection: 'row',
  },
  Header: {
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    flex: 1
  },
  Body: {
    width: Math.round((Dimensions.get('screen').width * 90) / 100),
    flex: 3,
    justifyContent: "space-between",
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontSize: 20,
  },
});

export default styles;

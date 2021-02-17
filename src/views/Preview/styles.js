import {StyleSheet, Dimensions} from 'react-native';
import Commons from '../../theme/commons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    height: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  titleInformation: {
    color: `${Commons.color.primary}`,
  },
  fontPrimary: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  font: {
    fontSize: 15,
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
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 20,
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  adequacy: {
    alignItems: 'flex-start',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: `${Commons.color.primary}`,
  },
  viewAdequacy: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  adequacyItens: {
    fontSize: 15,
    marginRight: 10,
  },
});
export default styles;

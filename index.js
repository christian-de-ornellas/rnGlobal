import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
// eslint-disable-next-line no-unused-vars
import StatusBarAndroid from './src/settings/StatusBarAndroid';
AppRegistry.registerComponent(appName, () => App);

import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  // https://github.com/facebook/react-native/issues/19410

  require('intl');
  require('intl/locale-data/jsonp/en-US');
}

import { registerRootComponent } from 'expo';




import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

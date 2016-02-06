'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import WelcomeView from './app/components/WelcomeView';
import AppToolBar  from './app/components/AppToolBar';

class HelloReact extends Component {
  render() {
    return (
      <View style={styles.app}>
        <AppToolBar />
        <WelcomeView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
  }
});

AppRegistry.registerComponent('HelloReact', () => HelloReact);

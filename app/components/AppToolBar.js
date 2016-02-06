'use strict';

import React, {
  Component,
  StyleSheet,
  ToolbarAndroid
} from 'react-native';

class AppToolBar extends Component {
  render() {
    return (
      <ToolbarAndroid
        style={styles.toolbar}
        title="Lerne Deutsch" />
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flex: .1,
    backgroundColor: '#95a5a6',
  }
});

module.exports = AppToolBar;

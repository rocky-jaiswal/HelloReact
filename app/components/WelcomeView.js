'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';

const REQUEST_URL = "http://rockyj.in/phrases.json";

class WelcomeView extends Component {
  constructor(props) {
    super(props);
    this.phrases = {};
    this.phraseKeys = [];
    this.state = {
      loading: true,
      meaning_style: 'hidden',
      counter: 0,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.phrases = responseData;
        this.phraseKeys = _.keys(this.phrases);
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.phrases = {error: "Error connecting to server!!"};
        this.phraseKeys = _.keys(this.phrases);
        this.setState({ loading: false });
      })
      .done();
  }

  incCounter() {
    let newCounter = this.state.counter + 1;
    if(newCounter === this.phraseKeys.length) newCounter = 0;
    this.setState({ counter: newCounter });
  }

  decCounter() {
    let newCounter = this.state.counter - 1;
    if(newCounter === -1) newCounter = this.phraseKeys.length - 1;
    this.setState({ counter: newCounter });
  }

  showMeaning() {
    this.setState({ meaning_style: 'phrase' });
  }

  showPrev() {
    this.setState({ meaning_style: 'hidden' });
    this.decCounter();
  }

  showNext() {
    this.setState({ meaning_style: 'hidden' });
    this.incCounter();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text style={styles.phrase}>
          Loading data...
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.phrase}>
            {this.phraseKeys[this.state.counter]}
          </Text>
          <Text style={styles[this.state.meaning_style]}>
            {this.phrases[this.phraseKeys[this.state.counter]]}
          </Text>
        </View>
        <View style={styles.navigation}>
          <TouchableHighlight onPress={()=>this.showPrev()} style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Previous</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.showMeaning()} style={styles.buttonWrapper}>
            <View style={styles.button2}>
              <Text style={styles.buttonText}>Show</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>this.showNext()} style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: .8,
  },
  main: {
    flex: .9,
    margin: 20,
  },
  phrase: {
    flex: .5,
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#3498db',
  },
  hidden: {
    flex: .5,
    opacity: 0,
  },
  navigation: {
    flex: .1,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
  },
  button: {
    padding: 10,
    backgroundColor: '#ecf0f1',
  },
  button2: {
    padding: 10,
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  }
});

module.exports = WelcomeView;

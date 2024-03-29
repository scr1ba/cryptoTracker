import React, {Component} from 'react';
import {TextInput, StyleSheet, Platform, View} from 'react-native';
import Colors from '../../res/colors';

class CoinSearch extends Component {
  state = {
    query: '',
  };

  handleText = (query) => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const query = this.state;

    return (
      <View>
        <TextInput
          style={[
            styles.textInput,
            Platform.OS == 'ios'
              ? styles.textInputIos
              : styles.textInputAndroid,
          ]}
          onChangeText={this.handleText}
          value={query}
          placeholder={'Search coin'}
          placeholderTextColor={'#fff'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: Colors.white,
  },
  textInputAndroid: {
    borderWidth: 2,
    borderBottomColor: Colors.zircon,
  },
  textInputIos: {
    margin: 8,
    borderRadius: 8,
  },
});

export default CoinSearch;

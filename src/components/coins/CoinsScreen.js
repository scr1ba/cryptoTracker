import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

class CoinsScreen extends Component {
  handlePress = () => {
    console.log('went to detail view', this.props);
    this.props.navigation.navigate('CoinDetail');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Coins Screen</Text>
        <Pressable onPress={this.handlePress} style={styles.btn}>
          <Text>Ir a detail</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
  },
});
export default CoinsScreen;

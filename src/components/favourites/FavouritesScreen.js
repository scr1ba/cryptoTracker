import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FavouritesEmptyState from './FavouritesEmptyState';
import Colors from '../../res/colors';

class FavouritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavouritesEmptyState />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavouritesScreen;

import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FavouritesEmptyState from './FavouritesEmptyState';
import CoinsItem from '../coins/CoinsItem';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';

class FavouritesScreen extends Component {
  state = {
    favourites: [],
  };

  getFavourites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();

      const keys = allKeys.filter((key) => key.includes('favourite-'));

      const favs = await Storage.instance.getAll(keys);

      const favourites = favs.map((fav) => JSON.parse(fav[1]));

      this.setState({favourites});

      console.log(favourites);
    } catch (err) {
      console.log('getFavourites err', err);
    }
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', coin);
  };

  componentDidMount() {
    this.props.navigation.addListener('focus', this.getFavourites);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavourites);
  }

  render() {
    const {favourites} = this.state;

    return (
      <View style={styles.container}>
        {favourites.length === 0 ? (
          <FavouritesEmptyState />
        ) : (
          <FlatList
            data={favourites}
            renderItem={({item}) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        )}
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

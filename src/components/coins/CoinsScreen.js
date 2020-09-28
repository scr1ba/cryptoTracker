import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinSearch';
import Colors from 'cryptoTracker/src/res/colors';
import CoinSearch from './CoinSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount = async () => {
    await this.getCoins();
  };

  getCoins = async () => {
    this.setState({loading: true});

    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: coins.data, allCoins: coins.data, loading: false});
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', {coin});
  };

  handleSearch = (query) => {
    const {allCoins} = this.state;
    const coinsFiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
        coin.nameid.toLowerCase().includes(query.toLowerCase())
      );
    });

    this.setState({coins: coinsFiltered});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color={Colors.white}
            size="large"
          />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => this.handlePress(item)} />
          )}
        />
        <Text>Coins Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
  },
  loader: {
    marginTop: 60,
  },
});
export default CoinsScreen;

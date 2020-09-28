import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import CoinMarketItem from './CoinMarketItem';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavourite: false,
  };

  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };

  getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.com/api/coin/markets/?id=${coinId}`;

    const markets = await Http.instance.get(url);

    this.setState({markets});
  };

  toggleFavourite = () => {
    if (this.state.isFavourite) {
      this.removeFavourite();
    } else {
      this.addFavourite();
    }
  };

  removeFavourite = () => {
    Alert.alert('Remove favourite', 'Are you sure?', [
      {text: 'cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'remove',
        onPress: async () => {
          const key = `favourite-${this.state.coin.id}`;
          await Storage.instance.remove(key);

          this.setState({isFavourite: false});
        },
        style: 'destructive',
      },
    ]);
  };

  addFavourite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favourite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);

    if (stored) {
      this.setState({isFavourite: true});
    }
  };

  getFavourite = async () => {
    try {
      const key = `favourite-${this.state.coin.id}`;

      const favStr = await Storage.instance.get(key);

      console.log('fav', favStr);
      if (favStr != null) {
        this.setState({isFavourite: true});
      }
    } catch (err) {
      console.log('getFavourite err', err);
    }
  };

  componentDidMount() {
    const {coin} = this.props.route.params;

    this.props.navigation.setOptions({title: coin.name});
    this.getMarkets(coin.id);
    console.log(this.state.markets);
    this.setState({coin}, () => {
      this.getFavourite();
    });
  }

  render() {
    const {coin, markets, isFavourite} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <View style={styles.row}>
            <Image
              style={styles.iconImg}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text style={styles.titleText}>{coin.name}</Text>
          </View>
          <View />
          <Pressable
            onPress={this.toggleFavourite}
            style={[
              styles.btnFavourite,
              isFavourite ? styles.btnRemoveFavourite : styles.btnAddFavourite,
            ]}>
            <Text style={styles.btnFavouriteText}>
              {isFavourite ? 'Remove favourite' : 'Add favourite'}
            </Text>
          </Pressable>
        </View>
        <SectionList
          style={styles.section}
          sections={this.getSections(coin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={styles.marketsTitle}>Markets</Text>
        <FlatList
          horizontal={true}
          style={styles.list}
          keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  sectionHeader: {
    color: Colors.white,
    backgroundColor: 'rgba(0,0,0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  marketsTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavourite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavouriteText: {
    color: Colors.white,
  },
  btnAddFavourite: {
    backgroundColor: Colors.picton,
  },
  btnRemoveFavourite: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;

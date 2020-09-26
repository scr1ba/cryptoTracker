import React from 'react';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';
import colors from '../../res/colors';

const CoinsItem = ({item, onPress}) => {
  let getImgArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('cryptoTracker/src/assets/arrow_up.png');
    } else {
      return require('cryptoTracker/src/assets/arrow_down.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.percentChange}>{'' + item.percent_change_1h}</Text>
        <Image source={getImgArrow()} style={styles.imageIcon} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: colors.zircon,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  priceText: {
    color: colors.white,
    fontSize: 14,
  },
  symbolText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: colors.white,
    fontSize: 14,
    marginRight: 16,
  },
  percentChange: {
    color: colors.white,
    fontSize: 12,
    marginRight: 8,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;

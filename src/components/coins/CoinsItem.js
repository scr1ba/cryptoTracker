import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CoinsItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{item.symbol}</Text>
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.change}>{'' + item.percent_change_1h}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default CoinsItem;

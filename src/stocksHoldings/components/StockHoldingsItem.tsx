import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ComputedUserHolding} from '../types';
import StocksUtils from '../helpers/StockUtils';

const StockHoldingsItem = ({item}: {item: ComputedUserHolding}) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.symbol}>{item.symbol}</Text>
      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
    <View style={styles.rightContainer}>
      <View style={[styles.valueContainer, {marginBottom: 8}]}>
        <Text style={styles.ltp}>LTP: </Text>
        <Text style={styles.ltpValue}>
          {StocksUtils.getFormattedAmount(item.ltp)}
        </Text>
      </View>
      <View style={styles.valueContainer}>
        <Text style={styles.ltp}>P/L: </Text>
        <Text style={styles.ltpValue}>
          {StocksUtils.getFormattedAmount(item.pAndL)}
        </Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  rightContainer: {alignItems: 'flex-end'},
  valueContainer: {flexDirection: 'row'},
  symbol: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
    color: 'black',
  },
  quantity: {
    fontSize: 13,
    color: 'black',
  },
  ltp: {
    fontSize: 13,
    color: 'black',
  },
  ltpValue: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
  pl: {
    fontSize: 13,
    color: 'black',
  },
  plValue: {
    fontSize: 13,
    fontWeight: '600',
    color: 'black',
  },
});

export default StockHoldingsItem;

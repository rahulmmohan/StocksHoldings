import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const StockHoldingsSummary = ({
  holdingSummary,
  isSummaryExpanded,
  toggleView,
}: {
  holdingSummary: {
    totalInvestment: number;
    totalPandL: number;
    todaysTotalPandL: number;
    totalCurrentValue: number;
  };
  isSummaryExpanded: boolean;
  toggleView: () => void;
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={{
        height: 32,
        paddingTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={toggleView}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 800,
          lineHeight: 24,
          textAlignVertical: 'center',
        }}>
        ^
      </Text>
    </TouchableOpacity>
    <View
      style={[styles.summaryView, {height: isSummaryExpanded ? 'auto' : 0}]}>
      <View style={[styles.summaryItem, {marginTop: 16}]}>
        <Text style={styles.summaryTitle}>Current Value: </Text>
        <Text
          style={
            styles.summaryValue
          }>{`₹ ${holdingSummary.totalCurrentValue}`}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryTitle}>Total Investment: </Text>
        <Text
          style={
            styles.summaryValue
          }>{`₹ ${holdingSummary.totalInvestment}`}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryTitle}>Today's Profit & Loss: </Text>
        <Text
          style={
            styles.summaryValue
          }>{`₹ ${holdingSummary.todaysTotalPandL}`}</Text>
      </View>
      <View style={[styles.summaryItem, {marginTop: 12, marginBottom: 24}]}>
        <Text style={styles.summaryTitle}>Profit & Loss: </Text>
        <Text
          style={styles.summaryValue}>{`₹ ${holdingSummary.totalPandL}`}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
  },
  summaryView: {paddingHorizontal: 16},
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: 'black',
  },
  summaryValue: {
    fontSize: 14,
    color: 'black',
  },
});

export default StockHoldingsSummary;

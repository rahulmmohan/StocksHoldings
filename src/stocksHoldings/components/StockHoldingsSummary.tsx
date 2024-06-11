import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SummaryViewProps} from '../types';

const StockHoldingsSummary = ({
  holdingSummary,
  isSummaryExpanded,
  toggleView,
}: SummaryViewProps) => {
  const getSummaryItem = (
    title: string,
    value: number,
    style: ViewStyle = {},
  ) => {
    return (
      <View style={[styles.summaryItem, style]}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={styles.summaryValue}>{`₹ ${value}`}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.expandButton} onPress={toggleView}>
        <Image
          style={[
            styles.expandArrow,
            {transform: [{rotate: isSummaryExpanded ? '0deg' : '180deg'}]},
          ]}
          source={{
            uri: 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/down-arrow-8.png',
          }}
        />
      </TouchableOpacity>
      <View
        style={[styles.summaryView, {height: isSummaryExpanded ? 'auto' : 0}]}>
        {getSummaryItem('Current Value: ', holdingSummary.totalCurrentValue, {
          marginTop: 16,
        })}
        {getSummaryItem('Total Investment: ', holdingSummary.totalInvestment)}
        {getSummaryItem(
          "Today's Profit & Loss: ",
          holdingSummary.todaysTotalPandL,
        )}
        {getSummaryItem('Profit & Loss: ', holdingSummary.totalPandL, {
          marginTop: 12,
          marginBottom: 24,
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
  },
  summaryView: {
    paddingHorizontal: 16,
  },
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
  expandArrow: {width: 32, height: 32, tintColor: 'rgb(114,20,121)'},
  expandButton: {
    height: 32,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StockHoldingsSummary;

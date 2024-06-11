import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import StocksRepo from '../api/StocksRepo';
import {ComputedUserHolding} from '../types';
import StockHoldingsItem from '../components/StockHoldingsItem';
import StocksUtils from '../helpers/StockUtils';
import StockHoldingsSummary from '../components/StockHoldingsSummary';

const StockHoldingsScreen = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [holdings, setHoldings] = useState<ComputedUserHolding[]>([]);
  const [holdingSummary, setHoldingSummary] = useState({
    totalInvestment: 0,
    totalPandL: 0,
    todaysTotalPandL: 0,
    totalCurrentValue: 0,
  });
  const [isSummaryExpanded, setSummaryExpanded] = useState(false);

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = () => {
    setIsLoading(true);
    StocksRepo.getStocksHoldings()
      .then(data => {
        const {
          computedHoldings,
          totalInvestment,
          totalPandL,
          todaysTotalPandL,
          totalCurrentValue,
        } = StocksUtils.getComputedHoldingValues(data.userHolding);
        setHoldings(computedHoldings);
        setHoldingSummary({
          totalInvestment,
          totalPandL,
          todaysTotalPandL,
          totalCurrentValue,
        });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleView = () => {
    setSummaryExpanded(!isSummaryExpanded);
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const errorView = () => (
    <View style={styles.errorView}>
      <Text style={styles.errorText}>Something went wrong!</Text>
      <Button
        title="Try Again"
        onPress={() => {
          getStocks();
        }}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            style={styles.loading}
            color={'black'}
            animating={isLoading}
          />
        ) : isError ? (
          errorView()
        ) : (
          <>
            <FlatList
              data={holdings}
              renderItem={({item}) => <StockHoldingsItem item={item} />}
              keyExtractor={item => item.symbol}
              ItemSeparatorComponent={renderSeparator}
            />
            <StockHoldingsSummary
              holdingSummary={holdingSummary}
              isSummaryExpanded={isSummaryExpanded}
              toggleView={toggleView}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#cccccc',
  },
  separator: {height: 1, marginHorizontal: 16, backgroundColor: '#ddd'},
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {fontSize: 16, marginBottom: 8},
});

export default StockHoldingsScreen;

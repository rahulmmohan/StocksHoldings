import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import StocksRepo from '../api/StocksRepo';
import {ComputedUserHolding} from '../types';
import StockHoldingsItem from '../components/StockHoldingsItem';
import StocksUtils from '../helpers/StockUtils';
import StockHoldingsSummary from '../components/StockHoldingsSummary';
const data = {
  data: {
    userHolding: [
      {
        symbol: 'MAHABANK',
        quantity: 990,
        ltp: 38.05,
        avgPrice: 35,
        close: 40,
      },
      {
        symbol: 'ICICI',
        quantity: 100,
        ltp: 118.25,
        avgPrice: 110,
        close: 105,
      },
      {
        symbol: 'SBI',
        quantity: 150,
        ltp: 550.05,
        avgPrice: 501,
        close: 590,
      },
      {
        symbol: 'TATA STEEL',
        quantity: 200,
        ltp: 137,
        avgPrice: 110.65,
        close: 100.05,
      },
      {
        symbol: 'INFOSYS',
        quantity: 121,
        ltp: 1305,
        avgPrice: 1245.45,
        close: 1103.85,
      },
      {
        symbol: 'AIRTEL',
        quantity: 415,
        ltp: 340.75,
        avgPrice: 370.1,
        close: 290,
      },
      {
        symbol: 'UCO BANK',
        quantity: 2000,
        ltp: 18.05,
        avgPrice: 28.15,
        close: 22.25,
      },
      {
        symbol: 'NHPC',
        quantity: 900,
        ltp: 88.05,
        avgPrice: 80.75,
        close: 70.65,
      },
      {
        symbol: 'SJVN',
        quantity: 400,
        ltp: 113.05,
        avgPrice: 105,
        close: 110,
      },
      {
        symbol: 'PNB BANK',
        quantity: 100,
        ltp: 132.05,
        avgPrice: 100,
        close: 145.55,
      },
      {
        symbol: 'RELIANCE',
        quantity: 50,
        ltp: 2500,
        avgPrice: 2450,
        close: 2600,
      },
      {
        symbol: 'HDFC',
        quantity: 75,
        ltp: 1800.25,
        avgPrice: 1750,
        close: 1700,
      },
      {
        symbol: 'MARUTI',
        quantity: 30,
        ltp: 7000,
        avgPrice: 6800,
        close: 7200,
      },
      {
        symbol: 'TCS',
        quantity: 150,
        ltp: 3500,
        avgPrice: 3400,
        close: 3300,
      },
      {
        symbol: 'HCL',
        quantity: 200,
        ltp: 1000,
        avgPrice: 980,
        close: 1050,
      },
      {
        symbol: 'WIPRO',
        quantity: 300,
        ltp: 500,
        avgPrice: 480,
        close: 520,
      },
      {
        symbol: 'BPCL',
        quantity: 80,
        ltp: 400,
        avgPrice: 380,
        close: 420,
      },
      {
        symbol: 'HPCL',
        quantity: 60,
        ltp: 300,
        avgPrice: 290,
        close: 320,
      },
      {
        symbol: 'ONGC',
        quantity: 120,
        ltp: 150,
        avgPrice: 140,
        close: 160,
      },
      {
        symbol: 'IOC',
        quantity: 200,
        ltp: 120,
        avgPrice: 110,
        close: 130,
      },
      {
        symbol: 'HINDALCO',
        quantity: 150,
        ltp: 400,
        avgPrice: 380,
        close: 420,
      },
      {
        symbol: 'ADANI PORTS',
        quantity: 500,
        ltp: 800,
        avgPrice: 780,
        close: 820,
      },
      {
        symbol: 'CIPLA',
        quantity: 100,
        ltp: 900,
        avgPrice: 880,
        close: 920,
      },
      {
        symbol: 'JSW STEEL',
        quantity: 250,
        ltp: 600,
        avgPrice: 580,
        close: 620,
      },
      {
        symbol: 'AXIS BANK',
        quantity: 300,
        ltp: 700,
        avgPrice: 680,
        close: 720,
      },
    ],
  },
};
const StockHoldingsScreen = (): React.JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [holdings, setHoldings] = useState<ComputedUserHolding[]>([]);
  const [holdingSummary, setHoldingSummary] = useState({
    totalInvestment: 0,
    totalPandL: 0,
    todaysTotalPandL: 0,
    totalCurrentValue: 0,
  });
  const [isSummaryExpanded, setSummaryExpanded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getStocks();
    }, 2000);
  }, []);

  const getStocks = () => {
    StocksRepo.getStocksHoldings().then(res => {
      console.log(res);
    });
    const {
      computedHoldings,
      totalInvestment,
      totalPandL,
      todaysTotalPandL,
      totalCurrentValue,
    } = StocksUtils.getComputedHoldingValues(data.data.userHolding);
    setHoldings(computedHoldings);
    setHoldingSummary({
      totalInvestment,
      totalPandL,
      todaysTotalPandL,
      totalCurrentValue,
    });
    setIsLoading(false);
  };

  const toggleView = () => {
    setSummaryExpanded(!isSummaryExpanded);
  };

  const renderSeparator = () => <View style={styles.separator} />;

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
});

export default StockHoldingsScreen;

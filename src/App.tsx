import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import StockHoldings from './stocksHoldings/screens/StockHoldingsScreen';
import {StyleSheet, Text, View} from 'react-native';
const Stack = createNativeStackNavigator();

const Header = props => {
  return (
    <View>
      <Text style={styles.headerText}>{props.name}</Text>
    </View>
  );
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StockHoldings"
          component={StockHoldings}
          options={{
            title: '',
            headerLeft: () => <Header name="Upstox Holding" />,
            headerStyle: {
              backgroundColor: 'rgb(114,20,121)',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});

export default App;

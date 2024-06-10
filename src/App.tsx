import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import StockHoldings from './stocksHoldings/screens/StockHoldingsScreen';
import {Text} from 'react-native';
const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Text style={{backgroundColor: 'red', alignSelf: 'flex-start'}}>
      Upstox Holdings
    </Text>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StockHoldings"
          component={StockHoldings}
          options={{headerTitle: props => <LogoTitle {...props} />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

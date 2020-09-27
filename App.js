import React from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CoinsStack from './src/components/coins/CoinsStack';
import FavouritesStack from './src/components/favourites/FavouritesStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from './src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: Colors.white,
          style: {
            backgroundColor: Colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="Coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('cryptoTracker/src/assets/bank.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Favourites"
          component={FavouritesStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Image
                style={{tintColor: color, width: size, height: size}}
                source={require('cryptoTracker/src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;

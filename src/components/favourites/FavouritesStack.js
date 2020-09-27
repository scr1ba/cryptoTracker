import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavouritesScreen from './FavouritesScreen';
import Colors from '../../res/colors';

const Stack = createStackNavigator();

const FavouritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
    </Stack.Navigator>
  );
};

export default FavouritesStack;

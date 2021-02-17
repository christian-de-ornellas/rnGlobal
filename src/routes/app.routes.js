import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ListOs from '../views/ListOs';
import DetailsOS from '../views/DetailsOS';
import fotoOS from '../views/Camera';
import createOs from '../views/CreateOs';
import Preview from '../views/Preview';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Stack.Screen name="ListOs" component={ListOs} />
      <Stack.Screen name="DetailOS" component={DetailsOS} />
      <Stack.Screen name="fotoOS" component={fotoOS} />
      <Stack.Screen name="createOs" component={createOs} />
      <Stack.Screen name="Preview" component={Preview} />
    </Stack.Navigator>
  );
};
export default AppRoutes;

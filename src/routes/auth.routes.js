import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../views/Login';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{gestureEnabled: false, headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
export default AuthRoutes;

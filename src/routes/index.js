import React from 'react';

import {useAuth} from '../contexts/AuthContext';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {View, ActivityIndicator} from 'react-native';

import Commons from '../theme/commons';

const Routes = () => {
  const {user, loading, username} = useAuth();
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Commons.color.danger} />
      </View>
    );
  }

  return user === true ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './contexts/AuthContext';
import Routes from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

import React, {useEffect, useState, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import AuthService from '../services/AuthService';
import getRealm from '../services/realm';

const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logged = async () => {
    try {
      const realm = await getRealm();
      setLoading(true);
      let findUser = realm.objects('User');
      if (findUser.length > 0) {
        setUser(true);
        return setLoading(false);
      } else {
        setUser(false);
        return setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    logged();
  }, ['']);

  const saveSession = async (data) => {
    const realm = await getRealm();
    realm.write(() => {
      realm.create('User', data);
    });
    realm.close();
  };

  const signIn = async () => {
    try {
      const response = await AuthService.signIn(username, password);

      if (response.messageCode === 200) {
        saveSession({username, password});
        return setUser(true);
      } else {
        return Alert.alert('Error de autenticação!', 'Usuário e senha estão incorretos, por favor tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error inesperado!', 'Não conseguimos validar as suas informações, por favor tente novamente.');
    }
  };

  const signOut = async () => {
    try {
      const realm = await getRealm();
      setLoading(true);

      realm.write(() => {
        realm.delete(realm.objects('User'));
      });
      setUser(false);
      return setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{user, loading, setLoading, signIn, signOut, setUsername, username, setPassword, password}}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  const {user, setLoading, loading, signIn, setUsername, username, setPassword, password, signOut} = context;
  return {user, setLoading, loading, signIn, setUsername, username, setPassword, password, signOut};
}

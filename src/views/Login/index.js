import React, {useState} from 'react';
import {SafeAreaView, KeyboardAvoidingView, Platform, View} from 'react-native';
import styles, {Container} from './styles';
import Header from '../../components/Header';
import Commons from '../../theme/commons';
import {Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '../../assets/images/logo2-fundo-transparente.png';
import {useAuth} from '../../contexts/AuthContext';

const Login = () => {
  const {loading, setLoading, signIn, username, setUsername, password, setPassword} = useAuth();

  function handleSign() {
    setLoading(true);
    signIn()
      .then((_) => setLoading(false))
      .catch((err) => setLoading(false));
  }

  return (
    <Container>
      <SafeAreaView>
        <Header source={Logo} />
        <View style={styles.content}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Input
              inputContainerStyle={{borderColor: `${Commons.color.secodary}`}}
              placeholderTextColor={`${Commons.color.secodary}`}
              inputStyle={{color: `${Commons.color.secodary}`}}
              placeholder="USUÁRIO"
              value={username}
              onChangeText={(u) => setUsername(u)}
              leftIcon={<Icon name="account-circle" size={24} color={Commons.color.secodary} />}
              keyboardType="name-phone-pad"
              autoCapitalize="none"
            />
            <Input
              inputContainerStyle={{borderColor: `${Commons.color.secodary}`}}
              placeholderTextColor={`${Commons.color.secodary}`}
              inputStyle={{color: `${Commons.color.secodary}`}}
              placeholder="SENHA"
              value={password}
              onChangeText={(p) => setPassword(p)}
              leftIcon={<Icon name="lock" size={24} color={Commons.color.secodary} />}
              keyboardType="name-phone-pad"
              secureTextEntry={true}
            />
            <View style={styles.button}>
              <Button
                type="outline"
                buttonStyle={{borderColor: `${Commons.color.secodary}`}}
                titleStyle={{color: `${Commons.color.primary}`}}
                icon={<Icon name="send" size={15} color={`${Commons.color.primary}`} />}
                title=" Entrar"
                onPress={handleSign}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default Login;

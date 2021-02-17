import React from 'react';
import {Container, ButtonLogout} from './styles';

import {useAuth} from '../../contexts/AuthContext';

const Logout = () => {
  const {signOut} = useAuth();
  return (
    <Container>
      <ButtonLogout onPress={signOut}>SAIR</ButtonLogout>
    </Container>
  );
};

export default Logout;

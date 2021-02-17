import styled from 'styled-components/native';
import Commons from '../../theme/commons';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  background: ${Commons.color.primary};
  border-radius: 10px;
  padding: 6px 20px;
  margin-bottom: 25px;
`;

export const ButtonLogout = styled.Text`
  color: ${Commons.color.secodary};
`;

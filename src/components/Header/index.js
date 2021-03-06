import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';

const Header = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.source} style={styles.logo} />
    </View>
  );
};

export default Header;

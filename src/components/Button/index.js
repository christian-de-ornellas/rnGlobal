import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles.js';

// import { Container } from './styles';

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.font}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

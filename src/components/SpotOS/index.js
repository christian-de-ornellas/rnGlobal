import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Commons from '../../theme/commons';
import styles from './styles';
import {StyleSheet, Dimensions} from 'react-native';

export default function SpotOS(props) {
  function Item({os, tp, dt_vis, st, client, address, number, comp, district, city}) {
    return (
      <View>
        <TouchableOpacity key={os} onPress={() => props.navigation.navigate('DetailOS', {os, tp, dt_vis, st, client, address, number, comp, district, city})}>
          <View style={st != 0 ? styles.secondary : styles.primary}>
            <View style={styles.spotText}>
              <Text style={styles.fontOS}>{os}</Text>
              <Text style={styles.font}>Data: {moment(dt_vis).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.button}>
              <Icon name="navigate-next" size={24} style={{color: `${Commons.color.primary}`}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={props.data}
      status={props.status}
      renderItem={({item}) => (
        <Item
          os={item.os}
          dt_vis={item.dt_vis}
          st={item.st}
          client={item.client}
          address={item.address}
          number={item.number}
          comp={item.comp}
          district={item.district}
          city={item.city}
          tp={item.tp}
        />
      )}
      keyExtractor={(item) => item.os}
    />
  );
}

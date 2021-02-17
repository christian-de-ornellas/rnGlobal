import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert, ActivityIndicator} from 'react-native';
import InspectionService from '../../services/InspectionService';
import moment from 'moment';
import getRealm from '../../services/realm';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Commons from '../../theme/commons';
import styles from './styles';
import StatusService from '../../services/StatusService';
import TypeService from '../../services/TypeService';
import NetInfo from '@react-native-community/netinfo';

export default function DetailsOS(props) {
  const [statusOs, setStatusOs] = useState('');
  const [legends, setLegends] = useState('');
  const [stTest, setStTest] = useState(0);
  const [cacheRealm, setCacheRealm] = useState([]);
  const [cacheStatus, setCacheStatus] = useState([]);
  const [cacheType, setCacheType] = useState([]);
  const [typeOs, setTypeOs] = useState('');
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState([]);
  const [resend, setResend] = useState([]);

  const {os, tp, dt_vis, st, client, address, number, comp, district, city} = props.route.params;

  function isNetwork() {
    return new Promise((resolve, reject) => {
      try {
        setLoading(true);
        NetInfo.fetch().then((state) => {
          setNetwork({type: state.type, connected: state.isConnected});
          if (state.isConnected === true) {
            getCacheStatus().then((c) => cacheStatusData());
            getCacheType().then((c) => cacheTypeData());
          }
          if (state.isConnected === false) {
            cacheStatusData();
            cacheTypeData();
          }
        });
        resolve();
      } catch (e) {
        reject();
        return console.error(e);
      }
    });
  }
  async function saveStorage(schema, data) {
    try {
      const realm = await getRealm();
      realm.write(() => {
        realm.create(schema.toString(), data);
      });
      realm.close();
      return {success: true};
    } catch (error) {
      return console.error(error);
    }
  }

  async function getCacheStatus() {
    try {
      const status = await StatusService.list();
      await removeStorage('Status');
      return status.map((st) => saveStorage('Status', st));
    } catch (e) {
      return console.error(e);
    }
  }

  async function cacheStatusData() {
    try {
      const realm = await getRealm();
      let find = realm.objects('Status');
      return setCacheStatus(find);
    } catch (error) {
      console.error(error);
    }
  }

  async function getCacheType() {
    try {
      const type = await TypeService.find();
      await removeStorage('Type');
      return type.map((tp) => saveStorage('Type', tp));
    } catch (e) {
      return console.error(e);
    }
  }

  async function cacheTypeData() {
    try {
      const realm = await getRealm();
      let find = realm.objects('Type');
      return setCacheType(find);
    } catch (error) {
      console.error(error);
    }
  }

  function filterType(cache) {
    return new Promise((resolve, reject) => {
      try {
        const type = cache.filter((s) => {
          return s.id === st;
        });
        resolve();
        return type.map((s) => setTypeOs(s.nome));
      } catch (e) {
        reject();
        return console.error(e);
      }
    });
  }

  function filterStatus(cache) {
    return new Promise((resolve, reject) => {
      try {
        const status = cache.filter((s) => {
          return s.id === st;
        });
        resolve();
        return status.map((s) => setStatusOs(s.nome));
      } catch (e) {
        reject();
        return console.error(e);
      }
    });
  }

  async function cacheResend() {
    try {
      const realm = await getRealm();
      let find = realm.objects('Resend');
      return setResend(find);
    } catch (error) {
      console.error(error);
    }
  }

  async function removeStorage(schema) {
    try {
      const realm = await getRealm();
      return realm.write(() => {
        realm.delete(realm.objects(schema.toString()));
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function removeRowStorage(schema, os) {
    try {
      const realm = await getRealm();
      return realm.write(() => {
        realm.delete(realm.objectForPrimaryKey(schema, os));
      });
    } catch (e) {
      return console.error(e);
    }
  }

  async function httpPhoto(os, img) {
    try {
      return await InspectionService.syncPhoto(os, img);
    } catch (error) {
      Alert.alert('Erro inesperado!', 'Houve um problema no envio da imagem para o servidor.');
      return console.error(error);
    }
  }

  async function sendPhoto(os, resend) {
    try {
      setLoading(true);
      const filtered = resend.filter((f) => {
        const rule = f.os === os;
        return rule;
      });
      if (network.type === 'wifi') {
        if (filtered.length > 0) {
          return filtered.map((r) => {
            if (r.photoOne != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoOne), 2000);
            }
            if (r.photoTwo != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoTwo), 4000);
            }
            if (r.photoThree != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoThree), 6000);
            }

            if (r.photoFour != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoFour), 8000);
            }

            if (r.photoFive != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoFive), 10000);
            }

            if (r.photoSix != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoSix), 12000);
            }

            if (r.photoSeven != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoSeven), 14000);
            }

            if (r.photoEigth != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoEigth), 16000);
            }

            if (r.photoNine != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoNine), 18000);
            }

            if (r.photoTen != 'sem foto') {
              setTimeout(() => httpPhoto(r.os, r.photoTen), 20000);
            }

            setTimeout(() => removeRowStorage('Resend', r.os).then((r) => setLoading(false)), 22000);
          });
        } else {
          setLoading(false);
          Alert.alert('Ops!', 'Essa inspeção já foi sincronizada!');
        }
      } else {
        setLoading(false);
        Alert.alert('Ops!', 'Para resincronizar as fotos você vai precisar fechar o app, se conectar no WIFI e abrir o app novamente!');
      }
    } catch (e) {
      return console.error(e);
    }
  }
  useEffect(() => {
    isNetwork();
  }, []);

  useEffect(() => {
    cacheResend();
  }, []);

  useEffect(() => {
    filterStatus(cacheStatus).then((f) => setLoading(false));
  }, [cacheStatus]);

  useEffect(() => {
    filterType(cacheType).then((f) => setLoading(false));
  }, [cacheType]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <View style={styles.headDetails}>
          <Text style={styles.headDetails}>OS: {os}</Text>
          <Text style={styles.headDetails}>Data: {moment(dt_vis).format('DD/MM/YYYY')}</Text>
        </View>
        <View style={styles.status}>
          <View>
            <Text style={styles.status}>Status: </Text>
            {cacheStatus.length > 0 && statusOs !== '' ? (
              <Text style={styles.status}>{statusOs}</Text>
            ) : (
              <ActivityIndicator size="small" color={Commons.color.primary} />
            )}
          </View>
          <View>
            <Text style={styles.status}>Tipo: </Text>
            {cacheType.length > 0 && typeOs !== '' ? (
              <Text style={styles.status}>{typeOs}</Text>
            ) : (
              <ActivityIndicator size="small" color={Commons.color.primary} />
            )}
          </View>
        </View>
      </View>

      {st != 0 ? (
        <View style={styles.Body}>
          {loading === true ? (
            <ActivityIndicator size="large" color={Commons.color.danger} />
          ) : (
            <Button
              buttonStyle={{
                backgroundColor: `${Commons.color.primary}`,
                padding: 10,
                borderRadius: 10,
              }}
              titleStyle={{color: `${Commons.color.secodary}`}}
              icon={<Icon name="send" size={20} color={`${Commons.color.secodary}`} />}
              title=" SINCRONIZAR"
              onPress={() => sendPhoto(os, resend)}
            />
          )}
        </View>
      ) : (
        <View style={styles.Body}>
          <View>
            <Text style={styles.titleInformation}>Informações da OS</Text>
            <View style={styles.client}>
              <View style={styles.detailsClient}>
                <Text style={styles.fontPrimary}>NOME:</Text>
                <Text style={styles.font}>{client}</Text>
              </View>

              <View style={styles.detailsClient}>
                <Text style={styles.fontPrimary}>LOGRADOURO:</Text>
                <Text style={styles.font}>{address} </Text>
              </View>

              <View style={styles.detailsClient}>
                <View style={(styles.detailsAddress, styles.numberAddress)}>
                  <Text style={styles.fontPrimary}>Nº:</Text>
                  <Text style={styles.font}> {number}</Text>
                </View>

                <View style={styles.detailsAddress}>
                  <Text style={styles.fontPrimary}>Comp.:</Text>
                  <Text style={styles.font}>{comp}</Text>
                </View>
              </View>

              <View style={styles.detailsClient}>
                <Text style={styles.fontPrimary}>BAIRRO:</Text>
                <Text style={styles.font}>{district}</Text>
              </View>

              <View style={styles.detailsClient}>
                <Text style={styles.fontPrimary}>CIDADE:</Text>
                <Text style={styles.font}>{city}</Text>
              </View>
            </View>
          </View>

          <View style={styles.viewButtons}>
            <View style={styles.Button}>
              <Button
                type="outline"
                buttonStyle={{borderColor: '#ddd', height: '100%'}}
                titleStyle={{color: `${Commons.color.primary}`}}
                icon={<Icon name="send" size={20} color={`${Commons.color.primary}`} />}
                title=" INSPECIONAR"
                onPress={() =>
                  props.navigation.navigate('fotoOS', {...props.route.params, dt_ini: moment().format('DD/MM/YYYY'), h_ini: moment().format('HH:mm')})
                }
              />
            </View>
            <View style={styles.Button}>
              <Button
                type="outline"
                buttonStyle={{borderColor: '#ddd', height: '100%'}}
                titleStyle={{color: `${Commons.color.primary}`}}
                icon={<Icon name="mail" size={20} color={`${Commons.color.primary}`} />}
                title=" SMS"
                onPress={() => Alert.alert('Notificação importante!', 'Em breve também enviaremos sms ao cliente para avisar que estamos chegando.')}
              />
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

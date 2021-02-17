import React, {useState, useEffect} from 'react';
import {SafeAreaView, PermissionsAndroid, ActivityIndicator, Alert, View, Text} from 'react-native';
import SpotOS from '../../components/SpotOS';
import styles from './styles';
import InspectionService from '../../services/InspectionService';
import Header from '../../components/Header';
import Logo from '../../assets/images/logo1-fundo-transparente.png';
import Logout from '../../components/Logout';
import getRealm from '../../services/realm';
import NetInfo from '@react-native-community/netinfo';
import Commons from '../../theme/commons';
import moment from 'moment';
const ListOs = ({navigation}) => {
  const [dataOS, setDataOS] = useState([]);
  const [cache, setCache] = useState([]);
  const [network, setNetwork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inspection, setInpection] = useState([]);
  const [dataSync, setDataSync] = useState([]);

  function isNetwork() {
    setLoading(true);
    NetInfo.fetch().then((state) => {
      setNetwork({type: state.type, connected: state.isConnected});
      if (state.isConnected === true) {
        getCache().then((_) => listCacheOs().then((_) => setLoading(false)));
        listInspection();
      }
      if (state.isConnected === false) {
        listCacheOs().then((_) => setLoading(false));
      }
    });
  }

  async function listInspection() {
    try {
      const realm = await getRealm();
      let find = realm.objects('Inspection');
      if (find.length > 0) {
        return setInpection(find);
      }
    } catch (e) {
      return console.log(e);
    }
  }

  async function listCacheOs() {
    try {
      const realm = await getRealm();
      let find = realm.objects('List');
      return setCache(find);
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
  async function removeStorage(schema) {
    try {
      const realm = await getRealm();
      realm.write(() => {
        realm.delete(realm.objects(schema.toString()));
      });
      realm.close();
      return {success: true};
    } catch (error) {
      console.error(error);
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

  async function httpInspection(data) {
    try {
      return await InspectionService.dataSync(data);
    } catch (error) {
      Alert.alert('Erro inesperado!', 'Não conseguimos conectar com o servidor, tentaremos sincronizar mais tarde.');
      return console.error(error);
    }
  }

  async function sendInspection(inspection) {
    try {
      return inspection.map((r) => {
        return httpInspection({
          os: r.os,
          status: r.status,
          phone: r.phone,
          phoneTwo: r.phoneTwo,
          adequacy: r.adequacy,
          email: r.email,
          selo: r.ticket,
          description: r.description,
          images: [
            {uri: r.photoOneUri, datahora: r.photoOneData, size: r.photoOneSize},
            {uri: r.photoTwoUri, datahora: r.photoTwoData, size: r.photoTwoSize},
            {uri: r.photoThreeUri, datahora: r.photoThreeData, size: r.photoThreeSize},
            {uri: r.photoFourUri, datahora: r.photoFourData, size: r.photoFourSize},
            {uri: r.photoFiveUri, datahora: r.photoFiveData, size: r.photoFiveSize},
            {uri: r.photoSixUri, datahora: r.photoSixData, size: r.photoSixSize},
            {uri: r.photoSevenUri, datahora: r.photoSevenData, size: r.photoSevenSize},
            {uri: r.photoEigthUri, datahora: r.photoEigthData, size: r.photoEigthSize},
            {uri: r.photoNineUri, datahora: r.photoNineData, size: r.photoNineSize},
            {uri: r.photoTenUri, datahora: r.photoTenData, size: r.photoTenSize},
          ],
          dt_ini: r.dt_ini,
          h_ini: r.h_ini,
          device: r.device,
          dt_fim: r.dt_fim,
          h_fim: r.h_fim,
          imei: r.imei,
          latitude: r.latitude,
          longitude: r.longitude,
          mac: r.mac,
        }).then((response) => {
          setDataSync(true);
          if (response === true) {
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

            setTimeout(() => {
              saveStorage('Resend', {
                os: r.os,
                photoOne: r.photoOne,
                photoTwo: r.photoTwo,
                photoThree: r.photoThree,
                photoFour: r.photoFour,
                photoFive: r.photoFive,
                photoSix: r.photoSix,
                photoSeven: r.photoSeven,
                photoEigth: r.photoEigth,
                photoNine: r.photoNine,
                photoTen: r.photoTen,
                photoOneUri: r.photoOneUri,
                photoTwoUri: r.photoTwoUri,
                photoThreeUri: r.photoThreeUri,
                photoFourUri: r.photoFourUri,
                photoFiveUri: r.photoFiveUri,
                photoSixUri: r.photoSixUri,
                photoSevenUri: r.photoSevenUri,
                photoEigthUri: r.photoEigthUri,
                photoNineUri: r.photoNineUri,
                photoTenUri: r.photoTenUri,
              }).then((resend) => {
                if (resend.success === true) {
                  removeRowStorage('Inspection', r.os).then((r) => {
                    setDataSync(false);
                  });
                } else {
                  setDataSync(false);
                }
              });
            }, 22000);
          }
        });
      });
    } catch (e) {
      return console.error(e);
    }
  }

  async function getCache() {
    const inspection = await InspectionService.findByTec();
    await removeStorage('List');
    const data = inspection.map((d) => {
      return saveStorage('List', {
        os: d.os,
        dt_vis: d.dt_vis,
        st: d.st,
        client: d.cliente,
        address: d.endereco,
        number: d.numero,
        comp: d.Comple1,
        district: d.Bairro,
        city: d.Cidade,
        tp: d.tp,
      });
    });
  }

  useEffect(() => {
    isNetwork();
  }, []);

  useEffect(() => {
    sendInspection(inspection);
  }, [inspection]);

  return (
    <SafeAreaView style={styles.container}>
      <Header source={Logo} />
      {dataSync === true ? <View></View> : <Logout />}
      {dataSync === true ? (
        <View>
          <Text>Aguarde, estamos sincronizando os dados...</Text>
        </View>
      ) : (
        <View></View>
      )}
      {loading === true || dataSync === true ? (
        <ActivityIndicator size="large" color={dataSync === true ? Commons.color.danger : Commons.color.primary} />
      ) : (
        <SpotOS data={cache} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

export default ListOs;

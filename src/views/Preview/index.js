import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, ScrollView, Dimensions, Alert, PermissionsAndroid} from 'react-native';
import {Image} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Commons from '../../theme/commons';
import Header from '../../components/Header';
import Logo from '../../assets/images/logo1-fundo-transparente.png';
import getRealm from '../../services/realm';
import InspectionService from '../../services/InspectionService';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import IMEI from 'react-native-imei';
import DeviceInfo from 'react-native-device-info';
import {event} from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import styles from './styles';

export default function Preview(props) {
  const {
    os,
    dt_ini,
    h_ini,
    photoOne,
    photoTwo,
    photoThree,
    photoFour,
    photoFive,
    photoSix,
    photoSeven,
    photoEigth,
    photoNine,
    photoTen,
    phonePrimary,
    phoneSecondary,
    selectedAdequacy,
    email,
    ticket,
    description,
    selectedStatus,
    tp,
    dt_vis,
    st,
    client,
    address,
    number,
    comp,
    district,
    city,
  } = props.route.params;

  const [images, setImages] = useState([
    {uri: photoOne.uri, datahora: photoOne.datahora, size: photoOne.size},
    {uri: photoTwo.uri, datahora: photoTwo.datahora, size: photoTwo.size},
    {uri: photoThree.uri, datahora: photoThree.datahora, size: photoThree.size},
    {uri: photoFour.uri, datahora: photoFour.datahora, size: photoFour.size},
    {uri: photoFive.uri, datahora: photoFive.datahora, size: photoFive.size},
    {uri: photoSix.uri, datahora: photoSix.datahora, size: photoSix.size},
    {uri: photoSeven.uri, datahora: photoSeven.datahora, size: photoSeven.size},
    {uri: photoEigth.uri, datahora: photoEigth.datahora, size: photoEigth.size},
    {uri: photoNine.uri, datahora: photoNine.datahora, size: photoNine.size},
    {uri: photoTen.uri, datahora: photoTen.datahora, size: photoTen.size},
  ]);

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imei, setImei] = useState('');
  const [device, setDevice] = useState('');
  const [mac, setMac] = useState('');
  const [status, setStatus] = useState([]);
  const [network, setNetwork] = useState([]);

  function isNetwork() {
    NetInfo.fetch().then((state) => {
      setNetwork({type: state.type, connected: state.isConnected});
      if (state.isConnected === true) {
        cacheStatusData();
      }
      if (state.isConnected === false) {
        cacheStatusData();
      }
    });
  }
  async function saveInspection() {
    try {
      const cacheData = {
        os,
        status: selectedStatus,
        phone: phonePrimary,
        phoneTwo: phoneSecondary,
        adequacy: selectedAdequacy,
        email,
        ticket,
        description,
        photoOne: photoOne.uri ? photoOne.img : 'sem foto',
        photoTwo: photoTwo.uri ? photoTwo.img : 'sem foto',
        photoThree: photoThree.uri ? photoThree.img : 'sem foto',
        photoFour: photoFour.uri ? photoFour.img : 'sem foto',
        photoFive: photoFive.uri ? photoFive.img : 'sem foto',
        photoSix: photoSix.uri ? photoSix.img : 'sem foto',
        photoSeven: photoSeven.uri ? photoSeven.img : 'sem foto',
        photoEigth: photoEigth.uri ? photoEigth.img : 'sem foto',
        photoNine: photoNine.uri ? photoNine.img : 'sem foto',
        photoTen: photoTen.uri ? photoTen.img : 'sem foto',
        photoOneDate: photoOne.uri ? photoOne.datahora : 'vazio',
        photoTwoDate: photoTwo.uri ? photoTwo.datahora : 'vazio',
        photoThreeDate: photoThree.uri ? photoThree.datahora : 'vazio',
        photoFourDate: photoFour.uri ? photoFour.datahora : 'vazio',
        photoFiveDate: photoFive.uri ? photoFive.datahora : 'vazio',
        photoSixDate: photoSix.uri ? photoSix.datahora : 'vazio',
        photoSevenDate: photoSeven.uri ? photoSeven.datahora : 'vazio',
        photoEigthDate: photoEigth.uri ? photoEigth.datahora : 'vazio',
        photoNineDate: photoNine.uri ? photoNine.datahora : 'vazio',
        photoTenDate: photoTen.uri ? photoNine.datahora : 'vazio',
        photoOneUri: photoOne.uri ? photoOne.uri : 'vazio',
        photoTwoUri: photoTwo.uri ? photoTwo.uri : 'vazio',
        photoThreeUri: photoThree.uri ? photoThree.uri : 'vazio',
        photoFourUri: photoFour.uri ? photoFour.uri : 'vazio',
        photoFiveUri: photoFive.uri ? photoFive.uri : 'vazio',
        photoSixUri: photoSix.uri ? photoSix.uri : 'vazio',
        photoSevenUri: photoSeven.uri ? photoSeven.uri : 'vazio',
        photoEigthUri: photoEigth.uri ? photoEigth.uri : 'vazio',
        photoNineUri: photoNine.uri ? photoNine.uri : 'vazio',
        photoTenUri: photoTen.uri ? photoTen.uri : 'vazio',
        photoOneSize: photoOne.uri ? photoOne.size.toString() : 'vazio',
        photoTwoSize: photoTwo.uri ? photoTwo.size.toString() : 'vazio',
        photoThreeSize: photoThree.uri ? photoThree.size.toString() : 'vazio',
        photoFourSize: photoFour.uri ? photoFour.size.toString() : 'vazio',
        photoFiveSize: photoFive.uri ? photoFive.size.toString() : 'vazio',
        photoSixSize: photoSix.uri ? photoSix.size.toString() : 'vazio',
        photoSevenSize: photoSeven.uri ? photoSeven.size.toString() : 'vazio',
        photoEigthSize: photoEigth.uri ? photoEigth.size.toString() : 'vazio',
        photoNineSize: photoNine.uri ? photoNine.size.toString() : 'vazio',
        photoTenSize: photoTen.uri ? photoTen.size.toString() : 'vazio',
        dt_ini,
        h_ini,
        device: device,
        dt_fim: moment().format('DD/MM/YYYY'),
        h_fim: moment().format('h:mm'),
        imei: imei,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        mac: mac,
      };
      const save = await saveStorage('Inspection', cacheData);

      if (save.success === true) {
        const update = await updateStorage('List', {os, dt_vis, st: selectedStatus, client, address, number, comp, district, city, tp});
        if (update.success === true) {
          Alert.alert('Parabéns!!!', 'Inspeção realizada com sucesso.');
          setTimeout(() => {
            return props.navigation.navigate('ListOs');
          }, 2000);
        }
      } else {
        Alert.alert('Ops!', 'Falha ao realizar a Inspeção.');
        setTimeout(() => {
          return props.navigation.navigate('ListOs');
        }, 2000);
      }
    } catch (e) {
      return console.error(e);
    }
  }
  async function cacheStatusData() {
    try {
      const realm = await getRealm();
      let find = realm.objects('Status');
      return setStatus(find);
    } catch (error) {
      console.error(error);
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

  async function updateStorage(schema, data) {
    try {
      const realm = await getRealm();
      realm.write(() => {
        realm.create(schema.toString(), data, 'modified');
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
      return realm.write(() => {
        realm.delete(realm.objects(schema.toString()));
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    isNetwork();
  }, []);

  useEffect(() => {
    filterStatus(selectedStatus);
  }, []);

  useEffect(() => {
    handleLocation;
    handleDevice;
    handleMAC;
    handleImei();
  }, [handleImei()]);

  async function httpData(data) {
    try {
      const dataReq = await InspectionService.dataSync(data);
      return dataReq;
    } catch (error) {
      Alert.alert('Erro inesperado!', 'Não conseguimos conectar com o servidor, tentaremos sincronizar mais tarde.');
      return console.error(error);
    }
  }

  async function httpPhoto(uri, os, img) {
    try {
      const dataReq = await InspectionService.syncPhoto(uri, os, img);
      return dataReq;
    } catch (error) {
      Alert.alert('Erro inesperado!', 'Houve um problema no envio da imagem para o servidor.');
      return console.error(error);
    }
  }

  const handleLocation = Geolocation.getCurrentPosition((info) => {
    setLongitude(info.coords.longitude);
    setLatitude(info.coords.latitude);
  });

  const handleDevice = DeviceInfo.getDeviceName().then((result) => setDevice(result));
  const handleMAC = DeviceInfo.getMacAddress().then((mac) => setMac(mac));
  
  async function handleImei() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE, {
        title: 'ReactNativeCode wants to READ_PHONE_STATE',
        message: 'ReactNativeCode App needs access to your personal data. ',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        IMEI.getImei().then((imeiList) => {
          setImei(imeiList[0]);
        });
      } else {
        Alert.alert('Permission Not Granted');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const cellphone = phonePrimary.toString();
  const ddd = cellphone.slice(0, 2);
  const setPhone = cellphone.slice(3);
  const Cell = `(${ddd}) ${setPhone}`;

  const telephone = phoneSecondary.toString();
  const dddFixo = telephone.slice(0, 2);
  const setTeleFixo = telephone.slice(3);
  const Fixo = ` / (${dddFixo}) ${setTeleFixo}`;

  function carouselItem({item, index}) {
    if (item.uri) {
      return (
        <View>
          <Image
            style={{
              width: Math.round((Dimensions.get('window').width * 30) / 100),
              height: Math.round((Dimensions.get('window').width * 30) / 100),
            }}
            source={{uri: item.uri}}
          />
        </View>
      );
    }
  }

  function filterStatus(id) {
    const filtered = status.filter((st) => st.id === id);
    return filtered.map((st) => st.nome);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header source={Logo} />
        <Text style={styles.titleInformation}>FOTOS</Text>
        <View style={{padding: Math.round(Dimensions.get('screen').width / 60), flexDirection: 'row'}}>
          <Carousel data={images} renderItem={carouselItem} sliderWidth={1} itemWidth={100} />
        </View>
        <Text style={styles.titleInformation}>INFORMAÇÕES</Text>
        <View style={styles.client}>
          <View style={styles.detailsClient}>
            <Text style={styles.fontPrimary}>NOVO STATUS:</Text>
            <Text style={styles.font}>{filterStatus(selectedStatus)}</Text>
          </View>
          <View style={styles.detailsClient}>
            <Text style={styles.fontPrimary}>TELEFONE:</Text>
            <Text style={styles.font}>
              {phonePrimary ? Cell : ''}
              {phoneSecondary ? Fixo : ''}
            </Text>
          </View>

          <View style={styles.detailsClient}>
            <Text style={styles.fontPrimary}>E-MAIL:</Text>
            <Text style={styles.font}>{email}</Text>
          </View>
          <View style={styles.detailsClient}>
            {selectedAdequacy.length > 0 ? (
              <View style={styles.adequacy}>
                <Text style={styles.fontPrimary}>ADEQUAÇÃO: </Text>
                <View style={styles.viewAdequacy}>
                  {selectedAdequacy.map((s, i) => (
                    <Text key={i} style={styles.adequacyItens}>
                      {s}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
          {ticket ? (
            <View style={styles.detailsClient}>
              <Text style={styles.fontPrimary}>SELO:</Text>
              <Text style={styles.font}>{ticket}</Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <Text style={styles.titleInformation}>OBS</Text>
        <View style={styles.client}>
          <Text style={styles.font}>{description}</Text>
        </View>
      </ScrollView>
      <View style={styles.viewButtons}>
        <View style={styles.Button}>
          <Button
            type="outline"
            buttonStyle={{borderColor: '#ddd', height: '100%'}}
            titleStyle={{color: `${Commons.color.primary}`}}
            icon={<Icon name="undo" size={20} color={`${Commons.color.primary}`} />}
            title=" VOLTAR"
            onPress={() => props.navigation.navigate('createOs')}
          />
        </View>
        <View style={styles.Button}>
          <Button
            type="outline"
            buttonStyle={{borderColor: '#ddd', height: '100%'}}
            titleStyle={{color: `${Commons.color.primary}`}}
            icon={<Icon name="save" size={20} color={`${Commons.color.primary}`} />}
            title=" SALVAR"
            onPress={() => saveInspection()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

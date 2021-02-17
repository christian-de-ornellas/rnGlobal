import React, {useState, useEffect} from 'react';
import {Dimensions, Image, KeyboardAvoidingView, View, Keyboard, ScrollView, Platform, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Input, Button, CheckBox} from 'react-native-elements';
import styles from './styles';
import Commons from '../../theme/commons';
import MultiSelect from 'react-native-multiple-select';
import Header from '../../components/Header';
import Logo from '../../assets/images/logo1-fundo-transparente.png';
import LegendsService from '../../services/LegendsService';
import {Picker} from '@react-native-community/picker';
import StatusService from '../../services/StatusService';
import NetInfo from '@react-native-community/netinfo';
import getRealm from '../../services/realm';

export default function CreateOs(props) {
  const [phonePrimary, setPhonePrimary] = useState('');
  const [phoneSecondary, setPhoneSecondary] = useState('');
  const [selectedAdequacy, setSelectedAdequacy] = useState([]);
  const [email, setEmail] = useState('');
  const [contract, setContract] = useState('');
  const [ticket, setTicket] = useState('');
  const [description, setDescription] = useState('');
  const [legends, setLegends] = useState([]);
  const [checkBox, setCheckBox] = useState(0);
  const [data, setData] = useState('');
  const [status, setStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [cacheStatus, setCacheStatus] = useState([]);
  const [network, setNetwork] = useState([]);
  const {tp} = props.route.params;

  function isNetwork() {
    NetInfo.fetch().then((state) => {
      setNetwork({type: state.type, connected: state.isConnected});
      if (state.isConnected === true) {
        getCacheLegends();
        cacheLegendsData();
        cacheStatusData();
      }
      if (state.isConnected === false) {
        cacheStatusData();
        cacheLegendsData();
      }
    });
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

  function onChangeAdequacy(selectedAdequacy) {
    Keyboard.dismiss();
    return setSelectedAdequacy(selectedAdequacy);
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
      return realm.write(() => {
        realm.delete(realm.objects(schema.toString()));
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getCacheLegends() {
    try {
      const legends = await LegendsService.allLegends();
      await removeStorage('Legends');
      return legends.map((lg) =>
        saveStorage('Legends', {
          ID: lg.ID,
          ITEM: lg.ITEM,
          DESCRICAO: lg.DESCRICAO,
          PRAZO: lg.PRAZO,
          FORMULARIO: lg.FORMULARIO,
          norma: lg.norma,
          tp: typeof lg.tp != 'string' ? 'vazio' : lg.tp,
        }),
      );
    } catch (e) {
      return console.error(e);
    }
  }

  async function cacheLegendsData() {
    try {
      const realm = await getRealm();
      let find = realm.objects('Legends');
      return setLegends(find);
    } catch (error) {
      console.error(error);
    }
  }

  function next() {
    if (selectedStatus === '0') {
      return Alert.alert('Ops!', 'Selecione o Status!');
    }

    if (selectedStatus === '4' && ticket == '') {
      return Alert.alert('Ops!', 'Você precisa adicionar um selo!');
    }

    if (contract.length === 0) {
      return Alert.alert('Ops!', 'Você precisa adicionar o Nº do Contrato!');
    }
    if ((selectedStatus === '6' && checkBox === 0) || (selectedStatus === '7' && checkBox === 0)) {
      return Alert.alert('Ops!', 'Você precisa selecionar Residêncial ou Comercial para está adequação.');
    } else if ((selectedStatus === '6' && selectedAdequacy.length === 0) || (selectedStatus === '7' && selectedAdequacy.length === 0)) {
      return Alert.alert('Ops!', 'Você precisa aplicar os items corretos à inspeção.');
    } else {
      return props.navigation.navigate('Preview', {
        ...props.route.params,
        phonePrimary,
        phoneSecondary,
        selectedAdequacy,
        email,
        ticket,
        description,
        selectedStatus,
      });
    }
  }

  function renderCheckbox() {
    return (
      <View style={styles.checkbox}>
        <CheckBox
          title="Residêncial"
          containerStyle={{backgroundColor: `${Commons.color.secodary}`}}
          checkedColor={`${Commons.color.primary}`}
          textStyle={{color: `${Commons.color.primary}`}}
          checked={checkBox == 1 ? true : false}
          onPress={() => setCheckBox(1)}
        />
        <CheckBox
          title="Comercial"
          containerStyle={{backgroundColor: `${Commons.color.secodary}`}}
          checkedColor={`${Commons.color.primary}`}
          textStyle={{color: `${Commons.color.primary}`}}
          checked={checkBox == 2 ? true : false}
          onPress={() => setCheckBox(2)}
        />
      </View>
    );
  }

  function renderMultiSelect() {
    return (
      <View style={{padding: Math.round(Dimensions.get('screen').width / 60)}}>
        {checkBox === 1 ? (
          <MultiSelect
            items={residencial}
            uniqueKey="ITEM"
            ref={(component) => {
              multiSelect = component;
            }}
            onSelectedItemsChange={onChangeAdequacy}
            selectedItems={selectedAdequacy}
            selectText={'Adequação'}
            searchInputPlaceholderText="Buscar"
            onChangeInput={(value) => setSelectedAdequacy(value)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor={Commons.color.primary}
            tagBorderColor={Commons.color.primary}
            tagTextColor={Commons.color.primary}
            selectedItemTextColor={Commons.color.primary}
            selectedItemIconColor={Commons.color.primary}
            itemTextColor="#000"
            displayKey={'ITEM'}
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#bbb"
            submitButtonText="CONFIRMAR"
            styleDropdownMenuSubsection={{borderColor: `${Commons.color.primary}`, backgroundColor: 'transparent'}}
            fontSize={16}
            textColor={Commons.color.primary}
          />
        ) : (
          <MultiSelect
            items={comercial}
            uniqueKey="ITEM"
            ref={(component) => {
              multiSelect = component;
            }}
            onSelectedItemsChange={onChangeAdequacy}
            selectedItems={selectedAdequacy}
            selectText={'Adequação'}
            searchInputPlaceholderText="Buscar"
            onChangeInput={(value) => setSelectedAdequacy(value)}
            altFontFamily="ProximaNova-Light"
            tagRemoveIconColor={Commons.color.primary}
            tagBorderColor={Commons.color.primary}
            tagTextColor={Commons.color.primary}
            selectedItemTextColor={Commons.color.primary}
            selectedItemIconColor={Commons.color.primary}
            itemTextColor="#000"
            displayKey="ITEM"
            searchInputStyle={{color: '#CCC'}}
            submitButtonColor="#bbb"
            submitButtonText="CONFIRMAR"
            styleDropdownMenuSubsection={{borderColor: `${Commons.color.primary}`, backgroundColor: 'transparent'}}
            fontSize={16}
            textColor={Commons.color.primary}
          />
        )}
      </View>
    );
  }

  function renderPickerStatus() {
    return (
      <View style={styles.selectorStatusContainer}>
        <Picker selectedValue={selectedStatus} style={styles.selectorStatus} onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}>
          {cacheStatus.map((st) => (
            <Picker.Item label={st.nome} value={st.id} key={st.id} />
          ))}
        </Picker>
      </View>
    );
  }
  const residencial = legends.filter((l) => l.tp === 'Resedencia');
  const comercial = legends.filter((l) => l.tp === 'Comercial');

  useEffect(() => {
    isNetwork();
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS ? 'padding' : 'position'} style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
        <Header source={Logo}></Header>
        {renderPickerStatus()}
        {selectedStatus === '6' || selectedStatus === '7' ? renderCheckbox() : <View></View>}
        {selectedStatus === '6' || selectedStatus === '7' ? renderMultiSelect() : <View></View>}

        <Input
          inputContainerStyle={{borderColor: `${Commons.color.primary}`}}
          placeholderTextColor={`${Commons.color.primary}`}
          inputStyle={{color: `${Commons.color.primary}`}}
          placeholder="Telefone"
          onChangeText={(value) => setPhonePrimary(value)}
          leftIcon={<Icon name="stay-primary-portrait" size={24} color={Commons.color.primary} />}
          keyboardType="phone-pad"
        />
        <Input
          inputContainerStyle={{borderColor: `${Commons.color.primary}`}}
          placeholderTextColor={`${Commons.color.primary}`}
          inputStyle={{color: `${Commons.color.primary}`}}
          placeholder="Fixo"
          onChangeText={(value) => setPhoneSecondary(value)}
          leftIcon={<Icon name="phone" size={24} color={Commons.color.primary} />}
          keyboardType="phone-pad"
        />

        <Input
          inputContainerStyle={{borderColor: `${Commons.color.primary}`}}
          placeholderTextColor={`${Commons.color.primary}`}
          inputStyle={{color: `${Commons.color.primary}`}}
          placeholder="E-mail"
          onChangeText={(value) => setEmail(value)}
          leftIcon={<Icon name="email" size={24} color={Commons.color.primary} />}
          keyboardType="email-address"
        />
        {tp == 0 ? (
          <Input
            inputContainerStyle={{borderColor: `${Commons.color.primary}`}}
            placeholderTextColor={`${Commons.color.primary}`}
            inputStyle={{color: `${Commons.color.primary}`}}
            placeholder="Nº Contrato"
            onChangeText={(value) => setContract(value)}
            leftIcon={<Icon name="content-paste" size={24} color={Commons.color.primary} />}
            keyboardType="number-pad"
          />
        ) : (
          <View></View>
        )}
        {selectedStatus === '4' ? (
          <Input
            inputContainerStyle={{borderColor: `${Commons.color.primary}`}}
            placeholderTextColor={`${Commons.color.primary}`}
            inputStyle={{color: `${Commons.color.primary}`}}
            placeholder="Selo"
            onChangeText={(value) => setTicket(value)}
            leftIcon={<Icon name="local-offer" size={24} color={Commons.color.primary} />}
            keyboardType="number-pad"
          />
        ) : (
          <View></View>
        )}
        <Input
          inputContainerStyle={{borderColor: `${Commons.color.primary}`}}
          multiline={true}
          placeholderTextColor={`${Commons.color.primary}`}
          inputStyle={{color: `${Commons.color.primary}`}}
          placeholder="Obs"
          onChangeText={(value) => setDescription(value)}
          leftIcon={<Icon name="chat" size={24} color={Commons.color.primary} />}
          keyboardType="name-phone-pad"
        />
        <View style={{padding: Math.round(Dimensions.get('screen').width / 60)}}>
          <Button
            buttonStyle={{backgroundColor: `${Commons.color.primary}`}}
            title=" AVANÇAR"
            icon={<Icon name="navigate-next" size={20} color={'#fff'} />}
            onPress={() => next()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

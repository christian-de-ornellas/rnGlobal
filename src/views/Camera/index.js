import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import moment from 'moment';
import marker, {Position, ImageFormat} from 'react-native-image-marker';
import ImgToBase64 from 'react-native-image-base64';

export default function Camera(props) {
  const [photoOne, setPhotoOne] = useState([]);
  const [photoTwo, setPhotoTwo] = useState([]);
  const [photoThree, setPhotoThree] = useState([]);
  const [photoFour, setPhotoFour] = useState([]);
  const [photoFive, setPhotoFive] = useState([]);
  const [photoSix, setPhotoSix] = useState([]);
  const [photoSeven, setPhotoSeven] = useState([]);
  const [photoEigth, setPhotoEigth] = useState([]);
  const [photoNine, setPhotoNine] = useState([]);
  const [photoTen, setPhotoTen] = useState([]);
  const [count, setCount] = useState(0);
  const [flash, setFlash] = useState(0);
  const [loading, setLoading] = useState(false);

  const {os, dt_} = props.route.params;

  async function takePhoto() {
    try {
      setLoading(true);
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      if (photoOne.length === 0) {
        setCount(1);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoOne({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }

      if (photoTwo.length === 0) {
        setCount(2);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoTwo({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }

      if (photoThree.length === 0) {
        setCount(3);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoThree({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }

      if (photoFour.length === 0) {
        setCount(4);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoFour({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }

      if (photoFive.length === 0) {
        setCount(5);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoFive({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }

      if (photoSix.length === 0) {
        setCount(6);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoSix({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }
      if (photoSeven.length === 0) {
        setCount(7);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoSeven({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }
      if (photoEigth.length === 0) {
        setCount(8);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoEigth({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }
      if (photoNine.length === 0) {
        setCount(9);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoNine({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }
      if (photoTen.length === 0) {
        setCount(10);
        setLoading(false);
        const resp = marker
          .markText({
            src: data.uri,
            text: `OS: ${os} | DATA: ${moment().format('DD/MM/YYYY HH:mm')} `,
            fontName: 'Arial',
            color: '#ffff00',
            fontSize: 20,
            scale: 1,
            quality: 100,
            markerScale: 0.5,
            position: Position.bottomLeft,
            saveFormat: ImageFormat.jpg,
          })
          .then((res) => {
            const Uri = Platform.OS === 'android' ? 'file://' + res : res;
            ImgToBase64.getBase64String(Uri)
              .then((photo) => {
                setPhotoTen({img: photo, uri: Uri, size: data.height, datahora: moment().format('YYYY-MM-DD HH:mm')});
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

        return resp;
      }
      if (count === 10) {
        return props.navigation.navigate('createOs', {
          ...props.route.params,
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
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={(camera) => {
          this.camera = camera;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={flash === 0 ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />

      <View style={styles.viewButtons}>
        <View style={styles.Button}>
          {flash === 0 ? (
            <Button
              onPress={() => setFlash(1)}
              type="outline"
              buttonStyle={{
                marginHorizontal: 2,
                marginVertical: 2,
                borderColor: '#1eaa65',
                backgroundColor: '#1eaa65',
                borderWidth: 1,
                borderRadius: 100,
              }}
              icon={<Icon name="flash-off" size={20} color="#fff" />}
            />
          ) : (
            <Button
              onPress={() => setFlash(0)}
              type="outline"
              buttonStyle={{
                marginHorizontal: 2,
                marginVertical: 2,
                borderColor: '#1eaa65',
                backgroundColor: '#1eaa65',
                borderWidth: 1,
                borderRadius: 100,
              }}
              titleStyle={{color: '#fff'}}
              icon={<Icon name="flash-on" size={20} color="#fff" />}
            />
          )}
        </View>
        <View style={styles.Button}>
          {loading === true ? (
            <Button
              onPress={takePhoto}
              type="outline"
              buttonStyle={{
                marginHorizontal: 2,
                marginVertical: 2,
                borderColor: '#ed1b24',
                backgroundColor: '#ed1b24',
                borderWidth: 1,
                borderRadius: 100,
              }}
              icon={<Icon name="camera" size={20} color={'#fff'} />}
              loading
              loadingProps={{color: 'white'}}
            />
          ) : (
            <Button
              onPress={takePhoto}
              type="outline"
              buttonStyle={{
                marginHorizontal: 2,
                marginVertical: 2,
                borderColor: '#ed1b24',
                backgroundColor: '#ed1b24',
                borderWidth: 1,
                borderRadius: 100,
              }}
              icon={<Icon name="camera" size={20} color={'#fff'} />}
            />
          )}
        </View>
        <View style={styles.Button}>
          {count > 0 ? (
            <Button
              onPress={() =>
                props.navigation.navigate('createOs', {
                  ...props.route.params,
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
                })
              }
              type="outline"
              buttonStyle={{
                marginHorizontal: 2,
                marginVertical: 2,
                borderColor: '#1eaa65',
                backgroundColor: '#1eaa65',
                borderWidth: 1,
                borderRadius: 100,
              }}
              icon={<Icon name="redo" size={20} color={'#fff'} />}
            />
          ) : (
            <Button
              type="outline"
              buttonStyle={{
                marginHorizontal: 2,
                marginVertical: 2,
                borderColor: '#1eaa65',
                backgroundColor: '#1eaa65',
                borderWidth: 1,
                borderRadius: 100,
              }}
              icon={<Icon name="add-a-photo" size={20} color={'#fff'} />}
              onPress={() => Alert.alert('Ops!', 'Você precisa de tirar ao menos uma foto para avançar na inspeção.')}
            />
          )}
        </View>
      </View>
    </View>
  );
}

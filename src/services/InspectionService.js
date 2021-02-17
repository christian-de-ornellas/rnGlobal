import http from './http';
import base64 from 'base-64';
import moment from 'moment';
import AuthService from '../services/AuthService';
import {APP_SERVER} from '@env';

export default class InspectionService {
  static findByTec = async () => {
    try {
      const current = await AuthService.currentAuth();
      const response = await http({
        method: 'get',
        url: `/api/v1/agenda/listar/${APP_SERVER}/` + current.username,
        headers: {
          Authorization: 'Basic ' + base64.encode(current.username + ':' + current.password),
        },
      });

      return response.data.dados;
    } catch (error) {
      return console.error(error);
    }
  };

  static dataSync = async (req) => {
    try {
      const current = await AuthService.currentAuth();

      const data = new FormData();

      data.append('os', req.os);
      data.append('status', req.status);
      data.append('phone', req.phone);
      data.append('phoneTwo', req.phoneTwo);
      data.append('adequacy', JSON.stringify(req.adequacy));
      data.append('email', req.email);
      data.append('selo', req.ticket);
      data.append('description', req.description);
      data.append('images', JSON.stringify(req.images));
      data.append('dt_ini', req.dt_ini);
      data.append('h_ini', req.h_ini);
      data.append('device', req.device);
      data.append('dt_fim', req.dt_fim);
      data.append('imei', req.imei);
      data.append('latitude', req.latitude);
      data.append('longitutde', req.longitutde);
      data.append('mac', req.mac);

      const response = await http({
        method: 'post',
        url: `/api/v1/agenda/sincdadosos/${APP_SERVER}`,
        headers: {
          Authorization: 'Basic ' + base64.encode(current.username + ':' + current.password),
        },
        data,
      });

      if (response.data.dados === true) {
        console.log('Dados enviado com sucesso!');
      } else {
        console.log('Error ao enviar os dados!');
      }

      return response.data.dados;
    } catch (error) {
      return console.error(error);
    }
  };

  static syncPhoto = async (os, img) => {
    try {
      const current = await AuthService.currentAuth();
      let now = moment().format('YYYYMMDDHHmmss');
      const frm = new FormData();

      frm.append('img', img);
      frm.append('os', os);
      frm.append('uri', `${os}${now}.jpg`);

      const response = await http({
        method: 'post',
        url: `/api/v1/agenda/sincfotoos/${APP_SERVER}`,
        headers: {
          Authorization: 'Basic ' + base64.encode(current.username + ':' + current.password),
        },
        data: frm,
      });

      if (response.data.dados === true) {
        console.log('Mais uma foto enviada com sucesso!');
      } else {
        console.log('Error ao enviar a foto!');
      }

      return response.data.dados;
    } catch (error) {
      return console.error(error);
    }
  };
}

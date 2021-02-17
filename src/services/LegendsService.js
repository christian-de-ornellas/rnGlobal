import http from './http';
import base64 from 'base-64';
import AuthService from '../services/AuthService';
import {APP_SERVER} from '@env';
export default class LegendsService {
  static allLegends = async () => {
    const current = await AuthService.currentAuth();
    try {
      const response = await http({
        method: 'get',
        url: `/api/v1/agenda/legendascgi/${APP_SERVER}`,
        headers: {
          Authorization: 'Basic ' + base64.encode(current.username + ':' + current.password),
        },
      });

      return response.data.dados;
    } catch (error) {
      return console.error(error);
    }
  };
}

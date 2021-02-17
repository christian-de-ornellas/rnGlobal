import http from './http';
import base64 from 'base-64';
import getRealm from '../services/realm';
import {APP_SERVER} from '@env';
export default class StatusService {
  static list = async () => {
    const realm = await getRealm();
    const current = realm.objects('User');

    const {username, password} = current[0];
    try {
      const response = await http({
        method: 'get',
        url: `/api/v1/agenda/legendasttec/${APP_SERVER}`,
        headers: {
          Authorization: 'Basic ' + base64.encode(username + ':' + password),
        },
      });
      return response.data.dados;
    } catch (error) {
      return console.error(error);
    }
  };
}

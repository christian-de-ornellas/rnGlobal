import http from './http';
import base64 from 'base-64';
import {APP_SERVER} from '@env';

export default class LegendsService {
  static find = async () => {
    const username = 'juliana.senna@globalvistorias.com.br';
    const password = 'Juliana@r@';

    try {
      const response = await http({
        method: 'get',
        url: `/api/v1/agenda/legendasttp/${APP_SERVER}`,
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

import http from './http';
import base64 from 'base-64';
import getRealm from './realm';

export default class AuthService {
  static signIn = async (username, password) => {
    try {
      const response = await http({
        method: 'get',
        url: '/matriz/agendamento.php?id=1',
        headers: {
          Authorization: 'Basic ' + base64.encode(username + ':' + password),
        },
      });
      return response.data;
    } catch (error) {
      return console.error(error);
    }
  };

  static currentAuth = async () => {
    const realm = await getRealm();
    const user = realm.objects('User');
    return ({username, password} = user[0]);
  };
}

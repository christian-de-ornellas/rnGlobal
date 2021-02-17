import axios from 'axios';
import {APP_BASE_URL} from '@env';

const http = axios.create({
  baseURL: APP_BASE_URL,
  timeout: 60000,
  headers: {'content-type': 'multipart/form-data'},
});

export default http;

/**
 * У файлі products-api.js зберігай функції для запитів на бекенд
 */

import axios from 'axios';
import { API_BASE_URL } from './constants';

axios.defaults.baseURL = API_BASE_URL;
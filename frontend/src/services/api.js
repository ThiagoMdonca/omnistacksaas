import axios from 'axios';

// eslint-disable-next-line import/no-cycle
import store from '~/store';

const api = axios.create({
  baseURL: 'http://192.168.1.38:3333/',
});

api.interceptors.request.use(config => {
  const { token } = store.getState().auth;
  const { active: team } = store.getState().teams;
  const headers = { ...config.headers };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (team) {
    headers.TEAM = team.slug;
  }

  return { ...config, headers };
});

export default api;

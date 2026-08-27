import { client } from '~src/client/client.gen';
import { useAuthStore } from '~stores/authStore';

client.interceptors.request.use((request) => {
  const token = useAuthStore.getState().token;
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  return request;
});

client.interceptors.response.use((response) => {
  if (response.status === 401) {
    useAuthStore.getState().logout();
  }
  return response;
});

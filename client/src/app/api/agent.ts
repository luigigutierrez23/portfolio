import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

/** Models */
import { User, UserFormValues, UserLogin } from '../models/users';
import { store } from '../stores/store';

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === 'development') await sleep(3000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config, headers } = error.response!;
 
    switch (status) {
      case 400:
        if (
          config.method === 'get' &&
          data.errors &&
          data.errors.hasOwnProperty('id')
        ) {
          history.push("/not-found");
        }

        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (
          status === 401 &&
          headers['www-authenticate']?.startsWith(
            'Bearer error="invalid_token"'
          )
        ) {
          store.userStore.logout();
          toast.error('Sesion expired - please login again');
        }
        break;
      case 404:
          history.push("/not-found");
        break;
      case 500:
          store.commonStore.setServerError(data);
        //   history.push("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get:  <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put:  <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del:  <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Users = {
  list: () => axios.get<User[]>('/account').then(responseBody),
  details: (id: string) => requests.get<User>(`/account/${id}`),
  // create: (post: PostFormValues) => requests.post<void>("/account", post),
  // update: (post: PostFormValues) => requests.put<void>(`account/${post.id}`, post),
  delete: (id: string) => requests.del<void>(`account/${id}`),
};

const Auth = {
  login: (user: UserFormValues) => requests.post<UserLogin>("/auth/login", user),
}

const agent = {
  Users,
  Auth
};

export default agent;

import 'whatwg-fetch';
import $ from 'jquery';
import apiConfig from './apiConfig';

const host = apiConfig.API_HOST;


const defaultHeader = apiConfig.DEFAULT_HEADER;

const checkStatus = (response) => {
  const contentType = response.headers.get('content-type');
  if (response.status >= 200 && response.status < 300) {
    if (contentType && contentType.indexOf('application/json') !== -1) {
      return response.json().then(res =>
        Promise.resolve({
          status: response.status,
          response: res,
        }));
    }
    /*    return response.text().then((res) => {
          console.log(`checkSessionTimeout:${checkSessionTimeout(res)}`);
          if (checkSessionTimeout(res)) {
            return Promise.reject({
              status: 401,
              response: {
                errorType: 'SGERROR',
                errorInfo: [{ code: 'SESSION_TIMEOUT', detail: 'session timeout' }],
              },
            });
          }
          return Promise.resolve({
            status: response.status,
            response: res,
          });
        }); */
  }
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json().then(res =>
      Promise.reject({
        status: response.status,
        response: res,
      }));
  }
  return response.text().then(res =>
    Promise.reject({
      status: response.status,
      response: res,
    }));
};

export const buildApiUrl = (path, params) => {
  let url = '';
  if (path.startsWith('/')) {
    url = `${host}${path}`;
  } else {
    url = `${host}/${path}`;
  }

  if (
    params && Object.keys(params).length !== 0 && params.constructor === Object
  ) {
    url = `${url}?${$.param(params)}`;
  }
  return url;
};

const getOptions = (option) => {
  let opt = null;
  if (
    option && Object.keys(option).length !== 0 && option.constructor === Object
  ) {
    opt = {
      mode: 'cors',
      cache: 'no-cache',
      ...option,
      headers: { ...defaultHeader, ...option.headers },
    };
  }
  return opt;
};

const request = {
  fetch: (path, params, option = {}) => {
    const url = buildApiUrl(path, params);
    const opt = getOptions(option);
    let response;
    if (opt) {
      response = fetch(url, opt);
    }
    return response
      .then(data => checkStatus(data))
      .then(data => data)
      .catch((err) => {
        throw err;
      });
  },

  get: (path, params, option = {}) =>
    request.fetch(path, params, { ...option, method: 'GET' }),

  post: (path, params, body, option = {}) =>
    request.fetch(path, params, {
      ...option,
      method: 'POST',
      body: JSON.stringify(body),
    }),

  put: (path, params, body, option = {}) =>
    request.fetch(path, params, {
      ...option,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: (path, params, option = {}) =>
    request.fetch(path, params, { ...option, method: 'DELETE' }),
};

export default request;

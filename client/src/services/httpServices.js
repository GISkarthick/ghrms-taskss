import axios from "axios";
import { baseUrl } from "../config";
import { history } from "../utils/history";


var qs = require('qs');
export const httpServices = {};
httpServices.get = get;
httpServices.post = post;
httpServices.put = put;
httpServices.remove = remove;

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, DELETE";

axios.interceptors.response.use(
  function(response) {
    // console.log(response, "sdsd");
    let data = response.data;
    if(data.status){
      // console.log(data.data);
      return Promise.resolve(data.data);
    }else if(response.headers['content-type'].includes('application/pdf')){
      return Promise.resolve(data);
    }else{
      let error = data.error || data.msg;
      return Promise.reject(error);
    }
    
  },
  function(error) {
    if (error.request.status === 403) {
      alert("Token expired")
      history.push('/login')
      window.location.reload();
    } else if (error.request.status === 401) {
      // Utils.toastrWarning(error.response.data.message);
      alert(error.response.data.message);
      // PubSub.publish("msg", true);
    } else if (error.request.status === 500) {
      // Utils.toastrError(error.response.data.message);
      alert(error.response.data.message);
    } else {
      alert("Network connection failed ");
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function(config) {
    let user = sessionStorage.getItem("user")
      ? localStorage.getItem('token')
      : "";
    let key = sessionStorage.getItem("key");
    config.headers = Object.assign(
      {
        "x-access-token": user,
        "x-api-key": key
      },
      config.headers
    );

    // console.log("config", config);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

function get(url) {
  // PubSub.publish("msg", false);
  return axios.get(url).then(response => {
    // PubSub.publish("msg", true);
    return response;
  });
}

function post(url, params) {
  return axios.post(url, params).then(response => {
    return response;
  });
}

function remove(url, params = null) {
  return axios.delete(url, { data: params }).then(response => {
    return response;
  });
}

function put(url, data) {
  return axios.put(url, data).then(response => {
    return response;
  });
}


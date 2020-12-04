import axios from "axios";
import config from "../../config/config";
import ENDPOINTS from "../../config/gateway";

// const logger = require("../helpers/winston.js");
// const logsModel = require("../models/logsModel.js");
// const userLoginActivityModel = require("../models/userLoginActivityModel.js");

axios.interceptors.request.use(
    req_data => {
        req_data.headers.Authorization = config.jwtSecret;

        return req_data;
    },
    error =>

    // Do something with request error
        Promise.reject(error)

);

console.log(ENDPOINTS);
const apiService = () => {
    const makeServiceCall = (method, name, end_points, payload) => {
        const base_url = _constructURL(name, end_points);

        return axios({
            method,
            url: base_url,
            data: payload
        });
    };

    const _constructURL = (name, end_points) => {
        const serviceName = ENDPOINTS[name];

        return `${serviceName.url}:${serviceName.port}${end_points}`;
    };

    return {
        _constructURL,
        makeServiceCall
    };
};

export default apiService();

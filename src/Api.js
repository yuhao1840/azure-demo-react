import axios from 'axios';

/**
 * URLs and other api constants
 */
const constants = {
    api: {
        baseURL: 'https://hyu-api-service.azure-api.net/hyu-function-app/'
    },
};

/**
 * Create an Axios Client with defaults
 */
export default axios.create({
    baseURL: constants.api.baseURL,
    headers: { 'Ocp-Apim-Subscription-Key': '2209c6acc785429bbc7f39e072a7fe56' }
});

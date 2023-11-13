import axios from 'axios';

/**
 * URLs and other api constants
 */
const constants = {
    api: {
        baseURL: process.env.REACT_APP_API_BASE_URL
    },
};

/**
 * Create an Axios Client with defaults
 */
export default axios.create({
    baseURL: constants.api.baseURL,
    headers: { 'Ocp-Apim-Subscription-Key': process.env.REACT_APP_API_KEY }
});

import axios from 'axios';

class HttpClient {
  constructor(baseURL) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  async get(url, config) {
    try {
      const response = await this.axiosInstance.get(url, config);
      console.info(`RESPONSE_RECEIVED_FROM_${url}`, { data: response.data });
      return [null, response];
    } catch (error) {
      if (error.response) {
        console.info(`RESPONSE_RECEIVED_FROM_${url}`, { data: error.response.data });
        return [null, error.response];
      }
      console.error(`SERVICE_CALL_FAILURE_OF_${url}`, { errorMessage: error.message, stack: error.stack });
      return [error, null];
    }
  }

  async post(url, data, config) {
    try {
      const response = await this.axiosInstance.post(url, data, config);
      console.info(`RESPONSE_RECEIVED_FROM_${url}`, { data: response.data });
      return [null, response];
    } catch (error) {
      if (error.response) {
        return [null, error.response];
      }
      console.error(`SERVICE_CALL_FAILURE_OF_${url}`, { errorMessage: error.message, stack: error.stack });
      return [error, null];
    }
  }

  async patch(url, data, config) {
    try {
      const response = await this.axiosInstance.patch(url, data, config);
      console.info(`RESPONSE_RECEIVED_FROM_${url}`, { data: response.data });
      return [null, response];
    } catch (error) {
      console.error(`SERVICE_CALL_FAILURE_OF_${url}`, { errorMessage: error.message, stack: error.stack });
      throw new Error(error.message);
    }
  }

}

export default new HttpClient('https://prod.wheelz365.com')
import axios from "axios";

function InitializeAxios() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.withCredentials = true;
}

export default InitializeAxios;

import envVariables from "../envImport/envImport";
import FetchClient from "../serviceClient/Fetch.Client";

class AuthService {
  constructor() {
    this.httpClient = FetchClient;
  }

  async login(userName, password) {
    console.log("Fetching login Details ::", userName, password);
    try {
      console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/user-mgmt/login`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.post(endPoint, {
        userName,
        password,
      });
      //  Access status and data from the custom response object
      console.log("Response:", response);
      const { status, data } = response;
      console.log("Status:", status);
      console.log("Data:", data);

      if (status.code !== 200) {
        if (status.message){
            throw new Error(status.message);
        } else {
          throw new Error(`HTTP error! Status: ${status.code}`);
        }
      }
      return data;

      //  return response.json();
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  async logout() {
    console.log("implementing logout");
    try {
        console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/user-mgmt/logout`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.post(endPoint);
      //  Access status and data from the custom response object
      console.log("Response:", response);
      const { status, data } = response;
      console.log("Status:", status);
      console.log("Data:", data);

      if (status.code !== 200) {
        if (status.message){
            throw new Error(status.message);
        } else {
          throw new Error(`HTTP error! Status: ${status.code}`);
        }
      }
      return data;

    } catch (error) {
        console.error("Error logging out:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;

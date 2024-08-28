import envVariables from "../envImport/envImport";
import FetchClient from "../serviceClient/Fetch.Client";

class PaymentService {
  constructor() {
    this.httpClient = FetchClient;
  }

  // service method to make payment
  async makePayment(reqData) {
    console.log("===>inside Make Payment service and Data;;;;", reqData);
    try {
      console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/payment-mgmt/makepayment`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.post(endPoint, {
        ...reqData
      });
      console.log("Response:", response);
      const { status, data } = response;
      console.log("Status:", status);
      console.log("Data:", data);

      if (status.code !== 200) {
        if (status.message) {
          throw new Error(status.message);
        } else {
          throw new Error(`HTTP error! Status: ${status.code}`);
        }
      }
      return data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
  }
}

const paymentService = new PaymentService();
export default paymentService;

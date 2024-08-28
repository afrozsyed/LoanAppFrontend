import envVariables from "../envImport/envImport";

class LoanService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  async getLoanDetails(loanId) {
    console.log("Fetching loan details for loan ID:", loanId);

    try {
      console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/loan-mgmt/loan-details/${loanId}`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.get(endPoint);
      console.log("Response:", response);

      // Access status and data from the custom response object
      const { status, data } = response;

      if (status.code !== 200) {
        if (status.code === 404) {
          throw new Error(`Loan not found with ID: ${loanId}`);
        } else if (status.code === 500) {
          throw new Error(`Internal server error`);
        } else if (status.code === 400) {
          throw new Error(`Bad request`);
        } else {
          throw new Error(`HTTP error! Status: ${status.code}`);
        }
      }
      return data;
    } catch (error) {
      console.error("Error fetching loan details:", error);
      throw error;
    }
  }

  async createLoan(loanData) {
    console.log("==== inside Create Loan Api Service=====", loanData);

    try {
      console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/loan-mgmt/create-newcust-loan`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.post(endPoint, loanData);

      console.log("Response::", response);
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
      console.error("Error creating loan:", error);
      throw error;
    }
  }

  async getAllLoanDetails() {
    try {
      console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/loan-mgmt/loan-details`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.get(endPoint);
      console.log("Response:", response);
      const { status, data } = response;
      if (status.code !== 200) {
        throw new Error(`HTTP error! Status: ${status.code}`);
      }
      return data;
    } catch (error) {
      console.error("Error fetching all loan details:", error);
      throw error;
    }
  }

  async getDashboardData() {
    try {
      console.log("Base URL:", envVariables.backendURL);
      const endPoint = `${envVariables.backendURL}/loan-mgmt/dashboard`;
      console.log("Endpoint:", endPoint);
      const response = await this.httpClient.get(endPoint);
      console.log("Response:", response);
      const { status, data } = response;
      if (status.code !== 200) {
        throw new Error(`HTTP error! Status: ${status.code}`);
      }
      return data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  }
}

export default LoanService;

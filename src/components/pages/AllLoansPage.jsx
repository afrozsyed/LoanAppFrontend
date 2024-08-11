import React, { useEffect, useState } from "react";
import { InputText, TableComp } from "../componentLib";
import { set, useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoanService from "../../services/Loan.service";
import FetchClient from "../../serviceClient/Fetch.Client";

function AllLoansPage() {
  const [allLoans, setAllLoans] = useState([]);
  const [selectedLoanDetails, setSelectedLoanDetails] = useState({
    accountNumber: "",
    principalAmount: "",
    outstandingPrincipal: "",
    interestRate: "",
    actualTenure: "",
    startDate: "",
    emiAmount: "",
    lastPaymentDate: "",
    nextPaymentDate: "",
    guarantorName: "",
    guarantorPhoneNumber: "",
    guarantorAadharNumber: "",
    status: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
    aadharNumber: "",
    gender: "",
    vehicleType: "",
    model: "",
    engineNumber: "",
    chassisNumber: "",
    vehicleNumber: "",
    insurance: "",
  });

  const { register, reset } = useForm({
    defaultValues: selectedLoanDetails,
  });
  const navigate = useNavigate();

   // fetching the details from service and setting the state variables
   useEffect(() => {
    console.log("+++++++ Use Effect in get all loans Called ++++++");
  
      const loanService = new LoanService(FetchClient);
      (async () => {
        try {
          const respData = await loanService.getAllLoanDetails();
          console.log(respData);
          console.log("resrpData::", respData);
          setAllLoans(respData);
          console.log("present All Loan Details:::", allLoans);
        //   selecting the first loan data for selection
        
        const selectedCust = respData[0]?.customer;
        const selectedVehicle = respData[0]?.vehicle;
        const initialLoan = { ...respData[0], ...selectedCust, ...selectedVehicle };
        setSelectedLoanDetails(initialLoan);
        reset(initialLoan);
        } catch (error) {
          throw error;
        }
      })();
  }, []);

  // handling the row click
  const handleRowClick = (loan) => {
    console.log("row clicked");
    const selectedCust = loan.customer;
    const selectedVehicle = loan.vehicle;
    const selectedLoan = { ...loan, ...selectedCust, ...selectedVehicle };
    setSelectedLoanDetails(selectedLoan);
    reset(selectedLoan);
  };

  // setting the payment details table
  const tableHeading = [
    { header: "Account Number", accessor: "accountNumber" },
    { header: "Principal Amount", accessor: "principalAmount" },
    { header: "Interest Rate", accessor: "interestRate" },
    { header: "Actual Tenure", accessor: "actualTenure" },
    { header: "Last Payment Date", accessor: "lastPaymentDate" },
    { header: "Next Payment Date", accessor: "nextPaymentDate" },
    { header: "Paid EMIs", accessor: "paidEMIs" },
  ];

    // go to the loan report page for more details
    const goLoanDetailsPage = () => {

      };
  return (
    <div id="loan-report" className="w-full p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold mb-4">
            Loan Details for Account Number: {selectedLoanDetails.accountNumber}
          </h2>
          <button
            onClick={goLoanDetailsPage}
            className="bg-cyan-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-cyan-600"
          >
            more details
          </button>
        </div>
        <hr className="mb-6" />
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Customer Details */}
          <div>
            <InputText
              label="Customer Name"
              type="text"
              readOnly
              {...register("name")}
            />
            <InputText
              label="Customer Phone Number"
              type="text"
              readOnly
              {...register("phoneNumber")}
            />            
            <InputText
              label="Actual Tenure"
              type="text"
              readOnly
              {...register("actualTenure")}
            />
          </div>
          <div>
            <InputText
              label="Outstanding Principal"
              type="text"
              readOnly
              {...register("outstandingPrincipal")}
            />
            <InputText
              label="Interest Rate"
              type="text"
              readOnly
              {...register("interestRate")}
            />
            <InputText
              label="Start Date"
              type="text"
              readOnly
              {...register("startDate")}
            />            
          </div>

          {/* Guarantor Details */}
          <div>
            <InputText
              label="Guarantor Name"
              type="text"
              readOnly
              {...register("guarantorName")}
            />
            <InputText
              label="Guarantor Phone Number"
              type="text"
              readOnly
              {...register("guarantorPhoneNumber")}
            />
            <InputText
              label="EMI Amount"
              type="text"
              readOnly
              {...register("emiAmount")}
            />
          </div>

          {/* Vehicle Details */}
          <div>
            <InputText
              label="Vehicle model"
              type="text"
              readOnly
              {...register("model")}
            />
            <InputText
              label="vehicle Number"
              type="text"
              readOnly
              {...register("vehicleNumber")}
            />
          </div>
        </form>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg pb-6 overflow-x-hidden">
        <TableComp
          tableHeading="Active loans"
          ColumnHeader={tableHeading}
          tableData={allLoans}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export default AllLoansPage;

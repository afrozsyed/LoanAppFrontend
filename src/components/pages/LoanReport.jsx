import React, { useEffect, useState } from "react";
import { InputText, TableComp } from "../componentLib";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoanService from "../../services/Loan.service";
import FetchClient from "../../serviceClient/Fetch.Client";

function LoanReport() {
  const [loanDetails, setLoanDetails] = useState({
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

  const [paymentDetails, setPaymentDetails] = useState([]);
  const [error, setError] = useState("");
  const { register, reset } = useForm({
    defaultValues: loanDetails,
  });
  const { accountNumber } = useParams();
  const navigate = useNavigate();

  // fetching the details from service and setting the state variables
  useEffect(() => {
    console.log("+++++++ Use Effect in Loan Details Called ++++++");
    setError(null);
    if (!accountNumber) {
      setError("Account number not provided.");
      setTimeout(() => navigate("/"), 2000);
    } else {
      console.log(accountNumber);
      const loanService = new LoanService(FetchClient);
      (async () => {
        try {
          const respData = await loanService.getLoanDetails(accountNumber);
          if (!respData) {
            setError("Account number not found.");
            setTimeout(() => navigate("/"), 2000);
            return;
          }
          console.log("resrpData::", respData);
          const { customer, vehicle, payments } = respData;
          setLoanDetails({
            ...loanDetails,
            ...respData,
            ...customer,
            ...vehicle,
          });
          setPaymentDetails(payments);
          console.log("changed payment Details:::", paymentDetails);
          console.log("changed Loan Details:::", loanDetails);
          // setLoanDetails(resp.data);
          reset({ ...loanDetails, ...respData, ...customer, ...vehicle });
        } catch (error) {
          setError("An error occurred while fetching the loan details.");
          setLoanDetails(null);
          setTimeout(() => navigate("/"), 3000);
        }
      })();
    }
  }, [accountNumber, navigate]);

  // setting the payment details table
  const tableHeading = [
    {
      header: "actual Payment Date",
      accessor: "actualPaymentDate",
    },
    {
      header: "payment Date",
      accessor: "paymentDate",
    },
    {
      header: "actualEMI",
      accessor: "actualEMI",
    },
    {
      header: "amount Paid",
      accessor: "amountPaid",
    },
    ,
    {
      header: "interest Component",
      accessor: "interestComponent",
    },
    ,
    {
      header: "principal Component",
      accessor: "principalComponent",
    },
    ,
    {
      header: "payment Mode",
      accessor: "paymentMode",
    },
  ];

  // generating pdf
  const generatePDF = () => {
    const input = document.getElementById("loan-report");
    input.style.boxShadow = "none";
    input.style.padding = "0";
    input.style.margin = "0";
    console.log(input);
    html2canvas(input, {
      scale: 1.5, // Increase scale for better quality
      useCORS: true, // Enable CORS to handle external images
      logging: true, // Enable logging for debugging
      scrollX: 0,
      scrollY: 0,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      // const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // for potrate
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const imgProps = pdf.getImageProperties(imgData);
      const contentWidth = pdfWidth - 20; // 10mm margins on each side
      const contentHeight = (imgProps.height * contentWidth) / imgProps.width;

      let heightLeft = canvas.height;
      let position = 0;

      // Add the image to the PDF in chunks if it exceeds one page
      while (heightLeft > 0) {
        pdf.addImage(
          imgData,
          "PNG",
          10,
          position + 10,
          contentWidth,
          contentHeight
        );
        heightLeft -= pdf.internal.pageSize.getHeight();
        position -= pdf.internal.pageSize.getHeight();

        // Add a new page if there's content remaining
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }
      // Restore the original styles after generating the PDF
      input.style.boxShadow = "";
      input.style.padding = "";
      input.style.margin = "";
      pdf.save(`Loan_Report_${loanDetails.accountNumber}.pdf`);
    });
  };

  // navigate to the Payment Collection Page
  const collectPayment = () => {
    navigate("/paymentCollection", { state: { accountNumber: accountNumber , customerName: loanDetails.name} });
  };

  return (
    <div id="loan-report" className="w-full p-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-semibold mb-4">
            Loan Details for Account Number: {accountNumber}
          </h2>
          <div>
            <button
              onClick={collectPayment}
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg shadow-md mr-2 hover:bg-cyan-600"
            >
              Collect Payment
            </button>
            <button
              onClick={generatePDF}
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-cyan-600"
            >
              Save as PDF
            </button>
          </div>
        </div>
        <hr className="mb-6" />
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Customer Details */}
          <div>
            <h3 className="text-xl font-medium mb-4">Customer Details</h3>
            <InputText
              label="Customer Name"
              type="text"
              readOnly
              {...register("name")}
            />
            <InputText
              label="Customer Email"
              type="text"
              readOnly
              {...register("email")}
            />
            <InputText
              label="Customer Phone Number"
              type="text"
              readOnly
              {...register("phoneNumber")}
            />
            <InputText
              label="Customer Address"
              type="text"
              readOnly
              {...register("address")}
            />
            <InputText
              label="Date of Birth"
              type="text"
              readOnly
              {...register("dateOfBirth")}
            />
            <InputText
              label="Gender"
              type="text"
              readOnly
              {...register("gender")}
            />
            <InputText
              label="Aadhar Number"
              type="text"
              readOnly
              {...register("aadharNumber")}
            />
          </div>

          {/* Loan Details */}
          <div>
            <h3 className="text-xl font-medium mb-4">Loan Details</h3>
            <InputText
              label="Principal Amount"
              type="text"
              readOnly
              {...register("principalAmount")}
            />
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
              label="Actual Tenure"
              type="text"
              readOnly
              {...register("actualTenure")}
            />
            <InputText
              label="Start Date"
              type="text"
              readOnly
              {...register("startDate")}
            />
            <InputText
              label="EMI Amount"
              type="text"
              readOnly
              {...register("emiAmount")}
            />
            <InputText
              label="Last Payment Date"
              type="text"
              readOnly
              {...register("lastPaymentDate")}
            />
            <InputText
              label="Next Payment Date"
              type="text"
              readOnly
              {...register("nextPaymentDate")}
            />
          </div>

          {/* Guarantor Details */}
          <div>
            <h3 className="text-xl font-medium mb-4">Guarantor Details</h3>
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
              label="Guarantor Address"
              type="text"
              readOnly
              {...register("guarantorAddress")}
            />
            <InputText
              label="Guarantor Aadhar Number"
              type="text"
              readOnly
              {...register("guarantorAadharNumber")}
            />
            <InputText
              label="Loan Status"
              type="text"
              readOnly
              {...register("status")}
            />
          </div>

          {/* Vehicle Details */}
          <div>
            <h3 className="text-xl font-medium mb-4">Vehicle Details</h3>
            <InputText
              label="Vehicle Type"
              type="text"
              readOnly
              {...register("vehicleType")}
            />
            <InputText
              label="Vehicle model"
              type="text"
              readOnly
              {...register("model")}
            />
            <InputText
              label="Vehicle engine Number"
              type="text"
              readOnly
              {...register("engineNumber")}
            />
            <InputText
              label="Vehicle chassis Number"
              type="text"
              readOnly
              {...register("chassisNumber")}
            />
            <InputText
              label="vehicle Number"
              type="text"
              readOnly
              {...register("vehicleNumber")}
            />
            <InputText
              label="insurance Details"
              type="text"
              readOnly
              {...register("insurance")}
            />
          </div>
        </form>
      </div>

      <div className="w-full bg-white shadow-lg rounded-lg pb-6 overflow-x-hidden">
        <TableComp
          tableHeading="Payment Details"
          ColumnHeader={tableHeading}
          tableData={paymentDetails}
        />
      </div>
    </div>
  );
}

export default LoanReport;

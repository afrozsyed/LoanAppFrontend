import React from 'react';
import { useLocation } from "react-router-dom";
import {TableComp} from "../componentLib";

function LoanReportPrint() {
    const { state } = useLocation();
    const { loanDetails, paymentDetails } = state || {};
  
    if (!loanDetails) {
      return <div>No data available to print.</div>;
    }
  
    return (
        <div className="print-container p-8">
          {/* Company Details */}
          <div className="company-details text-center mb-8">
            <h1 className="text-4xl font-bold">Your Company Name</h1>
            <p className="text-lg">Company Address Line 1</p>
            <p className="text-lg">Company Address Line 2</p>
            <p className="text-lg">Contact Number: +123456789</p>
          </div>
    
          {/* Loan and Customer Details */}
          <div className="details-section mb-8">
            <h2 className="text-2xl font-semibold mb-4">Customer and Loan Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Customer Name:</strong> {loanDetails.name}</p>
                <p><strong>Email:</strong> {loanDetails.email}</p>
                <p><strong>Phone Number:</strong> {loanDetails.phoneNumber}</p>
                <p><strong>Address:</strong> {loanDetails.address}</p>
              </div>
              <div>
                <p><strong>Account Number:</strong> {loanDetails.accountNumber}</p>
                <p><strong>Principal Amount:</strong> {loanDetails.principalAmount}</p>
                <p><strong>Outstanding Principal:</strong> {loanDetails.outstandingPrincipal}</p>
                <p><strong>Interest Rate:</strong> {loanDetails.interestRate}</p>
              </div>
            </div>
          </div>
    
          {/* Payment Details Table */}
          <div className="payment-details-section mb-8">
            <TableComp
              tableHeading="Payment Details"
              ColumnHeader={[
                { header: "Actual Payment Date", accessor: "actualPaymentDate" },
                { header: "Payment Date", accessor: "paymentDate" },
                { header: "Actual EMI", accessor: "actualEMI" },
                { header: "Amount Paid", accessor: "amountPaid" },
                { header: "Interest Component", accessor: "interestComponent" },
                { header: "Principal Component", accessor: "principalComponent" },
                { header: "Payment Mode", accessor: "paymentMode" },
              ]}
              tableData={paymentDetails}
            />
          </div>
    
          {/* Signature Section */}
          <div className="signature-section text-center mt-12">
            <p>Authorized Signature</p>
            <div className="signature-line mt-4 mb-8 h-px bg-black w-1/2 mx-auto"></div>
          </div>
    
          {/* Print Button */}
          <div className="print-button text-center">
            <button
              onClick={() => window.print()}
              className="bg-cyan-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-cyan-600"
            >
              Print
            </button>
          </div>
        </div>
      );
}

export default LoanReportPrint
import React from "react";
import { useLocation } from "react-router-dom";

function PaymentReceipt() {
    const location = useLocation();
    const { receiptDetails } = location.state || {};
    // receiptDetails ={
    //     AccountNumber: "35",
    //     amountPaid: "2000",
    //     interestComponent: 83.49,
    //     nextPaymentDate: "1970-02-01T00:00:00.000Z",
    //     outstandingPrincipal: 8102.67,
    //     paymentMode: "Cash",
    //     principalComponent: 1916.5,
    //     remainingEMIs: 9,
    // }
    const {
        AccountNumber,
        amountPaid,
        interestComponent,
        nextPaymentDate,
        outstandingPrincipal,
        paymentMode,
        principalComponent,
        remainingEMIs,
    } = receiptDetails;

    const formattedNextPaymentDate = new Date(nextPaymentDate).toLocaleDateString();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 border border-black">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-black uppercase">Raghava Finance Services</h2>
                <p className="text-sm text-black">5-6-34, Subhash Road, Machilipatnam, Andhara Pradesh - 521001</p>
                <p className="text-sm text-black">Phone: 9876543210 | Email: info@company.com</p>
            </div>

            <hr className="mb-4 border-black" />

            {/* Payment Details */}
            <div className="mb-4 text-black text-sm">
                <div className="flex justify-between">
                    <div>
                        <p><strong>Account Number:</strong> {AccountNumber}</p>
                        <p><strong>Payment Mode:</strong> {paymentMode}</p>
                    </div>
                    <div>
                        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                        <p><strong>Next Payment Date:</strong> {formattedNextPaymentDate}</p>
                    </div>
                </div>
            </div>

            <table className="w-full text-sm text-left border border-black">
                <thead className="text-black border border-black">
                    <tr>
                        <th className="border border-black px-2 py-1">S.No</th>
                        <th className="border border-black px-2 py-1">Description</th>
                        <th className="border border-black px-2 py-1">Amount (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-black px-2 py-1">1</td>
                        <td className="border border-black px-2 py-1">Principal Component</td>
                        <td className="border border-black px-2 py-1">{principalComponent.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="border border-black px-2 py-1">2</td>
                        <td className="border border-black px-2 py-1">Interest Component</td>
                        <td className="border border-black px-2 py-1">{interestComponent.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="border border-black px-2 py-1">3</td>
                        <td className="border border-black px-2 py-1">Outstanding Principal</td>
                        <td className="border border-black px-2 py-1">{outstandingPrincipal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="border border-black px-2 py-1">4</td>
                        <td className="border border-black px-2 py-1">Remaining EMIs</td>
                        <td className="border border-black px-2 py-1">{remainingEMIs}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2" className="border border-black px-2 py-1 font-bold text-right">Total Paid</td>
                        <td className="border border-black px-2 py-1 font-bold">₹{amountPaid}</td>
                    </tr>
                </tfoot>
            </table>

            <hr className="my-4 border-black" />

            {/* Footer */}
            <div className="text-center text-black text-sm">
                <p className="font-bold">Thank you for your payment!</p>
                <p><strong>Disclaimer:</strong> Payments once made are non-refundable. Please review your payment details carefully</p>
                <p>Please preserve this receipt for future reference.</p>
            </div>
            <div className="text-center mt-6">
                <button
                    onClick={handlePrint}
                    className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow-md"
                >
                    Print Receipt
                </button>
            </div>
        </div>
    );
}

export default PaymentReceipt;

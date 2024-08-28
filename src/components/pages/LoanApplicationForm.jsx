import React, { useState } from 'react';
import { CustomerForm, LoanForm, VehicleForm } from '../componentLib';
import LoanService from "../../services/Loan.service";
import FetchClient from "../../serviceClient/Fetch.Client";

function LoanApplicationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      phoneNumber: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      aadharNumber: ''
    },
    vehicle: {
      vehicleType: '',
      model: '',
      engineNumber: '',
      chassisNumber: '',
      vehicleNumber: '',
      insurance: ''
    },
    loan: {
      principalAmount: '',
      interestRate: '',
      tenure: '',
      guarantorName: '',
      guarantorPhoneNumber: '',
      guarantorAddress: '',
      guarantorAadharNumber: ''
    }
  });

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitForm = () => {
    console.log("Form Data Final::::",formData);
    // Handle form submission logic here
    const loanService = new LoanService(FetchClient);
    (async ()=> {
      const loanCreateResp = await loanService.createLoan(formData);
      console.log("==loanCreateResp==>",loanCreateResp);
    })();
    
    alert("Form submitted successfully");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CustomerForm formData={formData} setFormData={setFormData} nextStep={nextStep} />;
      case 2:
        return <VehicleForm formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <LoanForm formData={formData} setFormData={setFormData} prevStep={prevStep} submitForm={submitForm} />;
      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Loan Application Form</h1>
        <div className="text-sm text-gray-500">Step {step} of 3</div>
      </div>
      {renderStep()}
      {/* <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600"
          >
            Back
          </button>
        )}
        {step < 3 && (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 ml-auto"
          >
            Next
          </button>
        )}
      </div> */}
    </div>
  );
}

export default LoanApplicationForm;

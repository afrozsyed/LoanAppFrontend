import React from "react";
import { useForm } from "react-hook-form";
import { InputText, Button } from "../componentLib";

function LoanForm({ formData, setFormData, prevStep, submitForm }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData?.loan,
  });

  console.log("++++formData++",formData);
  

  const onSubmit = (data) => {
    console.log("Form Data:::", formData);
    console.log("loan", data);
    setFormData({ ...formData, loan: data });
    submitForm(); // Un-commented to allow form submission
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-serif px-2 pt-3">Loan Information</h2>
      <hr className="h-1 my-4" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <InputText
            label="Principal amount"
            type="text"
            placeholder="Enter Loan Principal Amount"
            {...register("principalAmount", { required: "Principal amount is required" })}
          />
          {errors.principalAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.principalAmount.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Interest Rate"
            type="text"
            placeholder="Enter Loan Interest Rate"
            {...register("interestRate", { required: "Interest rate is required" })}
          />
          {errors.interestRate && (
            <p className="text-red-500 text-sm mt-1">{errors.interestRate.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Loan Tenure"
            type="text"
            placeholder="Enter Loan Tenure"
            {...register("tenure", { required: "Loan tenure is required" })}
          />
          {errors.tenure && (
            <p className="text-red-500 text-sm mt-1">{errors.tenure.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Guarantor Name"
            type="text"
            placeholder="Enter Loan Guarantor Name"
            {...register("guarantorName", { required: "Guarantor name is required" })}
          />
          {errors.guarantorName && (
            <p className="text-red-500 text-sm mt-1">{errors.guarantorName.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Guarantor Phone Number"
            type="text"
            placeholder="Enter Guarantor Phone Number"
            {...register("guarantorPhoneNumber", {
              required: "Guarantor phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />
          {errors.guarantorPhoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.guarantorPhoneNumber.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Guarantor Address"
            type="text"
            placeholder="Enter guarantor address"
            {...register("guarantorAddress")}
          />
        </div>

        <div>
          <InputText
            label="Guarantor Aadhar Number"
            type="text"
            placeholder="Enter Guarantor Aadhar Number"
            {...register("guarantorAadharNumber", {
              pattern: {
                value: /^[0-9]{12}$/,
                message: "Aadhar number must be 12 digits",
              },
            })}
          />
          {errors.guarantorAadharNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.guarantorAadharNumber.message}</p>
          )}
        </div>

        <div className="col-span-full flex justify-between mt-4">
          <Button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600">
            Back
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoanForm;

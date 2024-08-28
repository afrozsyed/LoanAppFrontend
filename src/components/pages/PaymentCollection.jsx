import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputText, Select, Button } from "../componentLib";
import { useLocation , useNavigate} from "react-router-dom";
import paymentService from "../../services/Payment.service";

function PaymentCollection() {
    const currentDate = new Date().toISOString().split('T')[0];
    const location = useLocation();
    const navigate = useNavigate();
    const { accountNumber, customerName } = location.state || {};
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      accountNumber: "",
      paymentMode: "",
      amountPaid: "",
      paymentDate: currentDate,
    },
  });
  useEffect(()=>{
    if (accountNumber) {
      setValue("accountNumber",accountNumber);
    }
  },[accountNumber,setValue]);
  
  const onSubmit = async (data) => {
    console.log(data);
    const respData = await paymentService.makePayment(data);
    console.log("++++>> resp Data in Payment collection Page::",respData);
    navigate("/paymentRecipt", { state: { receiptDetails: respData} });
    
  }
  console.log(errors);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Payment Collection
      </h2>
      <hr className="mb-6" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Number */}
          <div>
            <InputText
              label="Account Number"
              type="text"
              placeholder="Enter Loan Account Number"
              {...register("accountNumber", { required: true })}
              className="w-full"
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">
                Account number is required.
              </p>
            )}
          </div>

          {/* Payment Mode */}
          <div>
            <Select
              options={["Cash", "Cheque", "Online"]}
              label="Payment Mode"
              {...register("paymentMode", { required: true })}
              className="w-full"
            />
            {errors.paymentMode && (
              <p className="text-red-500 text-sm mt-1">
                Payment mode is required.
              </p>
            )}
          </div>

          {/* Amount Paid */}
          <div>
            <InputText
              label="Amount Paid"
              type="text"
              placeholder="Enter amount paid"
              {...register("amountPaid", { required: true })}
              className="w-full"
            />
            {errors.amountPaid && (
              <p className="text-red-500 text-sm mt-1">
                Amount paid is required.
              </p>
            )}
          </div>

          {/* Payment Date */}
          <div className="lg:col-span-3 md:col-span-2">
            <InputText
              label="Payment Date"
              type="date"
              placeholder="Select payment date"
              {...register("paymentDate", { required: true })}
              className="w-full"
            />
            {errors.paymentDate && (
              <p className="text-red-500 text-sm mt-1">
                Payment date is required.
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-md"
          >
            Submit Payment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PaymentCollection;

import React from "react";
import { useForm } from "react-hook-form";
import { InputText, Button } from "../componentLib";

function VehicleForm({ formData, setFormData, nextStep, prevStep }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData?.vehicle,
  });

  const onSubmit = (data) => {
    console.log("Vehicle Data::::", data);
    setFormData({ ...formData, vehicle: data });
    nextStep();
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-serif px-2 pt-3">Vehicle Information</h2>
      <hr className="h-1 my-4" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <InputText
            label="Vehicle Type"
            type="text"
            placeholder="Enter vehicle type"
            {...register("vehicleType", { required: "Vehicle type is required" })}
          />
          {errors.vehicleType && (
            <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Vehicle Model"
            type="text"
            placeholder="Enter vehicle model"
            {...register("model", { required: "Vehicle model is required" })}
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Engine Number"
            type="text"
            placeholder="Enter vehicle engine number"
            {...register("engineNumber", { required: "Engine number is required" })}
          />
          {errors.engineNo && (
            <p className="text-red-500 text-sm mt-1">{errors.engineNo.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Chassis Number"
            type="text"
            placeholder="Enter vehicle chassis number"
            {...register("chassisNumber", { required: "Chassis number is required" })}
          />
          {errors.chassisNo && (
            <p className="text-red-500 text-sm mt-1">{errors.chassisNo.message}</p>
          )}
        </div>

        <div>
          <InputText
            label="Vehicle Number"
            type="text"
            placeholder="Enter vehicle number"
            {...register("vehicleNumber")}
          />
        </div>

        <div>
          <InputText
            label="Insurance Details"
            type="text"
            placeholder="Enter vehicle insurance details"
            {...register("insurance")}
          />
        </div>

        <div className="col-span-full flex justify-between mt-4">
          <Button type="button" onClick={prevStep} className="bg-gray-500 hover:bg-gray-600">
            Back
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default VehicleForm;

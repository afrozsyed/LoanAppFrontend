import React from "react";
import { useForm } from "react-hook-form";
import { InputText, Select, Button } from "../componentLib";

function CustomerForm({ formData, setFormData, nextStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData?.customer,
  });

  const onSubmit = (data) => {
    console.log("++Customer Data++",data);
    setFormData({ ...formData, customer: data });
    nextStep();
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-serif px-2 pt-3">Customer Information</h2>
      <hr className="h-1 my-4"/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <InputText
            label="Name"
            type="text"
            placeholder="Enter customer name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

          <InputText
            label="Email address"
            type="email"
            placeholder="Enter customer email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          <InputText
            label="Aadhar Number"
            type="text"
            placeholder="Enter customer aadhar number"
            {...register("aadharNumber", {
              required: "Aadhar number is required",
              minLength: {
                value: 12,
                message: "Aadhar number must be 12 digits",
              },
            })}
          />
          {errors.aadhar && <p className="text-red-500 text-sm mt-1">{errors.aadhar.message}</p>}
        </div>

        <div>
          <Select
            options={["Male", "Female", "Other"]}
            label="Gender"
            {...register("gender", { required: "Gender is required" })}
          />
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}

          <InputText
            label="Address"
            type="text"
            placeholder="Enter customer address"
            {...register("address")}
          />
        </div>

        <div>
          <InputText
            label="Phone Number"
            type="text"
            placeholder="Enter phone number"
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}

          <InputText
            label="Date of Birth"
            type="date"
            {...register("dateOfBirth", { required: "Date of birth is required" })}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="col-span-full">
          <Button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CustomerForm;

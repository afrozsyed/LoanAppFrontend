import { useNavigate } from 'react-router-dom';
import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { InputText, Button } from "../componentLib";
import authService from '../../services/Auth.service';
// import AuthService from '../../services/Auth.service';
// import FetchClient from "../../serviceClient/Fetch.Client";
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/authSlice';


function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // const authService = new AuthService(FetchClient);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) =>{
    setError("");
    console.log(data);
    try {
      const respData = await authService.login(data.userName, data.password);
      if (respData.user) {
        console.log(respData.user);
        dispatch(authLogin(respData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-16 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Login"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
      </div>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
          <div className="mb-4">
            <InputText
              label="User Name"
              type="text"
              placeholder="Enter your user name"
              {...register("userName", { required: "User name is required" })}
            />
            {errors.userName && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.userName.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <InputText
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="mt-1 text-red-600 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
               bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;

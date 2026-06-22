"use client";
import React, { useState } from "react";
import CustomInput from "../common/Input/CustomInput";
import Image from "next/image";
import { useAppDispatch } from "@/redux/store";
import { baseUrl } from "@/config";
import { signInRequest } from "@/services/apis/auth";
import { useRouter } from 'next/navigation';
import { loginSuccess } from "@/redux/reducers/auth.reducer";
import { PATH_PAGE } from "@/config/path";

const defaultInputs = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [inputStates, setInputStates] = useState(defaultInputs);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const onChange = (key: string, value: string) => {
    let newState: any = Object.assign({}, inputStates);
    newState[key] = value;
    setInputStates(newState);
  };

  const onSubmit = async () => {
    const newErrors = { ...defaultInputs };
    if (!inputStates.email) newErrors.email = "Required";
    if (!inputStates.password) newErrors.password = "Required";
    setErrors(newErrors);

    if (!inputStates.email || !inputStates.password) return;

    const response = await signInRequest({ email: inputStates.email, password: inputStates.password });
    const { token, user } = response;
    dispatch(loginSuccess({ user: user, token }));
    router.push(PATH_PAGE.dashboard);
  };

  return (
    <div className="flex h-screen min-h-full items-center justify-center px-6 py-12 lg:px-8 ">
      <div className="w-full max-w-lg  rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm ">
          <Image
            width={174}
            height={35}
            src={"/images/logo/logo-dark.svg"}
            alt="Logo"
            priority
          />

          <h2 className="text-gray-900 mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Email
              </label>
              <div className="mt-2">
                <CustomInput
                  type="email"
                  required
                  value={inputStates.email}
                  onChange={(value) => onChange("email", value)}
                  error={
                    errors.email ? "Please provide a valid email address." : ""
                  }
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <CustomInput
                  type="password"
                  required
                  value={inputStates.password}
                  onChange={(value) => onChange("password", value)}
                  error={
                    errors.password ? "Please provide a valid password." : ""
                  }
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="inline-block  w-full max-w-30 rounded-sm border border-primary   bg-primary p-2 text-center text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={onSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

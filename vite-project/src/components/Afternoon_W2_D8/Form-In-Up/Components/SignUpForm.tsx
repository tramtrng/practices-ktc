import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { UserInfo } from "../Pages/AuthPage";

interface FormData {
  name?: string;
  password: string;
  agree?: boolean;
}

export const SignUpForm: React.FC<{
  email: string;
  onSignUp: (data: UserInfo) => void;
}> = ({ email, onSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    onSignUp({
      name: data.name!,
      email,
      password: data.password,
    });
  };

  return (
    <div
      className="w-full max-w-sm h-screen p-8 text-white rounded-2xl shadow-xl bg-cover bg-center flex flex-col justify-center"
      style={{ backgroundImage: "url('/img/20.png')" }}
    >
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <div className="bg-white bg-opacity-20 p-6 rounded-xl">
        <p className="text-gray-300 text-sm mb-4">
          Looks like you don't have an account.
          <br />
          Let’s create a new account for{" "}
          <span className="text-white font-semibold">{email}</span>.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-green-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "View"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              {...register("agree", {
                required: "You must agree to the terms",
              })}
              className="mt-1"
            />
            <label className="text-sm">
              By selecting <strong>Agree and continue</strong>, I agree to{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy Policy</span>.
            </label>
          </div>
          {errors.agree && (
            <p className="text-red-500 text-sm">{errors.agree.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Agree and continue
          </button>
        </form>
      </div>
    </div>
  );
};

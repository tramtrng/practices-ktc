import React from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";

interface Props {
  onContinue: (email: string) => void;
}

export const EmailEntry: React.FC<Props> = ({ onContinue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = (data: { email: string }) => {
    onContinue(data.email);
  };

  return (
    <div
      className="w-full max-w-sm h-screen p-8 text-white rounded-2xl shadow-xl bg-cover bg-center flex flex-col justify-center "
      style={{ backgroundImage: "url('/img/20.png')" }}
    >
      <h2 className="text-2xl font-bold mb-4">Hi!</h2>
      <div className="bg-white bg-opacity-20 p-6 rounded-xl">
        <div className="space-y-6 backdrop-grayscale">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-3 rounded bg-black/40 text-black border border-white/20 focus:border-green-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-gray-400 my-4">or</p>
          <SocialLogin />

          <div className="space-y-2 mt-6">
            <p className="text-sm text-center text-white">
              Don't have an account?{" "}
              <span className="text-green-400 underline cursor-pointer hover:text-green-300">
                Sign up
              </span>
            </p>
            <p className="text-sm text-center text-green-400 cursor-pointer hover:underline hover:text-green-300">
              Forgot your password?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

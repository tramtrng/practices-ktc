import React, { useState } from "react";

interface Props {
  name: string;
  email: string;
}

export const SignInForm: React.FC<Props> = ({ name, email }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div
      className="w-full max-w-sm h-[85vh] p-8 text-white rounded-2xl shadow-xl bg-cover bg-center flex flex-col justify-center "
      style={{ backgroundImage: "url('/img/20.png')" }}
    >
      <h2 className="text-2xl font-bold mb-4">Log in</h2>
      <div className="bg-white bg-opacity-20 p-6 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src="./img/12.jpg"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-white font-semibold">{name}</p>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-green-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "View"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Continue
          </button>
        </form>

        <p className="text-green-400 text-sm mt-3 cursor-pointer hover:underline">
          Forgot your password?
        </p>
      </div>
    </div>
  );
};

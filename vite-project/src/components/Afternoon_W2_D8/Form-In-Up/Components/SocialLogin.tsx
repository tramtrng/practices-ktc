import React from 'react';
import { FaFacebookF, FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const SocialLogin: React.FC = () => {
  return (
    <div className="space-y-3">
      <button className="flex items-center justify-center w-full py-2 bg-white text-black rounded font-medium">
        <FaFacebookF className="mr-2 text-blue-600" /> Continue with Facebook
      </button>
      <button className="flex items-center justify-center w-full py-2 bg-white text-black rounded font-medium">
        <FcGoogle className="mr-2" /> Continue with Google
      </button>
      <button className="flex items-center justify-center w-full py-2 bg-white text-black rounded font-medium">
        <FaApple className="mr-2" /> Continue with Apple
      </button>
    </div>
  );
};

export default SocialLogin;

// src/pages/Login.tsx

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '../useAuthStore';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

interface IFormInput {
  username: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login, error, loggedInUser } = useAuthStore((state) => state);

  useEffect(() => {
    if (loggedInUser) {
      navigate('/tasks');
    }
  }, [loggedInUser, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      username: 'tungnt@softech.vn',
      password: '123456789',
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    login({
      username: data.username,
      password: data.password,
      navigate: navigate,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="username"
              type="email"
              placeholder="you@example.com"
              {...register('username')}
              className={`mt-1 w-full px-4 py-2 rounded-md border transition duration-200 focus:outline-none focus:ring-2 ${
                errors.username
                  ? 'border-red-500 focus:ring-red-200'
                  : dirtyFields.username
                  ? 'border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={`mt-1 w-full px-4 py-2 rounded-md border transition duration-200 focus:outline-none focus:ring-2 ${
                errors.password
                  ? 'border-red-500 focus:ring-red-200'
                  : dirtyFields.password
                  ? 'border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>
        </div>

        <button
  type="submit"
  disabled={isSubmitting || !isValid}
  className={`w-full py-2 text-white rounded-md font-semibold transition duration-300 ${
    isSubmitting || !isValid
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-red-600 hover:bg-red-700'
  }`}
>
  {isSubmitting ? 'Logging in...' : 'Login'}
</button>


        <div className="text-center text-sm mt-4">
          <p className={`font-medium ${isValid ? 'text-green-600' : 'text-red-500'}`}>
            {isValid ? '✓ Form is valid' : '✗ Please correct the errors above'}
          </p>
          {error && (
            <p className="text-red-500 text-xs mt-2">
              Login failed. Please check your credentials.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

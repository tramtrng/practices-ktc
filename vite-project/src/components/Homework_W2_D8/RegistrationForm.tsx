//RegistrationForm.tsx
import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  gender: string;
  dob: string;
  country: string;
  hobbies: string[];
  profilePic: FileList;
  bio: string;
}

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const file = data.profilePic?.[0];
    const displayData = {
      ...data,
      profilePic: file ? file.name : null,
    };
    alert("Form submitted successfully!");
    console.log(displayData);
  };

  const selectedPassword = watch("password");
  const selectedHobbies = watch("hobbies") || [];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">User Registration</h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="font-semibold">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("fullName", {
            required: "Full Name is required",
            minLength: {
              value: 3,
              message: "Full Name must be at least 3 characters",
            },
          })}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="font-semibold">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="font-semibold">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Password must be at least 8 characters with letters and numbers",
            },
          })}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="font-semibold">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
            {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value: string): true | string =>
              value === selectedPassword || "Passwords do not match",
            })}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="font-semibold">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          })}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="mb-4">
        <label className="font-semibold">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 mt-1">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="flex items-center gap-1">
              <input
                type="radio"
                value={g}
                {...register("gender", {
                  required: "Please select a gender",
                })}
              />
              {g}
            </label>
          ))}
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>

      {/* DOB */}
      <div className="mb-4">
        <label className="font-semibold">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
            {...register("dob", {
            required: "Date of birth is required",
            validate: (value: string): true | string => {
              const dob: Date = new Date(value);
              const age: number = new Date().getFullYear() - dob.getFullYear();
              return age >= 18 || "You must be at least 18 years old";
            },
            })}
          className="w-full mt-1 p-2 border rounded-md"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
        )}
      </div>

      {/* Country */}
      <div className="mb-4">
        <label className="font-semibold">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          {...register("country", { required: "Please select a country" })}
          className="w-full mt-1 p-2 border rounded-md"
        >
          <option value="">Select Country</option>
          <option value="Vietnam">Vietnam</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Hobbies */}
      <div className="mb-4">
        <label className="font-semibold">
          Hobbies <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 mt-1">
          {["Reading", "Traveling", "Gaming"].map((hobby) => (
            <label key={hobby} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={hobby}
                {...register("hobbies", {
                  validate: () =>
                    selectedHobbies.length > 0 ||
                    "Select at least one hobby",
                })}
              />
              {hobby}
            </label>
          ))}
        </div>
        {errors.hobbies && (
          <p className="text-red-500 text-sm mt-1">{errors.hobbies.message}</p>
        )}
      </div>

      {/* Profile Picture */}
      <div className="mb-4">
        <label className="font-semibold">Profile Picture</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
            {...register("profilePic", {
            validate: (files: FileList) => {
              const file: File | undefined = files?.[0];
              if (!file) return true;
              const validTypes: string[] = ["image/jpeg", "image/jpg", "image/png"];
              return (
              validTypes.includes(file.type) || "Invalid file type"
              );
            },
            })}
          className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1"
        />
        {errors.profilePic && (
          <p className="text-red-500 text-sm mt-1">
            {errors.profilePic.message}
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label className="font-semibold">Bio</label>
        <textarea
          maxLength={300}
          {...register("bio")}
          className="w-full mt-1 p-2 border rounded-md"
        />
        <p className="text-right text-sm text-gray-500">
          {300 - (watch("bio")?.length || 0)} characters remaining
        </p>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;

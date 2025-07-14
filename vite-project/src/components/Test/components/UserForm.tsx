import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

interface FormData {
  name: string;
  email: string;
  age?: number | string;
}

export default function UserForm() {
  
  const { addUser } = useContext(UserContext)!;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    addUser({
      name: data.name,
      email: data.email,
      age: data.age === "" ? undefined : Number(data.age),
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow flex flex-col gap-5"
    >
      <h3 className="text-xl font-bold text-blue-600 text-center mb-2">Add New User</h3>
      <div>
        <label className="block font-semibold mb-1">Name:</label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Minimum 2 characters" },
          })}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email",
            },
          })}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block font-semibold mb-1">Age:</label>
        <input
          type="number"
          {...register("age", {
            validate: (v) => v === undefined || v === "" || parseFloat(String(v)) > 0 || "Age must be positive",
          })}
          className={`w-full px-3 py-2 border rounded ${
            errors.age ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter age (optional)"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}
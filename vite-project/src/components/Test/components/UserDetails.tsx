import { useParams } from "react-router";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function UserDetails() {
  const { id } = useParams();
  const { users } = useContext(UserContext)!;
  const user = users.find(u => String(u.id) === id);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg text-center">
        <h3 className="text-2xl font-bold text-red-500 mb-4">User not found</h3>
        <p className="text-gray-500">Please check the user ID or return to the user list.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
          {user.name[0]}
        </span>
        <h3 className="text-2xl font-bold text-blue-700">👤 {user.name}</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-600 w-20">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-600 w-20">Age:</span>
          <span className="text-gray-800">{user.age ?? "N/A"}</span>
        </div>
      </div>
      </div>
    );
    }
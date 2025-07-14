import { useContext } from "react";
import { UserContext } from "./UserProvider";
import type { User } from "./UserProvider";
import { Link } from "react-router";

export default function UserList() {
  const { users } = useContext(UserContext)!;

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg text-center font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
        User List
      </h3>
      {users.length === 0 ? (
        <p className="text-gray-400 text-center">No users yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {users.map((user: User) => (
            <li key={user.id} className="py-4 flex items-center gap-4">
              <Link
                to={`/users/${user.id}`}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg hover:bg-blue-200 transition"
                title={`View details for ${user.name}`}
              >
                {user.name[0]}
              </Link>
              <div className="flex-1">
                <div className="font-semibold text-gray-700 text-base">
                  <span className="text-sm">Name:</span>{" "}
                  <Link
                    to={`/users/${user.id}`}
                    className="hover:underline text-blue-700 font-semibold"
                  >
                    {user.name}
                  </Link>
                </div>
                <div className="text-gray-700 text-sm">
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div className="text-gray-700 text-sm">
                  <span className="font-medium">Age:</span> {user.age ?? "N/A"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
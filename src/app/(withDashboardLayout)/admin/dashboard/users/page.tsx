"use client";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "@/services/user";
import { IUser } from "@/types/user";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const UserPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const openModal = (user: IUser) => {
    setSelectedUser(user);
    setModalOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
    setError(null);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Failed to delete user. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="p-4 relative">
      <h1 className="text-2xl text-center font-bold my-8">All Users</h1>

      {/* 🔍 Search Field */}
      <div className="mb-5 flex justify-end">
        <div className="relative w-full md:w-96">
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search by name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
        w-full pl-10 pr-4 py-2.5
        rounded-xl border border-gray-300
        bg-white shadow-sm
        text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition
      "
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">{user.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => openModal(user)}
                      className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Centered modal without background darkening */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-[350px] max-w-full">
            <h2 className="text-xl font-bold mb-3">Delete User</h2>
            <p className="text-sm mb-4">
              Are you sure you want to delete{" "}
              <strong>{selectedUser.name}</strong>?
            </p>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 cursor-pointer py-2 rounded-lg border border-gray-300 text-sm 
               transition transform hover:bg-gray-100 hover:scale-105 hover:shadow-md"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 cursor-pointer py-2 rounded-lg bg-red-600 text-white text-sm 
               transition transform hover:bg-red-700 hover:scale-105 hover:shadow-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;

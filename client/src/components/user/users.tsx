"use client";

import { useState, useEffect } from "react";
import UserHeader from "../header";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userIdFilter, setUserIdFilter] = useState<number | undefined>(
    undefined
  );

  // Function that fetch users
  const fetchUsers = async (id?: number) => {
    const url = id
      ? `http://localhost:8080/users/${id}`
      : "http://localhost:8080/users";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setUsers([]);
        return;
      }
      const data = await response.json();
      console.log(response);
      setUsers(id ? [data] : data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load users with useEffect
  useEffect(() => {
    fetchUsers(userIdFilter); // If there is an id, load the user by id
  }, [userIdFilter]);

  // Delete user function
  const deleteUser = async (id: number) => {
    try {
      // DELETE isteği gönderme
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("User can not be able to delete");
      }
      setUsers(users.filter((user) => user.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  // User information update function
  const handleUpdate = async () => {
    if (editingUser) {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${editingUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingUser),
          }
        );

        if (!response.ok) {
          throw new Error("User could not be updated");
        }

        setUsers(
          users.map((user) => (user.id === editingUser.id ? editingUser : user))
        );
        setEditingUser(null);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  // onChange handlers when updating user information
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "email"
  ) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [field]: e.target.value,
      });
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value, 10);
    setUserIdFilter(isNaN(id) ? undefined : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/4">
        <h2 className="text-2xl font-semibold text-center mb-6">Users</h2>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Search by User ID"
            className="p-2 border border-gray-300 rounded"
            onChange={handleFilterChange}
          />
        </div>
        <div className="overflow-x-auto">
          <UserHeader />
          {/* User rows */}
          {users.length === 0 ? (
            <div className="py-4 px-2">User can not be found!</div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="w-full flex items-center border-b h-16 hover:bg-slate-50 px-4 rounded-lg"
              >
                {editingUser?.id === user.id ? (
                  <>
                    <div className="w-1/12 px-4">
                      <span>{user.id}</span>
                    </div>
                    <div className="w-4/12 px-4">
                      <input
                        type="text"
                        className="py-2 px-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full bg-gray-300 rounded-md"
                        value={editingUser.name}
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                    </div>
                    <div className="w-4/12 px-4">
                      <input
                        type="text"
                        className="py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full bg-gray-300 rounded-md"
                        value={editingUser.email}
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                    </div>
                  </>
                ) : (
                  <Link
                    href={`users/${user.id}`}
                    className="flex w-full mx-4 text-left gap-16 h-full items-center transition-all duration-150"
                  >
                    <div className="w-1/12">{user.id}</div>
                    <div className="w-4/12">{user.name}</div>
                    <div className="w-7/12">{user.email}</div>
                  </Link>
                )}
                <div className="w-3/12 flex gap-4 justify-end px-4">
                  {editingUser?.id === user.id ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => setEditingUser(user)}
                    >
                      Update
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;

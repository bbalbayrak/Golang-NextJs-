"use client";

import { useState, useEffect, use } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserDetail = ({ params }: { params: any }) => {
  const { id }: { id: any } = use(params);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(id);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:8080/users/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Kullanıcı bulunamadı");
          }
          const data = await response.json();
          setUser(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!user) return <div>User can not be found !</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-4/5 lg:w-3/4">
        <h2 className="text-2xl font-semibold text-center mb-6">
          User Details
        </h2>
        <div className="mb-4">
          <div>ID: {user.id}</div>
          <div>User Name: {user.name}</div>
          <div>Email: {user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

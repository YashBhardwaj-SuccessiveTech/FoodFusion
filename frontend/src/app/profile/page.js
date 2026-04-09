"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const UpdateProfile = () => {
  const router = useRouter();
  const { token, userid } = useAuth(); // assuming AuthContext stores logged-in userId
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Prefetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          const user = res.data.user;
          setFirstName(user.FirstName);
          setLastName(user.LastName);
          setEmail(user.email);
        }
      } catch (error) {
        console.error(error);
        alert("Some problem in fetching user data");
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      fetchUser();
    }
  }, [userid, token]);

  // Update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(
        `/updateuser`,
        {
          FirstName: firstName,
          LastName: lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      router.push("/"); 
    } catch (error) {
      console.error(error);
      alert("Error updating profile, try again later");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-100 flex items-start justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>
        <form className="space-y-4" onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

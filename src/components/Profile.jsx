import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../context";

function Profile() {
  const { id } = useParams();
  const { users } = useUser();
  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-[0_0_0_100vmax] shadow-gray-800 [clip-path:inset(0_-100vmax)]">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
              <h1 className="text-xl font-bold">Geo 🌏</h1>
              <Link to={'/'} className="text-lg font-semibold hover:text-blue-400 transition">Home</Link>
            </div>
          </nav>

      {users?.length > 0 ? users.map(
        (profile) =>
          profile.id === Number(id) && (
            <div
              key={profile.id}
              className="bg-gray-700 mt-10 mx-10 flex flex-col items-center px-10 py-8 rounded-lg text-white shadow-lg hover:shadow-xl transition"
            >
              <img
                src={profile.image}
                alt={profile.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-md mb-4"
              />
              <h3 className="text-2xl font-semibold my-2 text-center text-blue-400">
                {profile.name}
              </h3>
              <p className="text-center text-lg text-gray-300 mb-4">
                {profile.description}
              </p>

              <div className="flex flex-col items-center mt-4 space-y-2">
                <p className="text-sm text-gray-200">
                  <span className="font-medium text-blue-400">City:</span>{" "}
                  {profile.address.city}
                </p>
                <p className="text-sm text-gray-200">
                  <span className="font-medium text-blue-400">Country:</span>{" "}
                  {profile.address.country}
                </p>
              </div>

              <div className="mt-6 bg-gray-800 p-4 rounded-lg w-fit text-gray-300 shadow-md sm:w-1/3 text-center">
                <h4 className="text-lg font-medium text-blue-400 mb-2">
                  Coordinates
                </h4>
                <p className="text-sm">Latitude: {profile.address.latitude}</p>
                <p className="text-sm">Longitude: {profile.address.longitude}</p>
              </div>
            </div>
          )
      ): <h1 className="text-red-500 sm:text-xl text-center">No users available. Please check the data source or try again later.</h1>}
    </>
  );
}

export default Profile;

import React, { useState } from "react";
import { useUser } from "../context";
import { Link } from "react-router-dom";
import {Form} from "./index";

function AdminForm() {
  const [info, setInfo] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(true);
  const { users, deleteUser } = useUser();

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleEdit = (id) => {
    setInfo(users.find((user) => user.id === id));
    setShowList(false);
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-[0_0_0_100vmax] shadow-gray-800 [clip-path:inset(0_-100vmax)]">
        <div className="container mx-auto flex justify-between flex-wrap items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Link
            to="/"
            className="text-lg font-semibold hover:text-blue-400 transition"
          >
            Home
          </Link>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <div className="flex justify-start mb-4">
          {showList ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {!showForm ? "Close Form" : "Add User"}
            </button>
          ) : (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              onClick={() => {
                setInfo({});
                setShowList(true);
              }}
            >
              Back
            </button>
          )}
        </div>
        {showForm && showList && (
          <ul className={`${users?.length > 0 && 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'}`}>
            {users?.length > 0 ? users?.map((user, index) => (
              <li
                key={index}
                className="bg-gray-700 text-white rounded-lg shadow-lg"
              >
                <div className="p-6 flex flex-col items-center">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-16 h-16 object-cover rounded-full mb-4 border-2 border-gray-500"
                  />
                  <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                  <p className="text-sm text-gray-300 mb-4 text-center">
                    {user.description}
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            )):<h1 className="text-red-500 sm:text-xl text-center">No users available. Please check the data source or try again later.</h1>}
          </ul>
        )}
        {!showList && <Form user={info} />}
        {!showForm && <Form />}
      </div>
    </>
  );
}

export default AdminForm;

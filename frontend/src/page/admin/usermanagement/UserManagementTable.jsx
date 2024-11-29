import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const UserManagementTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 border">Name</th>
            <th className="px-4 py-3 border">Email</th>
            <th className="px-4 py-3 border">Address</th>
            <th className="px-4 py-3 border">Phone</th>
            <th className="px-4 py-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{user?.name}</td>
              <td className="px-4 py-2 border">{user?.email}</td>
              <td className="px-4 py-2 border">{user?.address}</td>
              <td className="px-4 py-2 border whitespace-nowrap">{user?.phone}</td>
              <td className="px-4 py-2 border flex items-center justify-around">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FaRegEdit size={20} />
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="text-red-500 hover:underline"
                >
                  <MdDeleteForever size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;

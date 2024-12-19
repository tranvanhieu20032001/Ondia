import React from "react";

function WarrantyManagementTable({ warranties, onEdit, onDelete }) {
  return (
    <div className="p-4 border rounded my-4">
      {warranties.length === 0 ? (
        <p className="text-gray-500 text-sm">Không có dữ liệu hiển thị.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300 text-xs text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Name</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Description</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Type</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Duration</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Coverage</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Terms</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {warranties.map((warranty) => (
              <tr key={warranty._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">{warranty.name}</td>
                <td className="border border-gray-300 px-2 py-1">{warranty.description}</td>
                <td className="border border-gray-300 px-2 py-1">{warranty.warrantyType}</td>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">
                  {warranty.duration} {warranty.durationUnit}
                </td>
                <td className="border border-gray-300 px-2 py-1">{warranty.coverage}</td>
                <td className="border border-gray-300 px-2 py-1">{warranty.terms}</td>
                <td className="border border-gray-300 px-2 py-1 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(warranty)}
                    className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 text-xs"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(warranty._id)}
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WarrantyManagementTable;

import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import anh from "../../../assets/images/products/iphon15prm.jpg";

const ProductManagementTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-3 border">Ảnh</th>
            <th className="px-4 py-3 border">Tên</th>
            <th className="px-4 py-3 border">Kho</th>
            <th className="px-4 py-3 border">Giá</th>
            <th className="px-4 py-3 border">Danh mục</th>
            <th className="px-4 py-3 border">Thẻ</th>
            <th className="px-4 py-3 border">Ngày thêm</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product?._id} className="hover:bg-gray-100">
              <td className="px-2 py-2 border">
                <img src={product?.images[0]} alt="" className="h-10 w-10" />
              </td>
              <td className="px-4 py-2 border">{product?.name}</td>
              <td className="px-4 py-2 border">{product?.sl}</td>
              <td className="px-4 py-2 border">{product?.gia}</td>
              <td className="px-4 py-2 border">{product?.the}</td>
              <td className="px-4 py-2 border">{product?.createdAt}</td>
              <td className="px-4 py-2 border flex items-center justify-around">
                <button
                  // onClick={() => onEdit(user)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <FaRegEdit size={20} />
                </button>
                <button
                  // onClick={() => onDelete(user)}
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

export default ProductManagementTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendDomain, SummaryApi } from "../../common";
import LoadingPage from "../loading/LoadingPage";

function ViewOrder({ order, onClose }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductById = async (productId) => {
    setLoading(true);
    try {
      const url = SummaryApi.getProductById.url.replace(":id", productId);
      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
      return dataApi.product;
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      setTimeout(() => setLoading(false), 600);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await Promise.all(
        order.products.map((product) => getProductById(product?.product))
      );
      setProducts(productData);
    };

    if (order?.products?.length > 0) {
      fetchProducts();
    }
  }, [order]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-medium mb-4">Order Details</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Order ID
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Date
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Ship To
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Điện thoại
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Email
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Thanh toán
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Tạm tính
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Giảm giá
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Tổng tiền
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order._id}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r whitespace-nowrap">
                {new Date(order.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order.shippingAddress}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order.phone}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order.email}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order.paymentMethod}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {" "}
                {order?.subPrice ? order?.subPrice.toLocaleString() : "N/A"} VND
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order.discount <= 100
                  ? `${order.discount}%`
                  : `${order.discount}đ`}
              </td>
              <td className="px-2 py-3 text-xs text-gray-700 border-r">
                {order?.totalPrice ? order?.totalPrice.toLocaleString() : "N/A"}{" "}
                VND
              </td>
              <td className="px-2 py-3 text-xs">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.orderStatus === "Pending"
                      ? "bg-gray-100 text-gray-600"
                      : order.orderStatus === "Processing"
                      ? "bg-blue-100 text-blue-600"
                      : order.orderStatus === "Shipped"
                      ? "bg-orange-100 text-orange-600"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : ""
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Hiển thị chi tiết các sản phẩm trong table */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-2">Products</h3>
          <table className="min-w-full table-auto border-t border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Image
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Price
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Quantity
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Total
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Warranty Code
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td className="px-2 py-3 text-xs text-gray-700 border">
                      {product?.images?.length > 0 && (
                        <img
                          src={`${backendDomain}/${product.images[0]}`}
                          alt={product?.name}
                          className="w-14 h-14"
                        />
                      )}
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 border">
                      {product?.name}
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 border">
                      {order?.products[index]?.price?.toLocaleString()}đ
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 border">
                      {order?.products[index]?.quantity}
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 border">
                      {(
                        order?.products[index]?.price *
                        order?.products[index]?.quantity
                      )?.toLocaleString()}{" "}
                      đ
                    </td>
                    <td className="px-2 py-3 text-xs text-gray-700 border">
                      {order?.products[index]?.codeWarranty}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-sm text-gray-500 text-center px-2 py-3"
                  >
                    No product details available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ViewOrder;
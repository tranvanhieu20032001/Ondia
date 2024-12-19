import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { SummaryApi } from "../../common";

function OrderReceived() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  const showOrder = async (orderId) => {
    try {
      const response = await axios({
        url: SummaryApi.getOrderById.url.replace(":id", orderId),
        method: SummaryApi.getOrderById.method,
        withCredentials: true,
      });
      setOrderDetails(response.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      showOrder(id);
    }
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-0 py-10">
      <div className="bg-green-100 text-center text-green-800 p-6">
        <div className="flex items-center gap-4 justify-center">
          <IoMdCheckmarkCircleOutline size={50} />
          <h2 className="text-xl font-semibold">Payment Successful!</h2>
        </div>
        <p className="mt-2">
          Thank you for your order! Your payment has been processed successfully.
        </p>
      </div>

      {orderDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-green-800">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Order Number:</span> # {orderDetails._id}
            </div>
            <div>
              <span className="font-semibold">Payment Method:</span>{" "}
              {orderDetails.paymentMethod}
            </div>
            <div>
              <span className="font-semibold">Shipping Address:</span>{" "}
              {orderDetails.shippingAddress}
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {orderDetails.phone}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">Loading order details...</div>
      )}

      <div className="flex justify-between">
        <Link
          to="/"
          className="text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md"
        >
          Go to Homepage
        </Link>
        <Link
          to="/myaccount/orders"
          className="text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderReceived;

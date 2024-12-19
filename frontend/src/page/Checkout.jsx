import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import BillingDetails from "../components/checkout/BillingDetails";
import YourOrder from "../components/checkout/YourOrder";
import Context from "../context";
import LoadingPage from "../components/loading/LoadingPage";
import { toast } from "react-toastify";
import CouponForm from "./Cart/CouponForm";
import { SummaryApi } from "../common";

function Checkout() {
  const { userData } = useContext(Context);
  const { setCart } = useContext(Context);
  const { state } = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billingData, setBillingData] = useState({});
  const [coupon, setCoupon] = useState(null);

  const userDetails = useSelector((state) => state?.user?.user?.user);

  // Fetch user data
  const fetchUser = async (id) => {
    try {
      const url = SummaryApi.getUser.url.replace(":id", id);
      const { data } = await axios({
        url,
        method: SummaryApi.getUser.method,
        withCredentials: true,
      });
      setUser(data.user);
    } catch (error) {
      console.error("Failed to load user data:", error);
      toast.error("Không thể tải thông tin người dùng.");
    }
  };

  // Fetch cart products
  const fetchCartProducts = async () => {
    try {
      const { data } = await axios({
        url: SummaryApi.getCart.url,
        method: SummaryApi.getCart.method,
        withCredentials: true,
      });
      setOrders(data.cart.products);
    } catch (error) {
      console.error("Error fetching cart products:", error);
      toast.error("Không thể tải giỏ hàng. Vui lòng thử lại.");
    }
  };

  // Fetch single product by ID
  const fetchProductById = async (productId) => {
    try {
      const url = SummaryApi.getProductById.url.replace(":id", productId);
      const { data } = await axios({
        url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      setOrders([
        {
          product: data.product,
          quantity: state.quantity,
        },
      ]);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      toast.error("Không thể tải thông tin sản phẩm.");
    }
  };

  // Validate billing inputs
  const validateInputs = () => {
    const errors = {};
    if (!billingData?.name) errors.name = "Tên là bắt buộc.";
    if (!billingData?.address) errors.address = "Địa chỉ là bắt buộc.";
    if (!billingData?.phone) {
      errors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^[0-9]{10}$/.test(billingData.phone)) {
      errors.phone = "Số điện thoại sai định dạng.";
    }
    if (!billingData?.email) {
      errors.email = "Email là bắt buộc.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingData.email)) {
      errors.email = "Email sai định dạng.";
    }
    return errors;
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!userData) {
      toast.error("Bạn phải đăng nhập để mua hàng");
      return;
    }
    setLoading(true);

    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({}); // Clear previous errors

    const formattedProducts = orders.map((order) => {
      const price =
        order.product.saleprice !== 0
          ? order.product.saleprice
          : order.product.price;

      return {
        product: order.product._id,
        quantity: order.quantity,
        price: price,
        variant: order.variant?._id,
      };
    });


    const checkoutData = {
      products: formattedProducts,
      shippingAddress: billingData?.address,
      phone: billingData?.phone,
      email: billingData?.email,
      discount: coupon?.value || 0,
      paymentMethod: "Cash on delivery",
    };

    try {
      const response = await axios({
        url: SummaryApi.createOrder.url,
        method: SummaryApi.createOrder.method,
        data: checkoutData,
        withCredentials: true,
      });

      toast.success("Đặt hàng thành công!");

      if (!state?.id) {
        await axios({
          url: SummaryApi.clearCart.url,
          method: SummaryApi.clearCart.method,
          withCredentials: true,
        });
        setCart([]);
      }

      setTimeout(() => {
        setLoading(false);
        navigate(`/cart/checkout/order-received/${response?.data?.order?._id}`);
      }, 800);
    } catch (error) {
      setLoading(false);
      console.error("Error during checkout:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (userDetails?.userId) {
      fetchUser(userDetails.userId);
    } else {
      console.error("User details are missing.");
    }
  }, [userDetails?.userId]);

  useEffect(() => {
    if (state?.id) {
      fetchProductById(state.id);
    } else {
      fetchCartProducts();
    }
  }, [state?.id]);

  const getDiscountByName = async (name) => {
    try {
      const response = await axios({
        url: SummaryApi.getDiscountByName.url,
        method: SummaryApi.getDiscountByName.method,
        data: { name },
        withCredentials: true,
      });
      setCoupon(response.data.discount);
    } catch (error) {
      console.error(
        "Error fetching discount:",
        error.response?.data?.message || error.message
      );
      toast.error("Không thể áp dụng mã giảm giá.");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        /
        <Link to="/cart" className="text-gray-500 hover:underline">
          Cart
        </Link>
        /<span>Checkout</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-10 gap-20">
        <div>
          <BillingDetails
            user={user}
            setBillingData={setBillingData}
            errors={errors}
          />
          <CouponForm getDiscountByName={getDiscountByName} />
        </div>
        <div>
          <YourOrder orders={orders} coupon={coupon} />
          <div className="space-y-8 py-4 shadow-md bg-slate-100 px-4">
            <div className="flex items-center">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="cash"
              >
                <input
                  name="checkout"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="cash"
                  checked={true}
                  readOnly
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="cash"
              >
                Cash on delivery
              </label>
            </div>
            <button
              type="button"
              className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide border rounded-md transition 
                ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white"
                }`}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

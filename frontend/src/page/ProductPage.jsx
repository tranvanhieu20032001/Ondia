import React, { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Rating } from "@material-tailwind/react";
import Comment from "../components/layouts/Comment";
import { Link, useLocation } from "react-router-dom";
import freedelivery from "../assets/icons/FreeDelivery.svg";
import ReturnDelivery from "../assets/icons/Return.svg";
import axios from "axios";
import { backendDomain, SummaryApi } from "../common";
import noimage from "../assets/images/noimages.jpg";
import { BsCart3 } from "react-icons/bs";
import { toast } from "react-toastify";
import Context from "../context";
import ShowComment from "../components/layouts/ShowComment";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import RelatedItem from "../components/catalogs/section/RelatedItem";

const ProductPage = () => {
  let { state } = useLocation();
  const [product, setProduct] = useState([]);
  const [reviews, setReviews] = useState([]); // Local state for reviews
  const [mainImage, setMainImage] = useState(noimage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); 

  const showProduct = async (productId) => {
    try {
      const url = SummaryApi.getProductById.url.replace(":id", productId);
      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
      setProduct(dataApi.product);
      setReviews(dataApi.product.reviews || []); // Initialize reviews from API

      if (dataApi.product.images?.length > 0) {
        setMainImage(`${backendDomain}/${dataApi.product.images[0]}`);
      }
      console.log("produtc", product);
    } catch (error) {
      console.log(error);
    }
  };

  const { setCart } = useContext(Context);

  const addToCart = async () => {
    if (product.inventory === 0) {
      toast.error("Sản phẩm đã hết hàng");
      return;
    }

    const data = {
      productId: product._id,
      quantity: quantity || 1,
      price: product.saleprice !== 0 ? product.saleprice : product.price,
      variantId: null,
    };

    try {
      const response = await axios({
        url: SummaryApi.addToCart.url,
        method: SummaryApi.addToCart.method,
        data: data,
        withCredentials: true,
      });
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");

      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleAddComment = async (rating, comment, username) => {
    setLoading(true);
    setError(null);

    if (!rating || !comment.trim()) {
      setError("Vui lòng chọn số sao và nhập bình luận.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        url: SummaryApi.addNewComment.url,
        method: SummaryApi.addNewComment.method,
        data: { product: product._id, username, rating, comment },
        withCredentials: true,
      });

      // Append new review to the reviews list
      const newReview = { product: product._id, username, rating, comment };
      setReviews([newReview, ...reviews]);

      toast.success("Cảm ơn bạn đã để lại đánh giá!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError("Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showProduct(state?.id);
  }, [state?.id]);

  const changeImage = (src) => {
    setMainImage(src);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="shadow-md my-8 container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage}
              alt={product?.name || "Product Image"}
              className="size-96 lg:size-[480px] object-cover rounded-lg shadow-md mb-4"
              id="mainImage"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              {product?.images?.map((thumb, index) => (
                <img
                  src={`${backendDomain}/${thumb}`}
                  key={index}
                  alt={`Thumbnail ${index + 1}`}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                  onClick={() => changeImage(`${backendDomain}/${thumb}`)}
                />
              ))}
            </div>
          </div>
          <div className={`w-full md:w-1/2 px-4 ${product?.specifications?.length === 0 ? 'space-y-8' : ''}`}>
            <h2 className="text-xl lg:text-2xl font-semibold mb-1">
              {product?.name}
            </h2>
            <div className="flex items-center mb-4">
              {/* Hiển thị sao */}
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {product?.averageRating >= star ? (
                      <AiFillStar className="text-yellow-500" size={18} />
                    ) : product?.averageRating >= star - 0.5 ? (
                      <AiFillStar
                        className="text-yellow-500"
                        size={18}
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                    ) : (
                      <AiOutlineStar className="text-gray-400" size={18} />
                    )}
                  </span>
                ))}
              </div>
              {/* Hiển thị số sao trung bình và số đánh giá */}
              <span className="ml-2 text-gray-600 text-sm">
                {product?.averageRating?.toFixed(1)} ({product?.numOfReviews}{" "}
                reviews)
              </span>
            </div>
            <div className="mb-4 text-sm">
              {product?.saleprice === 0 ? (
                <span className="text-lg lg:text-xl mr-2">
                  {product?.price ? product?.price.toLocaleString() : "0"} đ
                </span>
              ) : (
                <>
                  <span className="text-lg lg:text-lg mr-2">
                    {product?.saleprice
                      ? product?.saleprice.toLocaleString()
                      : ""}
                    đ
                  </span>
                  <span className="text-gray-500 text-sm lg:text-base line-through">
                    {product?.price ? product?.price.toLocaleString() : "0"}đ
                  </span>
                </>
              )}
            </div>
            

            <div className="mb-4 flex gap-6 items-center">
              <h3 className="text-sm lg:text-base mb-1 font-semibold">
                Quantity:
              </h3>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max="999"
                value={quantity}  // Sử dụng giá trị quantity từ state
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="h-8 w-24 text-center rounded-md border shadow-sm outline-none focus:border-primary focus:ring focus:ring-orange-200 focus:ring-opacity-50"
              />
            </div>

            <div className="mb-6 flex gap-4 items-center">
              <BsCart3
                onClick={addToCart}
                className="text-primary cursor-pointer"
                size={30}
              />
              <button
                type="button"
                className="text-sm w-full lg:text-base px-5 py-2 font-semibold tracking-wide bg-white text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
              >
                <Link to={"checkout"} state={{ id: state?.id, quantity:quantity }}>
                  Buy Now
                </Link>
              </button>
            </div>
            {product?.specifications?.length > 0 ? (<div className="mb-2">
              <h3 className="text-sm lg:text-base mb-1 font-semibold">
                Thông số kỹ thuật:
              </h3>
              <table className="w-full border text-xs">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border font-medium whitespace-nowrap">
                      Thông số
                    </th>
                    <th className="px-4 py-2 border font-medium">Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.specifications?.map((spec, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-50 hover:bg-gray-100"
                    >
                      <td className="px-4 py-2 border">{spec?.name}</td>
                      <td className="px-4 py-2 border">{spec?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>):""}
            <div className="flex items-center gap-8 px-4 py-3 border">
              <img src={freedelivery} alt="" />
              <div>
                <h3 className="font-semibold">Free Delivery</h3>
                <span className="text-[13px]">
                  For orders worth over 1 million VND
                </span>
              </div>
            </div>
            <div className="flex items-center gap-8 px-4 py-3 border">
              <img src={ReturnDelivery} alt="" />
              <div>
                <h3 className="font-semibold">Return Delivery</h3>
                <span className="text-[13px]">
                  Free 7 Days Delivery Returns
                </span>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-xl lg:text-xl font-semibold mb-1">Mô tả</h2>
        <p>{product?.description}</p>
      </div>
      <div className="">
        <h2 className="text-xl lg:text-xl font-semibold mb-1">Bình Luận</h2>
        <div className="flex items-center mb-4">
          {/* Hiển thị sao */}
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {product?.averageRating >= star ? (
                  <AiFillStar className="text-yellow-500" size={18} />
                ) : product?.averageRating >= star - 0.5 ? (
                  <AiFillStar
                    className="text-yellow-500"
                    size={18}
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                  />
                ) : (
                  <AiOutlineStar className="text-gray-400" size={18} />
                )}
              </span>
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-base">
            {product?.averageRating?.toFixed(1)} - {product?.numOfReviews}{" "}
            reviews
          </span>
        </div>
      </div>
      <Comment
        productId={product?._id}
        onSubmit={handleAddComment}
        loading={loading}
        error={error}
      />
      <ShowComment reviews={reviews} setReviews={setReviews} />
      <div className="relative mb-10">
        <div className="flex items-center justify-between mb-6 lg:mb-10">
          <div className="flex items-center gap-4">
            <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
            <span className="text-primary font-bold text-lg">Related Item</span>
          </div>
        </div>
          <RelatedItem id={product?.mainCategory}/>
      </div>
    </div>
  );
};

export default ProductPage;

import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { SummaryApi } from "../../../common";
import { Navigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";

const AddProductModal = ({ categories, warranties, onClose }) => {
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    saleprice: 0,
    description: "",
    images: [],
    mainCategory: "",
    warranties:"",
    subCategory: null,
    flashsale: false,
    company: "",
    specifications: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview((prev) => [...prev, ...newImageUrls]);
      setProduct((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...Array.from(files).map((file) => "uploads/" + file.name),
        ],
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setImagePreview((prev) => prev.filter((_, idx) => idx !== index));
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const handleSave = async () => {
    try {
      if (
        product.name &&
        product.price &&
        product.company &&
        product.mainCategory &&
        product.warranties
      ) {
        // Tải ảnh lên trước
        const fileInputs = document.getElementById("file-upload").files;
        let uploadedImages = [];

        if (fileInputs && fileInputs.length > 0) {
          const formData = new FormData();
          Array.from(fileInputs).forEach((file) => {
            formData.append("images", file);
          });

          const uploadResponse = await axios({
            url: SummaryApi.uploadImage.url,
            method: SummaryApi.uploadImage.method,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });

          uploadedImages = uploadResponse.data.images;
        }

        const updatedProduct = {
          ...product,
          images: uploadedImages,
        };

        const productResponse = await axios({
          url: SummaryApi.addProduct.url,
          method: SummaryApi.addProduct.method,
          data: updatedProduct,
          withCredentials: true,
          credentials: "include",
        });
        console.log("product11", product);

        alert("Thêm sản phẩm thành công!");
        if (typeof onClose === "function") {
          onClose();
          window.location.reload();
        } else {
          Navigate("/products");
        }
      } else {
        alert("Vui lòng điền đầy đủ thông tin!");
        console.log("product", product);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thêm sản phẩm:", error);
      alert(error.request.responseText);
    }
  };

  const handleCategory = (value) => {
    const item = categories.find((cat) => cat._id === value);
    if (item.parentCategory) {
      setProduct((prev) => ({
        ...prev,
        mainCategory: item.parentCategory._id,
        subCategory: item._id,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        mainCategory: item._id,
        subCategory: null,
      }));
    }
  };
  const handleAddSpecification = () => {
    if (specKey && specValue) {
      setProduct((prev) => ({
        ...prev,
        specifications: [
          ...prev.specifications,
          { name: specKey, value: specValue }, // Thêm object mới vào mảng
        ],
      }));
      setSpecKey("");
      setSpecValue("");
    } else {
      alert("Vui lòng nhập cả tên và giá trị thông số kỹ thuật!");
    }
  };

  const handleRemoveSpecification = (index) => {
    setProduct((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg h-full overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">Thêm sản phẩm</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hình ảnh sản phẩm
          </label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreview.map((url, index) => (
              <div key={index}>
                <div className="relative w-28">
                  <img src={url} className="w-24 h-24 object-cover" />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-2 text-white rounded-full p-1"
                  >
                    <RiDeleteBack2Line size={20} color="red" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="mt-2"
          />
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 px-3 py-2 w-full border rounded outline-none"
            />
          </div>

          
          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Danh mục
            </label>
            <select
              id="category"
              name="mainCategory"
              value={product.subCategory || product.mainCategory}
              onChange={(e) => handleCategory(e.target.value)}
              className="mt-1 px-3 py-2 w-full border rounded outline-none outline-none"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                  className={category.parentCategory ? "pl-4" : ""}
                >
                  {category.parentCategory
                    ? `-- ${category.name}`
                    : category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 col-span-2">
            <label className="block text-sm font-medium text-gray-700">
             Gói bảo hành
            </label>
            <select
              id="warranties"
              name="warranties"
              value={product.warranties ||""}
              onChange={(e) =>
                setProduct({ ...product, warranties: e.target.value })
              }
              className="mt-1 px-3 py-2 w-full border rounded outline-none outline-none"
            >
              <option value="">-- Chọn gói bảo hành --</option>
              {warranties?.map((warranty) => (
                <option
                  key={warranty?._id}
                  value={warranty?._id}
                 
                >
                  {warranty?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-end">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Giá
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
              min="0"
              className="mt-1 px-3 py-2 w-full border rounded outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Giá khuyến mãi
            </label>
            <input
              type="number"
              value={product.saleprice}
              onChange={(e) =>
                setProduct({ ...product, saleprice: Number(e.target.value) })
              }
              min="0"
              className="mt-1 px-3 py-2 w-full border rounded outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Thương hiệu
            </label>
            <input
              type="text"
              value={product.company}
              onChange={(e) =>
                setProduct({ ...product, company: e.target.value })
              }
              className="mt-1 px-3 py-2 w-full border rounded outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center mt-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                name="flashSale"
                checked={product.flashsale}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    flashsale: e.target.checked,
                  })
                }
              />
              <span className="ml-2 text-gray-700">Flash Sale</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="mt-1 px-3 py-2 w-full border rounded outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thông số kỹ thuật
          </label>
          <table className="mt-2 w-full border">
            <thead>
              <tr>
                <th className="border px-2 py-1 font-medium">Tên thông số</th>
                <th className="border px-2 py-1 font-medium">Giá trị</th>
                <th className="border px-2 py-1 font-medium">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {product.specifications.map((spec, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{spec.name}</td>
                  <td className="border px-2 py-1">{spec.value}</td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecification(index)}
                      className="text-red-500"
                    >
                      <AiTwotoneDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    placeholder="Tên thông số"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                    className="px-2 py-1 outline-none border-b w-full focus:border-b-primary"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    placeholder="Giá trị"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    className="px-2 py-1 outline-none border-b w-full focus:border-b-primary"
                  />
                </td>
                <td className="border px-2 py-1 text-center">
                  <button
                    type="button"
                    onClick={handleAddSpecification}
                    className="px-2 py-1 bg-primary text-white rounded"
                  >
                    <IoIosSend size={20} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

import axios from "axios";
import React, { useState } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { backendDomain, SummaryApi } from "../../../common";
import { Navigate } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import HtmlEditor from "../../../components/TextEditor/HtmlEditor";
import EditorToolbar, {
  modules,
  formats,
} from "./texteditor/EditorToolbar.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    inventory:"",
    warranties: "",
    subCategory: null,
    tags: [], // <-- Thêm mảng tags vào state
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
        let updatedDescription = product.description;

        // Parse description để tìm thẻ <img>
        const parser = new DOMParser();
        const doc = parser.parseFromString(product.description, "text/html");
        const imgTags = doc.querySelectorAll("img");

        // Lưu trữ ảnh base64
        const formData = new FormData();
        let base64Images = [];

        imgTags.forEach((img, index) => {
          const src = img.getAttribute("src");

          // Kiểm tra nếu ảnh là base64
          if (src.startsWith("data:image")) {
            const file = dataURLtoFile(src, `uploaded-image-${index}.png`);
            formData.append("images", file);
            base64Images.push({ img, index }); // Lưu lại thẻ img để update src
          }
        });

        // Nếu có ảnh base64 thì upload lên server
        if (base64Images.length > 0) {
          const uploadResponse = await axios({
            url: SummaryApi.uploadImage.url,
            method: SummaryApi.uploadImage.method,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });

          const uploadedImages = uploadResponse.data.images; // Nhận mảng link ảnh từ server

          base64Images.forEach(({ img, index }) => {
            img.setAttribute("src", `${backendDomain}${uploadedImages[index]}`);
          });

          updatedDescription = doc.body.innerHTML;
        }

        const updatedProduct = {
          ...product,
          description: updatedDescription,
        };

        const productResponse = await axios({
          url: SummaryApi.addProduct.url,
          method: SummaryApi.addProduct.method,
          data: updatedProduct,
          withCredentials: true,
          credentials: "include",
        });

        alert("Thêm sản phẩm thành công!");
        if (typeof onClose === "function") {
          onClose();
          window.location.reload();
        } else {
          Navigate("/products");
        }
      } else {
        alert("Vui lòng điền đầy đủ thông tin!");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình thêm sản phẩm:", error);
      alert(error.request.responseText);
    }
  };

  // Hàm chuyển đổi base64 sang File
  function dataURLtoFile(dataUrl, filename) {
    let arr = dataUrl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const handleDescritionsChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      description: value,
    }));
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
        <div>
          <h2 className="text-2xl font-semibold mb-4">Thêm sản phẩm</h2>
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hình ảnh sản phẩm
          </label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {imagePreview.map((url, index) => (
              <div key={index}>
                <div className="relative w-28">
                  <img src={url} className="w-24 h-24 object-cover text-sm" />
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
          <div className="mb-4 col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none"
            />
          </div>
          <div className="mb-4 col-span-1">
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
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none"
            />
          </div>
          <div className="mb-4 col-span-1">
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
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none"
            />
          </div>
          <div className="mb-4 col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Kho
            </label>
            <input
              type="number"
              value={product.inventory}
              onChange={(e) =>
                setProduct({ ...product, inventory: Number(e.target.value) })
              }
              min="0"
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-end mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Danh mục
            </label>
            <select
              id="category"
              name="mainCategory"
              value={product.subCategory || product.mainCategory}
              onChange={(e) => handleCategory(e.target.value)}
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none outline-none"
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Gói bảo hành
            </label>
            <select
              id="warranties"
              name="warranties"
              value={product.warranties || ""}
              onChange={(e) =>
                setProduct({ ...product, warranties: e.target.value })
              }
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none"
            >
              <option value="">-- Chọn gói bảo hành --</option>
              {warranties?.map((warranty) => (
                <option key={warranty?._id} value={warranty?._id}>
                  {warranty?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Thương hiệu
            </label>
            <select
              id="company"
              name="company"
              value={product.company || ""}
              onChange={(e) =>
                setProduct({ ...product, company: e.target.value })
              }
              className="mt-1 px-3 py-1 text-sm w-full border rounded outline-none"
            >
              <option value="">-- Chọn thương hiệu --</option>
              {[
                "Xiaomi",
                "Ecovacs",
                "Tineco",
                "Xiaomi-Redmi",
                "Xiaomi - Lumias",
                "NWT-Lumias",
                "Xiaomi- Lumias",
                "Xiaomi-KingSmith",
              ].map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Chọn Tags
          </label>
          <div className="grid grid-cols-4 gap-4 items-end mb-4">
            {["flashsale", "outstanding", "promotion", "new"].map((tag) => (
              <div key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  id={tag}
                  value={tag}
                  checked={product.tags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setProduct({ ...product, tags: [...product.tags, tag] });
                    } else {
                      setProduct({
                        ...product,
                        tags: product.tags.filter((t) => t !== tag),
                      });
                    }
                  }}
                />
                <label htmlFor={tag} className="ml-2 text-sm">
                  {tag === "flashsale"
                    ? "Khuyến mãi nhanh"
                    : tag === "outstanding"
                    ? "Nổi bật"
                    : tag === "promotion"
                    ? "Khuyến mãi"
                    : "Mới"}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thông số kỹ thuật
          </label>
          <table className="mt-2 w-full border text-sm">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <EditorToolbar toolbarId={"t2"} />
          <ReactQuill
            theme="snow"
            value={product.description}
            onChange={handleDescritionsChange}
            placeholder={"Write something awesome..."}
            modules={modules("t2")}
            formats={formats}
          />

          {/* <HtmlEditor value={product.description} onChange={handleDescritionsChange}/> */}
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

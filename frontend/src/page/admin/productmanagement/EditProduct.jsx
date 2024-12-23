import { useParams, useNavigate } from "react-router-dom";
import noimages from "../../../assets/images/noimages.jpg";
import { backendDomain, SummaryApi } from "../../../common";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../../../components/loading/LoadingPage";
import { RiDeleteBack2Line } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "", // Tên sản phẩm
    price: "", // Giá sản phẩm
    saleprice: "", // Giá khuyến mãi
    mainCategory: "",
    subCategory: null, // Danh mục phụ
    warranties: "",
    company: "", // Công ty
    description: "", // Mô tả sản phẩm
    flashsale: false, // Trạng thái flash sale
    images: [], // Mảng ảnh của sản phẩm
    specifications: [], // Mảng thông số kỹ thuật
  });

  const [categories, setCategories] = useState([]);
  const [warranties, setWarrenties] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const showProduct = async (id) => {
    try {
      const url = SummaryApi.getProductById.url.replace(":id", id);
      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
      setProduct(dataApi.product);
      console.log("dâtta", product);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data;

      // Hàm để sắp xếp danh mục: cha trước con
      const sortCategories = (categories) => {
        const map = new Map(categories.map((cat) => [cat._id, cat])); // Tạo map để tra cứu nhanh
        const sorted = [];

        categories.forEach((category) => {
          if (!category.parentCategory) {
            sorted.push(category); // Thêm danh mục gốc trước
          } else if (map.has(category.parentCategory._id)) {
            // Thêm con ngay sau cha
            const parentIndex = sorted.findIndex(
              (cat) => cat._id === category.parentCategory._id
            );
            sorted.splice(parentIndex + 1, 0, category);
          }
        });

        return sorted;
      };

      // Sắp xếp danh mục theo thứ tự cha-con
      const sortedCategories = sortCategories(dataApi.categories);
      setCategories(sortedCategories);
      console.log("categories (sorted):", sortedCategories);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const fetchWarranties = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllWarranty.url,
        method: SummaryApi.getAllWarranty.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data.warranties;
      setWarrenties(dataApi);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const saveProduct = async () => {
    try {
      const { featured, ...updatedProduct } = product;
      const url = SummaryApi.updateProductById.url.replace(":id", id);
      await axios({
        url: url,
        method: SummaryApi.updateProductById.method,
        data: updatedProduct,
        withCredentials: true,
      });

      const fileInputs = document.getElementById("file-upload").files;
      if (fileInputs.length > 0) {
        const formData = new FormData();

        Array.from(fileInputs).forEach((file) => {
          formData.append("images", file);
        });

        await axios({
          url: SummaryApi.uploadImage.url,
          method: SummaryApi.uploadImage.method,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      }

      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview(imageUrls);
      setProduct((prev) => ({
        ...prev,
        images: Array.from(files).map((file) => `uploads/${file.name}`),
      }));
    }
  };

  const handleRemoveImage = (index) => {
    // Remove image from preview
    const newImagePreview = imagePreview.filter((_, idx) => idx !== index);
    setImagePreview(newImagePreview);

    // Remove image from product's images
    const newImages = product?.images.filter((_, idx) => idx !== index);
    setProduct((prev) => ({
      ...prev,
      images: newImages,
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
        specifications: Array.isArray(prev.specifications)
          ? [...prev.specifications, { name: specKey, value: specValue }]
          : [{ name: specKey, value: specValue }],
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

  const handleSpecificationChange = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      specifications: Array.isArray(prev.specifications)
        ? prev.specifications.map((spec, idx) =>
            idx === index ? { ...spec, [field]: value } : spec
          )
        : [],
    }));
  };

  useEffect(() => {
    showProduct(id);
    getAllCategories();
    fetchWarranties();
  }, [id]);

  if (!product) {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1 className="text-xl font-medium my-4">Cập nhật sản phẩm</h1>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-2 flex flex-col items-center text-sm">
          {/* Hiển thị nhiều ảnh thumbnail */}
          <div className="grid grid-cols-3 gap-4">
            {imagePreview.length > 0
              ? imagePreview.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${idx}`}
                      className="w-24 h-24 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0 right-0 text-white rounded-full flex items-center justify-center"
                    >
                      <RiDeleteBack2Line size={20} color="red" />
                    </button>
                  </div>
                ))
              : product?.images.map((image, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={`${backendDomain}/${image}`}
                      alt={`Product ${idx}`}
                      className="w-24 h-24 object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0 right-0 text-white rounded-full flex items-center justify-center"
                    >
                      <RiDeleteBack2Line size={20} color="red" />
                    </button>
                  </div>
                ))}
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("file-upload").click()}
            className="mt-2 px-4 py-1 bg-primary text-white rounded"
          >
            Tải ảnh lên
          </button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
        </div>

        <div className="col-span-5 space-y-8 text-sm">
          {/* Tên sản phẩm */}
          <div className="flex gap-4">
            <div className="border w-1/2 focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label htmlFor="name" className="bg-white text-gray-600 px-1">
                  Tên sản phẩm
                </label>
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={product?.name || ""}
                onChange={handleInputChange}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </div>
            <div className="border w-1/4 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label htmlFor="price" className="bg-white text-gray-600 px-1">
                  Giá
                </label>
              </div>
              <input
                id="price"
                name="price"
                type="text"
                value={product?.price || ""}
                onChange={handleInputChange}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </div>
            <div className="border w-1/4 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label
                  htmlFor="saleprice"
                  className="bg-white text-gray-600 px-1"
                >
                  Giá khuyến mãi
                </label>
              </div>
              <input
                id="saleprice"
                name="saleprice"
                type="text"
                value={product?.saleprice || 0}
                onChange={handleInputChange}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </div>
          </div>

          {/* Danh mục, Công ty */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label
                  htmlFor="category"
                  className="bg-white text-gray-600 px-1"
                >
                  Danh mục
                </label>
              </div>
              <select
                id="category"
                name="mainCategory"
                value={product?.subCategory || product?.mainCategory}
                onChange={(e) => handleCategory(e.target.value)}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
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

            <div className="border relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label className="bg-white text-gray-600 px-1">
                  Gói bảo hành
                </label>
              </div>
              <select
                id="warranties"
                name="warranties"
                value={product?.warranties}
                onChange={handleInputChange}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              >
                <option value="">-- Chọn gói bảo hành --</option>
                {warranties?.map((warranty) => (
                  <option key={warranty?._id} value={warranty?._id}>
                    {warranty?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="border relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs"><label className="bg-white text-gray-600 px-1">
                Thương hiệu
              </label></div>
              <select
                id="company"
                name="company"
                value={product.company || ""}
                onChange={(e) =>
                  setProduct({ ...product, company: e.target.value })
                }
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
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

          <div>
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="grid grid-cols-4 gap-4 items-end mb-4">
                {["flashsale", "outstanding", "promotion", "new"].map((tag) => (
                  <div key={tag} className="flex items-center">
                    <input
                      type="checkbox"
                      id={tag}
                      value={tag}
                      checked={product?.tags?.includes(tag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setProduct({
                            ...product,
                            tags: [...product.tags, tag],
                          });
                        } else {
                          setProduct({
                            ...product,
                            tags: product?.tags.filter((t) => t !== tag),
                          });
                        }
                      }}
                    />
                    <label htmlFor={tag} className="ml-2">
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="flex gap-4">
            <div className="border w-full relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label
                  htmlFor="description"
                  className="bg-white text-gray-600 px-1"
                >
                  Mô tả sản phẩm
                </label>
              </div>
              <textarea
                id="description"
                name="description"
                value={product?.description || ""}
                onChange={handleInputChange}
                className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                rows="4"
              />
            </div>
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
              <tbody className="bg-white divide-y divide-gray-200">
                {product?.specifications?.map((spec, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="border px-2 py-2">
                      <textarea
                        className="w-full h-10 px-2 py-1 outline-none border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary transition"
                        value={spec.name}
                        onChange={(e) =>
                          handleSpecificationChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="border px-2 py-2">
                      <textarea
                        className="w-full h-10 px-2 py-1 outline-none border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary transition"
                        value={spec.value}
                        onChange={(e) =>
                          handleSpecificationChange(
                            index,
                            "value",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="border px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecification(index)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <AiTwotoneDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td className="border px-2 py-2">
                    <input
                      type="text"
                      placeholder="Tên thông số"
                      value={specKey}
                      onChange={(e) => setSpecKey(e.target.value)}
                      className="w-full px-2 py-1 outline-none border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <input
                      type="text"
                      placeholder="Giá trị"
                      value={specValue}
                      onChange={(e) => setSpecValue(e.target.value)}
                      className="w-full px-2 py-1 outline-none border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary transition"
                    />
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={handleAddSpecification}
                      className="px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark focus:ring-2 focus:ring-primary-light transition"
                    >
                      <IoIosSend size={20} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
            <button
              onClick={saveProduct}
              className="w-36 bg-primary text-white py-1 rounded-md"
            >
              Lưu sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

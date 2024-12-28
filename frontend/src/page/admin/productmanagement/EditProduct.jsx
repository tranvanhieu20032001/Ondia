import { useParams, useNavigate } from "react-router-dom";
import noimages from "../../../assets/images/noimages.jpg";
import { backendDomain, SummaryApi } from "../../../common";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../../../components/loading/LoadingPage";
import { RiDeleteBack2Line } from "react-icons/ri";
import { IoIosSend } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import EditorToolbar, {
  modules,
  formats,
} from "./texteditor/EditorToolbar.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import HtmlEditor from "../../../components/TextEditor/HtmlEditor";

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

  const handleDescriptionChange = (value) => {
    setProduct((prev) => ({
      ...prev,
      description: value,
    }));
  };

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

      // Parse description để tìm thẻ <img>
      let updatedDescription = product.description;
      const parser = new DOMParser();
      const doc = parser.parseFromString(updatedDescription, "text/html");
      const imgTags = doc.querySelectorAll("img");

      // Lưu trữ ảnh base64
      const formData = new FormData();
      let base64Images = [];

      imgTags.forEach((img, index) => {
        const src = img.getAttribute("src");

        // Kiểm tra nếu ảnh là base64
        if (src.startsWith("data:image")) {
          const file = dataURLtoFile(src, `uploaded-image-${index}.png`);
          formData.append("images", file); // Thêm ảnh vào FormData để upload
          base64Images.push({ img, index }); // Lưu lại thẻ img để update src sau khi upload
        }
      });

      // Nếu có ảnh base64 thì upload lên server
      let uploadedImages = [];
      if (base64Images.length > 0) {
        const uploadResponse = await axios({
          url: SummaryApi.uploadImage.url,
          method: SummaryApi.uploadImage.method,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        uploadedImages = uploadResponse.data.images; // Nhận mảng link ảnh từ server

        // Cập nhật tất cả các ảnh base64 với link mới
        base64Images.forEach(({ img, index }) => {
          if (uploadedImages[index]) {
            img.setAttribute("src", `${backendDomain}${uploadedImages[index]}`);
          }
        });

        // Cập nhật lại mô tả sản phẩm với src mới của ảnh
        updatedDescription = doc.body.innerHTML;
      }

      // Cập nhật mô tả mới vào updatedProduct
      updatedProduct.description = updatedDescription;

      // Upload thêm ảnh từ file input
      const fileInputs = document.getElementById("file-upload").files;
      if (fileInputs.length > 0) {
        const fileFormData = new FormData();
        Array.from(fileInputs).forEach((file) => {
          fileFormData.append("images", file);
        });

        const fileUploadResponse = await axios({
          url: SummaryApi.uploadImage.url,
          method: SummaryApi.uploadImage.method,
          data: fileFormData,
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });

        // Nhận mảng link ảnh từ server
        const fileUploadedImages = fileUploadResponse.data.images;

        // Nếu có ảnh từ file input, cập nhật lại src của chúng trong mô tả
        if (fileUploadedImages.length > 0) {
          const imgElements = doc.querySelectorAll("img");

          // Thay thế src của tất cả ảnh
          fileUploadedImages.forEach((imageSrc, index) => {
            if (imgElements[index]) {
              const newImageSrc = `${backendDomain}${imageSrc}`;
              imgElements[index].setAttribute("src", newImageSrc);
            }
          });

          // Cập nhật lại mô tả sản phẩm với src mới của ảnh từ file
          updatedDescription = doc.body.innerHTML;
        }
      }

      // Cập nhật sản phẩm vào server
      const url = SummaryApi.updateProductById.url.replace(":id", id);
      await axios({
        url: url,
        method: SummaryApi.updateProductById.method,
        data: updatedProduct,
        withCredentials: true,
      });

      alert("Cập nhật sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      alert("Có lỗi xảy ra khi cập nhật sản phẩm.");
    }
  };

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
      <div className="mb-8">
        <h1 className="text-xl font-medium my-4">Cập nhật sản phẩm</h1>
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
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label className="bg-white text-gray-600 px-1">
                  Thương hiệu
                </label>
              </div>
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
          {/* Mô tả sản phẩm */}
          <div className="flex gap-4">
            <div className="w-full relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <label
                  htmlFor="description"
                  className="bg-white text-gray-600 px-1"
                >
                  Mô tả sản phẩm
                </label>
              </div>
              <div className="gap-6 w-full">
                {/* <HtmlEditor
                  value={product.description}
                  onChange={handleDescriptionChange}
                /> */}
                <EditorToolbar toolbarId={"t2"} />
                <ReactQuill
                  theme="snow"
                  value={product.description}
                  onChange={handleDescriptionChange}
                  placeholder={"Write something awesome..."}
                  modules={modules("t2")}
                  formats={formats}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

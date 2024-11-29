import { useState, useEffect } from "react";
import UserManagementTable from "./UserManagementTable";
import axios from "axios";
import SummaryApi from "../../../common";
import LoadingPage from "../../../components/loading/LoadingPage";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái modal
  const [editingUser, setEditingUser] = useState(null); // Lưu thông tin người dùng cần chỉnh sửa

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const dataResponse = await axios({
          url: SummaryApi.getAllUser.url,
          method: SummaryApi.getAllUser.method,
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          credentials: "include",
        });
        const dataApi = dataResponse.data;
        setUsers(dataApi.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user); // Lưu thông tin người dùng cần chỉnh sửa
    setIsModalOpen(true); // Hiển thị modal
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter((u) => u._id !== user._id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Ẩn modal
    setEditingUser(null); // Reset thông tin người dùng
  };

  const handleSave = (updatedUser) => {

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    console.log("update",updatedUser);
    
    handleCloseModal();
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserManagementTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <EditUserModal
          user={editingUser}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [isChanged, setIsChanged] = useState(false); // Trạng thái thay đổi dữ liệu

  useEffect(() => {
    // Kiểm tra nếu dữ liệu form khác với dữ liệu gốc
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(user);
    setIsChanged(hasChanges);
  }, [formData, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChanged) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2 text-sm">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!isChanged} // Chỉ bật khi dữ liệu thay đổi
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default UserManagement;

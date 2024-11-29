import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useFetchCurrentUser } from "../../utils/useFetchCurrentUser";
import LoadingPage from "../../components/loading/LoadingPage";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { loading, userData } = useFetchCurrentUser(); // Fetch user data and loading state
  const navigate = useNavigate();

  // Wait until userData is available and loading is finished before proceeding
  useEffect(() => {
    if (loading) return; // Don't check if loading
    if (!userData || userData.user.role !== "admin") {
      navigate("/"); // Redirect to home if the user is not admin
    }
  }, [userData, loading, navigate]);

  // While loading or before we get user data, render a loading spinner
  if (loading || !userData) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

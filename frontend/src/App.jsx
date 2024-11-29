import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingPage from "./components/loading/LoadingPage";
import { useFetchCurrentUser } from "./utils/useFetchCurrentUser";

function App() {
  const {loading} = useFetchCurrentUser();
  const location = useLocation();

  if (loading) {
    return <LoadingPage />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      <ToastContainer />
      {!isAdminRoute && <Header />}
      <main>
        <Outlet />
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;

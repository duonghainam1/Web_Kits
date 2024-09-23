import { Outlet } from "react-router-dom";
import Header from "../components/common/Client/Header";
import Footer from "../components/common/Client/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />

    </>
  );
};

export default ClientLayout;

import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";



const MainLayout = () => {
  return (
    <div className=" max-w-full flex flex-col min-h-screen ">
      <Header />
      <main className="bg-[#F2F0F1] p-0 m-0 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

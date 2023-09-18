import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Footer";
import Header from "../components/header/Header";

const MasterLayout: React.FC = () => {
  // const {pathname} = useLocation();
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth"
  //   });
  // }, [pathname])
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    
    </>
  );
};

export default MasterLayout;

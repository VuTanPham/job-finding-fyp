import Header from "../cores/components/header";
import Footer from "../cores/components/footer";
import { Outlet } from "react-router-dom";

const AppContainer = () => {

  return (
    <>
      <Header />
      <div style={{minHeight: 500}}>
      <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppContainer;

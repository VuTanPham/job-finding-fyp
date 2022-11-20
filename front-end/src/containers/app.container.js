import Header from "../cores/components/header";
import Footer from "../cores/components/footer";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const AppContainer = () => {

  return (
    <>
      <Header />
      <Box style={{minHeight: "85vh"}} py={10} bgColor="#dce6f1cc">
      <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default AppContainer;

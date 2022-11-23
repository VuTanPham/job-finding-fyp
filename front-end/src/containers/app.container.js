import Header from "../cores/components/header";
import Footer from "../cores/components/footer";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { authContext } from "../cores/context/auth";

const AppContainer = () => {

  const {state: {isAuthenticated}} = useContext(authContext);

  return (
    <>
      <Header />
      <Box style={{minHeight: "85vh"}} py={isAuthenticated ? 10 : 0} bgColor="#dce6f1cc">
      <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default AppContainer;

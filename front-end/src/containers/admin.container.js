import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import AdminSidebar from "../cores/components/admin-sidebar";

const AdminContainer = () => {
  return (
    <Flex height='100vh'>
      <Box width='400px'>
        <AdminSidebar />
      </Box>
      <Box width='100%' p={10}>
        <Flex
          boxShadow='13px 13px 19px #c3c3c3,
             -13px -13px 19px #e9e9e9;'
          borderWidth='thin'
          borderColor='gray.200'
          width='100%'
          height='100%'
          borderRadius={20}
          px={5}
          overflow="hidden"
          overflowY="auto"
        >
          <Box flex="1" mt={50}>
          <Outlet />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AdminContainer;

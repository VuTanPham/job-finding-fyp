import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext, logoutAction } from "../context/auth";




const AdminSidebar = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const {state: {user}, dispatch} = useContext(authContext);

    return <Box width="100%" pt={12} height="100%" borderRightColor="gray.200" borderRightWidth="thin" boxShadow="13px 13px 19px #d6d6d6">
        <Flex px={10} py={5} alignItems="center" gap={2}>
            <Avatar size="xl" />
            <Flex direction="column" gap={3}>
                <Text fontWeight="bold" fontSize={20}>Hello, {user.username}</Text>
                <Button bgColor="blue" color="white" onClick={() => dispatch(logoutAction())}>
                    Logout <FaSignOutAlt style={{marginLeft: 5}} />
                </Button>
            </Flex>
        </Flex>
        <Box bgColor={pathname === '/' ? 'gray.300': ''} textAlign="center" px={10} py={5} cursor="pointer" onClick={() => navigate('/')}>
            <Text fontWeight="bold" fontSize={20}>Users</Text>
        </Box>
        <Box bgColor={pathname === '/posts' ? 'gray.300': ''} textAlign="center" px={10} py={5} cursor="pointer" onClick={() => navigate('/posts')}>
            <Text fontWeight="bold" fontSize={20}>Posts</Text>
        </Box>
    </Box>
}

export default AdminSidebar;
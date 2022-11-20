import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { useContext } from "react";
import { authContext } from "../../cores/context/auth";
import CompanyProfile from "./company-profile";
import EmployeeProfile from "./employee-profile";



const UserProfile = () => {

    const {state: {user}} = useContext(authContext);

    return (
        <Center>
            <Box w="6xl" mt={30}>
           {user?.accountType === 'employee' ? <EmployeeProfile /> : <CompanyProfile />}
            </Box>
        </Center>
    )
}

export default UserProfile;
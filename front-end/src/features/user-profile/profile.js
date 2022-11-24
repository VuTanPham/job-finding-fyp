import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../cores/context/auth";
import { getProfile } from "../../services/profile.service";
import CompanyProfile from "./company-profile";
import EmployeeProfile from "./employee-profile";



const UserProfile = () => {

    const {state: {user, token}} = useContext(authContext);

    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    const {id} = useParams();

    const checkProfile = useCallback(async () => {
        try {
          const response = await getProfile(id, token);
          if (response.status === 200) {
                setProfile(response.data);
          }
          else {
            navigate('/404');

          }
        } catch (error) {
          console.log(error);
        }
      }, [token, id]);

    useEffect(() => {
        checkProfile();
    }, [checkProfile])

    return (
        <Center>
            <Box w="6xl" mt={30}>
           {profile?.account?.accountType === 'employee' ? <EmployeeProfile /> : <CompanyProfile />}
            </Box>
        </Center>
    )
}

export default UserProfile;
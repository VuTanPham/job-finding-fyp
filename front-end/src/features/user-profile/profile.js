import { Box, Center, useColorModeValue } from "@chakra-ui/react";



const UserProfile = () => {
    return (
        <Center>
            <Box w="5xl" py={10} bgColor={useColorModeValue("gray.50", "gray.900")}>
            Profile
            </Box>
        </Center>
    )
}

export default UserProfile;
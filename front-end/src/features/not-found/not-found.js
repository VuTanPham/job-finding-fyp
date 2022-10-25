import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate()

  return (
    <Center paddingTop="100px">
      <Flex direction="column">
      <Heading
        lineHeight={1.1}
        fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
      >
        404 | Page Not Found
      </Heading>
      <Button
        fontFamily={"heading"}
        mt={8}
        w={"full"}
        bgGradient='linear(to-r, red.400,pink.400)'
        color={"white"}
        type='submit'
        _hover={{
          bgGradient: "linear(to-r, red.400,pink.400)",
          boxShadow: "xl",
        }}
        onClick={() => navigate('/')}
      >
        Back To Home Page
      </Button>
      </Flex>
    </Center>
  );
};

export default NotFound;

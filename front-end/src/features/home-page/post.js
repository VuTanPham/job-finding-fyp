import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { authContext } from "../../cores/context/auth";
import { applyToPost } from "../../services/hiring-post.service";
import bg from "../../assets/default-bg.jpg";
import { useNavigate } from "react-router-dom";

export default function PostItem({ item, reload }) {
  const {
    state: { user, profile, token },
  } = useContext(authContext);

  const navigate = useNavigate();

  const onApply = async (item) => {
    try {
      const response = await applyToPost(item._id, token);
      if (response.status === 201) {
        toast.success("Applied");
        reload();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Stack
      borderWidth='1px'
      borderRadius='lg'
      w={{ sm: "100%", md: "100%", lg: "1000px" }}
      height='fit-content'
      direction='column'
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      padding={4}
    >
      <Flex flex={1} bg='blue.200'>
        <Image
          objectFit='cover'
          boxSize='100%'
          height='400px'
          src={item.bannerUrl || bg}
          cursor='pointer'
          onClick={() => navigate(`detail/${item._id}`)}
        />
      </Flex>
      <Stack
        flex={2}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        p={1}
        pt={2}
      >
        <Heading
          cursor='pointer'
          onClick={() => navigate(`detail/${item._id}`)}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          {item.title}
        </Heading>
        <Text
          cursor='pointer'
          onClick={() => navigate(`detail/${item._id}`)}
          fontWeight={600}
          color={"gray.500"}
          size='sm'
          mb={4}
        >
          {item.createAt}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {item.description}
        </Text>
        <Flex
          cursor='pointer'
          onClick={(e) => {
            e.preventDefault();
            navigate(`/user-profile/${item?.createdBy?.account?._id}`);
          }}
          alignSelf='flex-start'
          gap={3}
          alignItems='center'
        >
          <Avatar src={item?.createdBy?.account?.avatarUrl} />
          <Text fontWeight='bold' fontSize={20}>
            {item?.createdBy?.name}
          </Text>
        </Flex>

        <Stack
          width={"100%"}
          mt={"2rem"}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {(user.accountType === "employee" &&
            item.appliedCandidate?.filter((item) => item === profile._id)
              ?.length === 0) && (
              <Button
                onClick={() => onApply(item)}
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Apply
              </Button>
            )}
        </Stack>
      </Stack>
    </Stack>
  );
}

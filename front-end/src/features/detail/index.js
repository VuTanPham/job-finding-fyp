import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authContext } from "../../cores/context/auth";
import { applyToPost, getPostById } from "../../services/hiring-post.service";
import bg from "../../assets/default-bg.jpg";
import { toast } from "react-toastify";
import moment from "moment";

const PostDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    state: { token, user, profile },
  } = useContext(authContext);
  const [post, setPost] = useState({});

  const getPost = useCallback(async () => {
    try {
      const response = await getPostById(id, token);
      if (response.status === 200) {
        setPost(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, token]);

  const onApply = async () => {
    try {
      const response = await applyToPost(id, token);
      if (response.status === 201) {
        toast.success("Applied");
        getPost();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Container maxW='1100px'>
      <Flex
        alignItems='center'
        gap={2}
        mb={3}
        cursor='pointer'
        onClick={(e) => {
          e.preventDefault();
          navigate(`/user-profile/${post?.createdBy?.account?._id}`);
        }}
      >
        <Avatar src={post?.createdBy?.account?.avatarUrl} />
        <Text fontWeight='bold' fontSize={20}>
          {post?.createdBy?.name}
        </Text>
      </Flex>
      <Text mb={3}>
        {moment(post?.createdAt).format("DD/MM/YYYY")} - Present (
        {moment(post?.createdAt).fromNow().split(" ").slice(0, 2).join(" ")})
      </Text>
      <Image src={post?.bannerUrl || bg} width='100%' height='400' />
      <Box textAlign='center' mt={50}>
        <Text fontWeight='bold' fontSize='40'>
          {post?.title}
        </Text>
        <Text>{post?.description}</Text>
      </Box>
      {user.accountType === "employee" &&
        post.appliedCandidate?.filter((item) => item === profile._id)
          ?.length === 0 && (
          <Flex mt={10}>
            <Button
              onClick={() => onApply()}
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
          </Flex>
        )}
    </Container>
  );
};

export default PostDetail;

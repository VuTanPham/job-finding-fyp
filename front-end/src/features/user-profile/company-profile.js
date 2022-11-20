import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { authContext, updateAction } from "../../cores/context/auth";
import bg from "../../assets/default-bg.jpg";
import { getProfile, updateUserProfile } from "../../services/profile.service";
import { getOwnPost, uploadImage } from "../../services/hiring-post.service";
import PostItem from "../home-page/post";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const {
    state: { user, token },
    dispatch
  } = useContext(authContext);

  const [profile, setProfile] = useState({});
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [introduction, setIntroduction] = useState("");
  const [isIntroEdit, setIsIntroEdit] = useState(false);

  const navigate = useNavigate();

  const getCompanyProfile = useCallback(async () => {
    try {
      const response = await getProfile(user?._id, token);
      if (response.status === 200) {
        setProfile(response.data);
        setIntroduction(response.data?.account?.introduction);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, user?._id]);

  const getData = useCallback(async () => {
    try {
      const response = await getOwnPost(currentPage, "", token);
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, token]);

  const updateProfile = async (key, value) => {
    try {
      const response = await updateUserProfile(
        user?._id,
        { [key]: value },
        token
      );
      if (response.status === 204) {
        toast.success('Account Updated');
        await getCompanyProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const upload = async (e) => {
    try {
      if (e.target.files[0]) {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("upload_preset", "ml_default");
        const imageRes = await uploadImage(formData);
        if (imageRes.status === 200) {
          dispatch(updateAction({avatarUrl: imageRes.data.secure_url}));
          await updateProfile("avatarUrl", imageRes.data.secure_url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getCompanyProfile();
  }, [getProfile]);

  return (
    <Box border='none'>
      <Box bg='white' pb='10'>
        <Box position='relative'>
          <Image
            height='250'
            width='100%'
            bgColor='#dce6f1'
            src={bg}
            objectFit='cover'
          />
          <Box position='absolute' bottom='-20%' left='10'>
            <label htmlFor='uploadAvt' style={{ cursor: "pointer" }}>
              <Avatar
                size='2xl'
                bg='teal.400'
                src={profile?.account?.avatarUrl}
                borderWidth='thick'
              />
            </label>
            <input
              accept='image/png, image/gif, image/jpeg'
              type='file'
              id='uploadAvt'
              onChange={upload}
              style={{ display: "none" }}
            />
          </Box>
        </Box>
        <Box mt={20} pl={10}>
          <Text fontWeight='bold' fontSize='20'>
            {profile?.name}
          </Text>
          <Text>Working Industry: {profile?.industryField?.name}</Text>
          <Text>Contact: {profile?.account?.email}</Text>
        </Box>
      </Box>

      <Box my={10} py={10} px={5} bg='white'>
        <Flex justifyContent={"space-between"} alignItems='center' mb={5}>
          <Text fontWeight='bold' fontSize='20'>
            Introduction
          </Text>
          {user.accountType === "company" && (
            <IconButton color='blue' icon={!isIntroEdit ? <FaEdit /> : <FaTimes />} onClick={() => setIsIntroEdit(prev => !prev)} />
          )}
        </Flex>
        {!isIntroEdit ? (
          <Text>
            {introduction}
          </Text>
        ) : (
          <Flex direction="column" gap={5}>
            <Textarea
              placeholder='Here is a sample placeholder'
              value={introduction}
              onChange={e => setIntroduction(e.target.value)}
            />
            <Button onClick={() => {updateProfile('introduction', introduction); setIsIntroEdit(false)}} alignSelf="flex-end" bgColor='blue' colorScheme={"teal"} mb={5}>
              Save
            </Button>
          </Flex>
        )}
      </Box>

      <Box my={10} bg='white' py={10} px={5}>
        <Flex justifyContent={"space-between"} alignItems='center'>
          <Text fontWeight='bold' fontSize='20'>
            Hiring Posts
          </Text>
          {user.accountType === "company" && (
            <Button onClick={() => navigate('/manage-posts')} bgColor='blue' colorScheme={"teal"} mb={5}>
              Manage
            </Button>
          )}
        </Flex>
        <Box py='10' maxHeight={500} overflowY='auto'>
          <Flex direction='column' align='center' gap={10} marginBottom={10}>
            {data?.map((item) => (
              <PostItem key={item._id} item={item} reload={getData} />
            ))}
          </Flex>
        </Box>
        <Flex justifyContent={"end"} gap={2} mt={5}>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft size={15} />
          </Button>
          {[...Array.from(Array(totalPages).keys())].map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page + 1)}
              bgColor={page + 1 === currentPage && "blue"}
              color={page + 1 === currentPage && "white"}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight size={15} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CompanyProfile;

import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { authContext, updateAction } from "../../cores/context/auth";
import bg from "../../assets/default-bg.jpg";
import { getProfile, updateUserProfile } from "../../services/profile.service";
import { getOwnPost, uploadImage } from "../../services/hiring-post.service";
import PostItem from "../home-page/post";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceModal from "./employee-profile/experience-modal";
import ExperienceItem from "./employee-profile/experience-item";
import ProjectItem from "./employee-profile/project-item";
import ProjectModal from "./employee-profile/project-modal";
import Project from "./employee-profile/project";
import Experience from "./employee-profile/experience";

const EmployeeProfile = () => {
  const {
    state: { user, token },
    dispatch,
  } = useContext(authContext);
  const {id} = useParams();

  const [profile, setProfile] = useState({});
  const [introduction, setIntroduction] = useState("");
  const [isIntroEdit, setIsIntroEdit] = useState(false);

  const getEmployeeProfile = useCallback(async () => {
    try {
      const response = await getProfile(id, token);
      if (response.status === 200) {
        setProfile(response.data);
        setIntroduction(response.data?.account?.introduction);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token, id]);

  const updateProfile = async (key, value) => {
    try {
      const response = await updateUserProfile(
        user?._id,
        { [key]: value },
        token
      );
      if (response.status === 204) {
        toast.success("Account Updated");
        await getEmployeeProfile();
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
          dispatch(updateAction({ avatarUrl: imageRes.data.secure_url }));
          await updateProfile("avatarUrl", imageRes.data.secure_url);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployeeProfile();
  }, [getEmployeeProfile]);

  return (
    <Box border='none'>
      <Box bg='white' pb='10' borderRadius={20}>
        <Box position='relative'>
          <Image
            height='250'
            width='100%'
            bgColor='#dce6f1'
            src={bg}
            objectFit='cover'
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
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
          <Text>Contact: {profile?.account?.email}</Text>
        </Box>
      </Box>

      <Box my={10} py={10} px={5} bg='white' borderRadius={20}>
        <Flex justifyContent={"space-between"} alignItems='center' mb={5}>
          <Text fontWeight='bold' fontSize='20'>
            Introduction
          </Text>
          {user.accountType === "employee" && (
            <IconButton
              color='blue'
              icon={!isIntroEdit ? <FaEdit /> : <FaTimes />}
              onClick={() => setIsIntroEdit((prev) => !prev)}
            />
          )}
        </Flex>
        {!isIntroEdit ? (
          <Text>{introduction}</Text>
        ) : (
          <Flex direction='column' gap={5}>
            <Textarea
              placeholder='Here is a sample placeholder'
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
            <Button
              onClick={() => {
                updateProfile("introduction", introduction);
                setIsIntroEdit(false);
              }}
              alignSelf='flex-end'
              bgColor='blue'
              colorScheme={"teal"}
              mb={5}
            >
              Save
            </Button>
          </Flex>
        )}
      </Box>

      <Experience experiences={profile?.experiences} user={user} reload={getEmployeeProfile} id={id} />

      <Project projects={profile?.projects} user={user} reload={getEmployeeProfile} id={id} />
    </Box>
  );
};

export default EmployeeProfile;

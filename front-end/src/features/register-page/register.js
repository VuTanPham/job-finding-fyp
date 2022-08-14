import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "../../services/auth.service";

const validationSchema = yup.object({
  accountType: yup
    .string("employee" | "company")
    .required("You Must Choose an Account Type"),
  email: yup
    .string()
    .email("email is invalid")
    .required("Email must be filled"),
  useranme: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  "confirm-password": yup
    .string()
    .oneOf([yup.ref("password"), null], "Password is not match")
    .required("Confirm password is required"),
});

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      accountType: "",
      email: "",
      useranme: "",
      password: "",
      "confirm-password": "",
      employee: {
        name: "",
        dob: new Date(1999, 0, 1),
        gender: "",
      },
      company: {
        name: "",
        industryFields: "",
      },
    },
  });

  const onSubmit = async (data) => {
    
  }
 
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Find Your Dream Job{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            Hire Your Candidates
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Register
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to="/">
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, blue.400,blue.700)"
                  bgClip="text"
                >
                  Login
                </Text>
              </Link>
            </Heading>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Username*"
                bg={"gray.100"}
                {...register("username")}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Password*"
                type="password"
                bg={"gray.100"}
                {...register("password")}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Confirm Password*"
                type="password"
                bg={"gray.100"}
                {...register("confirm-password")}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                placeholder="Email"
                bg={"gray.100"}
                {...register("email")}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Select
                placeholder="What do you wanna do?"
                {...register("accountType")}
              >
                <option value={"employee"}>Finding Job</option>
                <option value={"company"}>Hirning Employee</option>
              </Select>
              {watch("accountType") === "employee" && (
                <>
                  <Input
                    placeholder="Full Name"
                    bg={"gray.100"}
                    {...register("employee.name")}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <Input
                    bg={"gray.100"}
                    {...register("employee.dob")}
                    border={0}
                    type="date"
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <Select
                    placeholder="What is your gender?"
                    {...register("employee.gender")}
                  >
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                  </Select>
                </>
              )}
              {watch("accountType") === "company" && (
                <>
                  <Input
                    placeholder="Company Name"
                    bg={"gray.100"}
                    {...register("company.name")}
                    border={0}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                  />
                  <Select
                    placeholder="Select Industry field?"
                    {...register("company.industryFields")}
                  >
                    <option value={"IT"}>Information Technology</option>
                    <option value={"Marketing"}>Marketing</option>
                  </Select>
                </>
              )}
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              type="submit"
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
            >
              Register
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

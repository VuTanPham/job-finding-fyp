import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext, logoutAction } from "../context/auth";

import logo from '../../assets/logo.png'

const Links = [
  { name: "Home", to: "" },
  { name: "Connections", to: "connections" },
];

const NavLink = ({ toLink, children }) => (
  <Link
    to={`/${toLink.toLowerCase().split(" ").join("-")}`}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    state: { isAuthenticated, user },
    dispatch,
  } = useContext(authContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutAction());
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NavLink toLink=''>
              <Image src={logo} width={100} height={100} />
            </NavLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {isAuthenticated &&
                Links.map((link) => (
                  <NavLink key={link.name} toLink={link.to}>
                    {link.name}
                  </NavLink>
                ))}
              {isAuthenticated && (user.accountType === "company" ? 
                <NavLink toLink='manage-posts'>Manage Posts</NavLink>
              : <NavLink toLink='applied-posts'>Job Applied</NavLink>)}
            </HStack>
          </HStack>
          {isAuthenticated ? (
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={user?.avatarUrl}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate(`/user-profile/${user._id}`)}>
                    User Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Flex alignItems={"center"}>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<ArrowForwardIcon />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<AddIcon />}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
}

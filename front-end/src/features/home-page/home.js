import {
  Box,
  Flex,
  Stack,
  Checkbox,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import PostItem from "./post";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CreatePostModal from "./create-post";
import { getPost } from "../../services/hiring-post.service";
import { useCallback, useContext, useEffect, useState } from "react";
import { authContext } from "../../cores/context/auth";
import { debounce } from "lodash";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");

  const {
    state: { user, token },
  } = useContext(authContext);

  const getData = useCallback(async () => {
    try {
      const response = await getPost(currentPage, searchParam, token);
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage,searchParam, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <CreatePostModal isOpen={isOpen} onClose={onClose} reload={getData} />
      <Flex>
        <Box flex={1} pl={20} pt={10}>
          <Heading fontSize={"2xl"} mb={2} fontFamily={"body"}>
            Search
          </Heading>
          <InputGroup size='lg' mb={5}>
            <InputLeftAddon
              children={<FaSearch size={14} />}
            />
            <Input
              value={searchParam}
              onChange={(e) => {setSearchParam(e.target.value); setCurrentPage(1)}}
              placeholder='Search...'
            />
          </InputGroup>

          {user.accountType === "company" && (
            <Button onClick={onOpen} bgColor='blue' colorScheme={"teal"} mb={5}>
              Create
            </Button>
          )}

          {/* <Heading fontSize={"2xl"} mb={2} fontFamily={"body"}>
            Filters
          </Heading>
          <Stack spacing={5} direction='column' mb={5}>
            <Checkbox colorScheme='red'>Information Technology</Checkbox>
            <Checkbox colorScheme='green'>Marketing</Checkbox>
            <Checkbox colorScheme='green'>Graphic Design</Checkbox>
          </Stack> */}
          <Flex gap={2}>
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
        <Box flex={4} maxH="85vh" overflow='hidden' overflowY={"auto"} pt={10}>
          <Flex direction='column' align='center' gap={10} marginBottom={10}>
            {data?.map((item) => (
              <PostItem key={item._id} item={item} reload={getData} />
            ))}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default Home;

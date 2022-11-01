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

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <CreatePostModal isOpen={isOpen} onClose={onClose} />
    <Flex>
      <Box flex={1} pl={20} pt={10}>
        <Heading fontSize={"2xl"} mb={2} fontFamily={"body"}>
          Search
        </Heading>
        <InputGroup size='lg' mb={5}>
          <InputLeftAddon children={<FaSearch size={14} />} />
          <Input placeholder='Search...' />
        </InputGroup>

        <Button onClick={onOpen} bgColor='blue' colorScheme={"teal"} mb={5}>
          Create
        </Button>

        <Heading fontSize={"2xl"} mb={2} fontFamily={"body"}>
          Filters
        </Heading>
        <Stack spacing={5} direction='column' mb={5}>
          <Checkbox colorScheme='red'>Information Technology</Checkbox>
          <Checkbox colorScheme='green'>Marketing</Checkbox>
          <Checkbox colorScheme='green'>Graphic Design</Checkbox>
        </Stack>
        <Flex gap={2}>
          <Button disabled>
            <FaChevronLeft size={15} />
          </Button>
          <Button bgColor="blue" color={'white'}>1</Button>
          <Button>2</Button>
          <Button>3</Button>
          <Button>
            <FaChevronRight size={15} />
          </Button>
        </Flex>
      </Box>
      <Box flex={4} maxH={650} overflow='hidden' overflowY={"auto"} pt={10}>
        <Flex direction='column' align='center' gap={10} marginBottom={10}>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </Flex>
      </Box>
    </Flex>
    </>
  );
};

export default Home;

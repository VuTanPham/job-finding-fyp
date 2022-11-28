import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaExternalLinkAlt,
  FaExternalLinkSquareAlt,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../cores/context/auth";
import { getOwnPost, removePost } from "../../services/hiring-post.service";
import CreatePostModal from "../home-page/create-post";

const ManagePosts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam, setSearchParam] = useState("");

  const navigate = useNavigate();

  const {
    state: { user, token },
  } = useContext(authContext);

  const getData = useCallback(async () => {
    try {
      const response = await getOwnPost(currentPage, searchParam, token);
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, searchParam, token]);

  const [isUserListOpen, setIsUserListOpen] = useState(false);

  const deletePost = async (id) => {
    try {
      const response = await removePost(id, token);
      if(response.status === 200) {
        toast.success('Post deleted');
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Box w={"80%"} margin='auto' bg="white" p={10} borderRadius="20">
      <Modal scrollBehavior="inside" isOpen={isUserListOpen} onClose={() => {setSelectedValue(null);setIsUserListOpen(false)}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedValue?.appliedCandidate?.map(item => <Flex key={item?._id} alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" gap={2} mb={3}>
                <Avatar src={item?.account?.avatarUrl} />
                <Text>{item?.name}</Text>
              </Flex>
              <IconButton
                      bgColor={"teal"}
                      color='white'
                      icon={<FaExternalLinkAlt />}
                      onClick={() => navigate(`/user-profile/${item?.account?._id}`)}
                    />
            </Flex>)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {setSelectedValue(null);setIsUserListOpen(false)}}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CreatePostModal reload={getData} data={selectedValue} isOpen={isOpen} onClose={() => {setSelectedValue(null); onClose()}} />

      <Flex alignItems={"center"} justifyContent='space-between'>
        <Box>
          <Heading fontSize={"2xl"} mb={2} fontFamily={"body"}>
            Search
          </Heading>
          <InputGroup size='lg' mb={5} w={400}>
            <InputLeftAddon children={<FaSearch size={14} />} />
            <Input
              value={searchParam}
              onChange={(e) => {setSearchParam(e.target.value); setCurrentPage(1)}}
              placeholder='Search...'
            />
          </InputGroup>
        </Box>
        {user.accountType === "company" && (
          <IconButton
            icon={<FaPlus />}
            onClick={onOpen}
            bgColor='blue'
            colorScheme={"teal"}
            mb={5}
          />
        )}
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th isNumeric>Number of Applied</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item) => (
              <Tr key={item._id}>
                <Td>{item._id}</Td>
                <Td>{item.title}</Td>
                <Td>
                  <Text maxW={300} overflow='hidden' textOverflow={"ellipsis"}>
                    {item.description}
                  </Text>
                </Td>
                <Td isNumeric>{item.appliedCandidate?.length}</Td>
                <Td>
                  <Flex gap={5}>
                    <IconButton
                      bgColor={"teal"}
                      color='white'
                      icon={<FaUsers />}
                      onClick={() => {setSelectedValue(item); setIsUserListOpen(true)}}
                    />
                    <IconButton
                      bgColor={"blue"}
                      color='white'
                      colorScheme={"teal"}
                      icon={<FaEdit />}
                      onClick={() => {setSelectedValue(item); onOpen()}}
                    />
                    <IconButton
                      bg='red'
                      color='white'
                      icon={<FaTrash />}
                      onClick={() => deletePost(item._id)}
                      colorScheme={"teal"}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
  );
};

export default ManagePosts;

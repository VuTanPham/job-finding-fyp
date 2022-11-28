import {
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../cores/context/auth";
import { getPost, removePost } from "../../services/hiring-post.service";

const AdminManagePost = () => {

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    state: { user, token },
  } = useContext(authContext);

  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      const response = await getPost(currentPage, '', token);
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, token]);

  const deletePost = async (id) => {
    try {
      const response = await removePost(id, token);
      if(response.status === 200) {
        toast.success('Post had been removed!')
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
    <>
      <TableContainer>
        <Table size='md'>
          <Thead>
            <Tr>
              <Th fontSize={20}>ID</Th>
              <Th fontSize={20}>Title</Th>
              <Th fontSize={20}>Description</Th>
              <Th fontSize={20}>Created Date</Th>
              <Th fontSize={20}>Number of Applied</Th>
              <Th fontSize={20}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map(item => (
              <Tr key={item?._id}>
              <Td fontSize={18}>{item?._id}</Td>
              <Td fontSize={18}>{item?.title}</Td>
              <Td fontSize={18} maxW={300} overflow="hidden" textOverflow="ellipsis">
                {item?.description}
              </Td>
              <Td fontSize={18}>{item?.createdBy?.name}</Td>
              <Td fontSize={18}>{item?.appliedCandidate?.length}</Td>
              <Td fontSize={18}>
                <Flex gap={3}>
                  <IconButton onClick={() => navigate(`/detail/${item._id}`)} bg='blue' color='white' icon={<FaExternalLinkAlt />} />
                  <IconButton onClick={() => deletePost(item?._id)} bg='red' color='white' icon={<FaTrash />} />
                </Flex>
              </Td>
            </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex gap={2} justifyContent="flex-end" mt={5}>
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
    </>
  );
};

export default AdminManagePost;

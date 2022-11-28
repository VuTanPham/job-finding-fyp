import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
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
  } from "@chakra-ui/react";
  import { useCallback, useContext, useEffect, useState } from "react";
  import {
    FaChevronLeft,
    FaChevronRight,
    FaExternalLinkAlt,
    FaUndo,
  } from "react-icons/fa";
  import { toast } from "react-toastify";
  import { authContext } from "../../cores/context/auth";
  import { getAppliedPost, undoApplied } from "../../services/hiring-post.service";
  import {useNavigate} from 'react-router-dom'
  
  const JobApplied = () => {
  
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    
    const navigate = useNavigate();
  
    const {
      state: { user, token },
    } = useContext(authContext);
  
    const getData = useCallback(async () => {
      try {
        const response = await getAppliedPost(currentPage, token);
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    }, [currentPage, token]);

    const unapplied = async (id) => {
      try {
        const response = await undoApplied(id, token);
        if(response.status === 200) {
          toast.success('Applied had been cancel');
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
                        bgColor={"blue"}
                        color='white'
                        colorScheme={"teal"}
                        onClick={() => navigate(`/detail/${item?._id}`)}
                        icon={<FaExternalLinkAlt />}
                      />
                      <IconButton
                        bg='red'
                        color='white'
                        icon={<FaUndo />}
                        colorScheme={"teal"}
                        onClick={() => unapplied(item?._id)}
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
  
  export default JobApplied;
  
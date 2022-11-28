import {
  Button,
  Flex,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEye, FaUnlock, FaUser, FaUserAltSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../../cores/context/auth";
import { getAllUsers, updateUserStatus } from "../../services/admin.service";

const AdminManageUser = () => {
  const {
    state: { token, user },
  } = useContext(authContext);

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const getUsers = useCallback(async () => {
    try {
      const response = await getAllUsers(token, currentPage);
      setUsers(response.data?.data);
      setTotalPages(response.data?.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [token, currentPage]);

  const changeUserStatus = async (userId, status) => {
    try {
      const response = await updateUserStatus(userId, status, token);
      if(response.status === 204) {
        toast.success('User Status Changed')
        getUsers();
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      <TableContainer>
        <Table size='md'>
          <Thead>
            <Tr>
              <Th fontSize={20}>ID</Th>
              <Th fontSize={20}>Username</Th>
              <Th fontSize={20}>Role</Th>
              <Th fontSize={20}>Full Name</Th>
              <Th fontSize={20}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <Tr key={user._id} bg={user?.banned ? "red.200" : "green.200"}>
                <Td fontSize={18}>{user._id}</Td>
                <Td fontSize={18}>{user.username}</Td>
                <Td fontSize={18}>{user.accountType}</Td>
                <Td fontSize={18}>{user.fullName}</Td>
                <Td fontSize={18}>
                  <Flex gap={3}>
                    <IconButton
                      bg='blue'
                      color='white'
                      onClick={() => navigate(`/user-profile/${user._id}`)}
                      icon={<FaEye />}
                    />
                    <IconButton
                      bg={user?.banned ? 'green' : 'red'}
                      color='white'
                      onClick={() => changeUserStatus(user._id, !user.banned)}
                      icon={user?.banned ? <FaUnlock /> : <FaUserAltSlash />}
                    />
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

export default AdminManageUser;

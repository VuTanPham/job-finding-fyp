import {
  Avatar,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaSearch } from "react-icons/fa";
import { authContext } from "../../cores/context/auth";
import io from "socket.io-client";
import { getAllConservations } from "../../services/chat.service";

const socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
});

const UserChatting = ({ accountType, item }) => {
  return (
    <Flex gap={3} px={5} mb={5} cursor='pointer'>
      {accountType === "employee" ? (
        <>
          <Avatar size='lg' src={item?.company?.account?.avatarUrl} />
          <Flex direction='column'>
            <Text fontWeight='bold' fontSize={18}>
              {item?.company?.name}
            </Text>
            <Text
              w='210px'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {item?.messages[item?.messages.length - 1]?.content}
            </Text>
            <Text color='gray.500'>
              {item?.messages[0]?.createAt &&
                moment(item?.messages[0]?.createAt).format(
                  "DD/MM/YYYY - HH:MM"
                )}
            </Text>
          </Flex>
        </>
      ) : (
        <>
          <Avatar size='lg' src={item?.employee?.account?.avatarUrl} />
          <Flex direction='column'>
            <Text fontWeight='bold' fontSize={18}>
              {item?.employee?.name}
            </Text>
            <Text
              w='210px'
              overflow='hidden'
              whiteSpace='nowrap'
              textOverflow='ellipsis'
            >
              {item?.messages[item?.messages.length - 1]?.content}
            </Text>
            <Text color='gray.500'>
              {item?.messages[0]?.createAt &&
                moment(item?.messages[0]?.createAt).format(
                  "DD/MM/YYYY - HH:MM"
                )}{" "}
            </Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};

const ChatMessage = () => {
  return (
    <>
      <Flex py={3} mb={3} gap={3}>
        <Avatar size='md' />
        <Flex direction='column'>
          <Flex gap={2}>
            <Text fontWeight='bold' fontSize={18}>
              Pham Tan Vu
            </Text>
            <Text color='gray.500'>
              - {moment(new Date()).format("DD/MM/YYYY - HH:MM")}
            </Text>
          </Flex>
          <Text width='500px' bgColor='white' px={3} py={2} borderRadius={10}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Flex>
      </Flex>
      <Flex py={3} mb={3} gap={3} direction='row-reverse'>
        <Avatar size='md' />
        <Flex direction='column'>
          <Flex gap={2} direction='row-reverse'>
            <Text fontWeight='bold' fontSize={18}>
              Pham Tan Vu
            </Text>
            <Text color='gray.500'>
              {moment(new Date()).format("DD/MM/YYYY - HH:MM")} -
            </Text>
          </Flex>
          <Text width='500px' bgColor='white' px={3} py={2} borderRadius={10}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

const Connections = () => {
  const chatView = useRef(null);

  const {
    state: { user, token },
  } = useContext(authContext);
  const [conservations, setConservations] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [content, setContent] = useState("");

  const getConservations = useCallback(async () => {
    try {
      const response = await getAllConservations(token);
      if (response.status === 200) {
        setConservations(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getConservations();
  }, [getConservations]);

  useEffect(() => {
    socket.connect();
    socket.emit("setId", user?._id);

    return () => {
      socket.emit("clear", user?._id);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    chatView.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  const send = () => {
    
  }

  return (
    <Box>
      <Flex height='90vh'>
        <Box
          width='500px'
          bgColor='white'
          height='100%'
          overflowY='auto'
          py={30}
        >
          <InputGroup px={2}>
            <InputLeftElement
              pointerEvents='none'
              children={<FaSearch color='gray.300' />}
            />
            <Input type='text' placeholder='Search Connection' />
          </InputGroup>
          <Box mt={20}>
            {conservations.map((item) => (
              <UserChatting item={item} accountType={user.accountType} />
            ))}
          </Box>
        </Box>
        <Box width='100%'>
          <Flex
            height='95%'
            overflowY='scroll'
            px={5}
            direction='column'
            justifyContent='flex-end'
          >
            <ChatMessage />
            <Box ref={chatView}></Box>
          </Flex>
          <Box>
            <InputGroup px={2} borderColor='black'>
              <Input type='text' value={content} onChange={e => setContent(e.target.value)} placeholder='Message' />
              <InputRightElement
                px={3}
                cursor='pointer'
                children={<FaPaperPlane />}
              />
            </InputGroup>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Connections;

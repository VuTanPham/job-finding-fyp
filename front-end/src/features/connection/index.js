import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { authContext } from "../../cores/context/auth";
import io from "socket.io-client";
import {
  getAllConservations,
  getConservation,
} from "../../services/chat.service";
import OfferDialog from "./offer-dialog";

const socket = io("http://localhost:5000", {
  autoConnect: false,
  transports: ["websocket"],
});

const UserChatting = ({ accountType, item, selected, selectedChat }) => {
  return (
    <Flex
      gap={3}
      px={5}
      mb={5}
      py={3}
      cursor='pointer'
      onClick={() => selected(item?._id)}
      bgColor={selectedChat?._id === item?._id ? "gray.200" : "transparent"}
    >
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

const ChatMessage = ({ message, profile }) => {
  return (
    <>
      {message?.sendBy === "company" ? (
        <>
          <Flex
            py={3}
            mb={3}
            gap={3}
            direction={
              message?.company?._id === profile?._id ? "row-reverse" : "row"
            }
          >
            <Avatar size='md' src={message?.company?.account?.avatarUrl} />
            <Flex direction='column'>
              <Flex
                gap={2}
                direction={
                  message?.company?._id === profile?._id ? "row-reverse" : "row"
                }
              >
                <Text fontWeight='bold' fontSize={18}>
                  {message?.company?.name}
                </Text>
                <Text color='gray.500'>
                  -{" "}
                  {moment(new Date(message?.createdAt)).format(
                    "DD/MM/YYYY - HH:MM"
                  )}
                </Text>
              </Flex>
              <Text
                width='500px'
                bgColor='white'
                px={3}
                py={2}
                borderRadius={10}
              >
                {message?.content}
              </Text>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            py={3}
            mb={3}
            gap={3}
            direction={
              message?.employee?._id === profile?._id ? "row-reverse" : "row"
            }
          >
            <Avatar size='md' src={message?.employee?.account?.avatarUrl} />
            <Flex direction='column'>
              <Flex
                gap={2}
                direction={
                  message?.employee?._id === profile?._id
                    ? "row-reverse"
                    : "row"
                }
              >
                <Text fontWeight='bold' fontSize={18}>
                  {message?.employee?.name}
                </Text>
                <Text color='gray.500'>
                  -{" "}
                  {moment(new Date(message?.createdAt)).format(
                    "DD/MM/YYYY - HH:MM"
                  )}
                </Text>
              </Flex>
              <Text
                width='500px'
                bgColor='white'
                px={3}
                py={2}
                borderRadius={10}
              >
                {message?.content}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

const Connections = () => {
  const chatView = useRef(null);

  const {
    state: { user, token, profile },
  } = useContext(authContext);
  const [conservations, setConservations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [content, setContent] = useState("");
  const [currentChatId, setCurrentChatId] = useState("");
  const {isOpen, onOpen, onClose} = useDisclosure()

  const getConservations = useCallback(async () => {
    try {
      const response = await getAllConservations(token);
      if (response.status === 200) {
        setConservations(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const getSelectedChat = async (id) => {
    try {
      const response = await getConservation(id, token);
      if (response.status === 200) {
        setSelectedChat(response.data);
        setCurrentChatId(id);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getConservations();
  }, [getConservations]);

  useEffect(() => {
    socket.connect().emit("setId", user?._id);

    socket.on("receive", ({ message, conservationId }) => {
      const conservationTop = conservations?.filter(
        (item) => item?._id === conservationId
      )[0];
      const leftConservation = conservations?.filter(
        (item) => item?._id !== conservationId
      );
      if (!conservationTop?.messages?.find((item) => item._id === message?._id)) {
        conservationTop?.messages.push(message);
        setConservations([conservationTop, ...leftConservation]);
        console.log(selectedChat);
        selectedChat &&
          setSelectedChat((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
          }));
      }
    });

    return () => {
      socket.emit("clear", user?._id);
      socket.off("receive");
      socket.disconnect();
    };
  }, [conservations, selectedChat]);

  useEffect(() => {
    selectedChat &&
      chatView.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
  }, [selectedChat]);

  const send = async () => {
    socket.emit("send", {
      conId: selectedChat?._id,
      sendBy: user?.accountType,
      content,
      senderId: profile?._id,
    });
    await getSelectedChat(currentChatId);
    setContent("");
  };

  return (
    <Box>
      <OfferDialog isOpen={isOpen} onClose={onClose} employeeId={selectedChat?.employee?._id} companyId={selectedChat?.company?._id} token={token} />
      <Flex height='90vh'>
        <Box
          width='500px'
          bgColor='white'
          height='100%'
          overflowY='auto'
          py={30}
        >
          <Box mt={5}>
            {conservations.map((item) => (
              <UserChatting
                key={item?._id}
                item={item}
                selectedChat={selectedChat}
                accountType={user.accountType}
                selected={getSelectedChat}
              />
            ))}
          </Box>
        </Box>
        <Box width='100%'>
          {selectedChat ? (
            <>
              <Flex
                height='95%'
                overflowY='scroll'
                px={5}
                direction='column'
                justifyContent='flex-end'
              >
                {selectedChat?.messages?.map((item) => (
                  <ChatMessage
                    key={item?._id}
                    message={item}
                    profile={profile}
                  />
                ))}
                <Box ref={chatView}></Box>
              </Flex>
              <Flex>
                {user?.accountType === "company" && (
                  <Button onClick={onOpen} bg='blue.400' color='white'>
                    Send Offer
                  </Button>
                )}
                <InputGroup px={2} borderColor='black'>
                  <Input
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='Message'
                  />
                  <InputRightElement
                    px={3}
                    cursor='pointer'
                    onClick={send}
                    children={<FaPaperPlane />}
                  />
                </InputGroup>
              </Flex>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Connections;

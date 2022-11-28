import { Box, Flex, IconButton, useDisclosure, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ExperienceItem from "./experience-item";
import ExperienceModal from "./experience-modal";

const Experience = ({ experiences, reload, id, user }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box my={10} py={10} px={5} bg='white' borderRadius={20}>
      <ExperienceModal isOpen={isOpen} onClose={onClose} reload={reload} />
      <Flex justifyContent={"space-between"} alignItems='center' mb={5}>
        <Text fontWeight='bold' fontSize='20'>
          Experience
        </Text>
        {user._id === id && (
          <IconButton
            color='blue'
            icon={<FaPlus />}
            onClick={() => {
              onOpen();
            }}
          />
        )}
      </Flex>
      <Box>
        {experiences?.map((item) => (
          <ExperienceItem item={item} key={item._id} reload={reload} user={user} id={user} />
        ))}
      </Box>
    </Box>
  );
};


export default Experience;
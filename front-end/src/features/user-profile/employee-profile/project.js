import { Box, Flex, IconButton, useDisclosure, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import ProjectItem from "./project-item";
import ProjectModal from "./project-modal";

const Project = ({ projects, reload, user, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box my={10} py={10} px={5} bg='white' borderRadius={20}>
        <ProjectModal
          isOpen={isOpen}
          onClose={onClose}
          reload={reload}
        />
        <Flex justifyContent={"space-between"} alignItems='center' mb={5}>
          <Text fontWeight='bold' fontSize='20'>
            Project
          </Text>
          {user._id === id && (
            <IconButton
              color='blue'
              icon={<FaPlus />}
              onClick={onOpen}
            />
          )}
        </Flex>
        <Box>
          {projects?.map((item) => (
            <ProjectItem item={item} key={item._id} reload={reload} />
          ))}
        </Box>
      </Box>
  );
};

export default Project;

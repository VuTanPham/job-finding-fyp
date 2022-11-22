import { Box, Flex, IconButton, Image, Text, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { FaExternalLinkAlt, FaPen } from "react-icons/fa";
import ProjectModal from "./project-modal";

const ProjectItem = ({ item, reload }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pb={10} mb={10} borderBottomColor='#6c706d' borderBottomWidth='thin'>
      <ProjectModal
          isOpen={isOpen}
          onClose={onClose}
          reload={reload}
          data={item}
        />
      <Flex gap={5}>
        <Box>
          <Flex justifyContent="space-between" pr={10}>
            <Box>
            <Text fontSize={24} fontWeight='bold'>
            {item?.name}
          </Text>
          {item?.isCurrent ? (
            <>
              <Text>
                {moment(item?.startDate).format("MMMM DD YYYY")} - Present (
                {moment(item?.startDate)
                  .fromNow()
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
                )
              </Text>
            </>
          ) : (
            <>
              <Text>
                {moment(item?.startDate).format("MMMM DD YYYY")} -{" "}
                {moment(item?.endDate).format("MMMM DD YYYY")} (
                {moment(item?.startDate)
                  .from(item?.endDate)
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
                )
              </Text>
            </>
          )}
            </Box>
            <IconButton
              color='gray'
              icon={<FaPen />}
              onClick={onOpen}
            />
          </Flex>
          <a href={item?.repositoryUrl} target="_blank" style={{display: 'flex', alignItems: 'center', gap: 10, width: "fit-content", padding: "10px 20px", border: '1px solid gray', borderRadius: 20, marginTop: 5}}>
            <span>Visit Project</span>
            <FaExternalLinkAlt />
          </a>
          {item?.projectDescription && (
            <>
              <Text fontWeight='medium' mt={3}>
                Project Description:
              </Text>{" "}
              <Text>{item?.projectDescription}</Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProjectItem;

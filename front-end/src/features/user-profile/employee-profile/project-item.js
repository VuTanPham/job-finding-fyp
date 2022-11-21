import { Box, Flex, Image, Text } from "@chakra-ui/react";
import banner from "../../../assets/no-info.png";
import moment from "moment";
import { FaExternalLinkAlt, FaRegArrowAltCircleUp } from "react-icons/fa";

const ProjectItem = ({ item }) => {
  return (
    <Box pb={10} mb={10} borderBottomColor='#6c706d' borderBottomWidth='thin'>
      <Flex gap={5}>
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

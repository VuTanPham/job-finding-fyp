import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import banner from "../../../assets/no-info.png";
import moment from "moment";
import { FaPen } from "react-icons/fa";
import ExperienceModal from "./experience-modal";

const ExperienceItem = ({ item, reload }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box pb={10} mb={10} borderBottomColor='#6c706d' borderBottomWidth='thin'>
      <ExperienceModal isOpen={isOpen} onClose={onClose} reload={reload} data={item} />

      <Flex gap={5}>
        <Image src={banner} width={40} height={40} />
        <Box>
          <Flex justifyContent='space-between' pr={10}>
            <Box>
              <Text fontSize={24} fontWeight='bold'>
                {item?.jobPosition}
              </Text>
              <Text fontSize={18} fontWeight='medium'>
                Company: {item?.companyName}
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
            <IconButton color='gray' icon={<FaPen />} onClick={onOpen} />
          </Flex>
          {item?.description && (
            <>
              <Text fontWeight='medium' mt={3}>
                What I had done here:
              </Text>{" "}
              <Text>{item?.description}</Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ExperienceItem;

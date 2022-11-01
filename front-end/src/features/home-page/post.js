import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function PostItem({item}) {
  return (
    <Stack
      borderWidth='1px'
      borderRadius='lg'
      w={{ sm: "100%", md: "100%", lg: "1000px" }}
      height='fit-content'
      direction='column'
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      padding={4}
    >
      <Flex flex={1} bg='blue.200'>
        <Image
          objectFit='cover'
          boxSize='100%'
          height="400px"
          src={
            item.bannerUrl
          }
        />
      </Flex>
      <Stack
        flex={2}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        p={1}
        pt={2}
      >
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {item.title}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} size='sm' mb={4}>
          {item.createAt}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
         {item.description}
        </Text>
        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #IT
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #marketing
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            #engineer
          </Badge>
        </Stack>

        <Stack
          width={"100%"}
          mt={"2rem"}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Apply
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

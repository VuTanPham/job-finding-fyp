import { Box, Button, createIcon, Flex, Image, Text } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";

import checkFit from "../../assets/check-for-a-fit.svg";
import webDev from "../../assets/web-development.svg";
import message from "../../assets/message.svg";
import solve from "../../assets/solving-problems.svg";

export default function HomePage() {
  return (
    <>
      <Box>
        <Flex
          px={100}
          py={50}
          bgImage='radial-gradient(18% 28% at 24% 50%,#cefAFFFF 7%,#073AFF00 100%),radial-gradient(18% 28% at 18% 71%,#fffFFF59 6%,#073AFF00 100%),radial-gradient(70% 53% at 36% 76%,#73f2FFFF 0,#073AFF00 100%),radial-gradient(42% 53% at 15% 94%,#fffFFFFF 7%,#073AFF00 100%),radial-gradient(42% 53% at 34% 72%,#fffFFFFF 7%,#073AFF00 100%),radial-gradient(18% 28% at 35% 87%,#fffFFFFF 7%,#073AFF00 100%),radial-gradient(31% 43% at 7% 98%,#fffFFFFF 24%,#073AFF00 100%),radial-gradient(21% 37% at 72% 23%,#d3fF6D9C 24%,#073AFF00 100%),radial-gradient(35% 56% at 91% 74%,#8a4FFFF5 9%,#073AFF00 100%),radial-gradient(74% 86% at 67% 38%,#6dfFAEF5 24%,#073AFF00 100%),linear-gradient(125deg,#4eb5FFFF 1%,#4c00FCFF 100%)'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box fontWeight='bold' fontSize={30} maxWidth={300}>
            <Text>Start Using Platform to Connect With Company - Employee</Text>
            <Box>
              <Button
                bgImage='linear-gradient(90deg, rgb(161, 0, 255) 0%, rgb(113, 196, 255) 100%)'
                color={"white"}
              >
                Get Started <FaSignInAlt style={{ marginLeft: 10 }} />
              </Button>
            </Box>
          </Box>
          <Image src={checkFit} height={"50%"} width='50%' />
        </Flex>
        <Flex
          pl={100}
          pr={250}
          py={50}
          alignItems='center'
          justifyContent='space-between'
          direction='row-reverse'
        >
          <Box fontWeight='bold' fontSize={30} maxWidth={350}>
            <Text>
              Real-Time Chatting - Easy to Communicate with Each Other
            </Text>
          </Box>
          <Image src={message} height={"50%"} width='50%' />
        </Flex>
        <Flex
          pr={100}
          pl={250}
          py={50}
          alignItems='center'
          justifyContent='space-between'
          bgImage='conic-gradient(from 36deg at 35% 100%, rgb(161, 0, 255) 0%, rgb(0, 0, 0) 25%, rgb(17, 156, 253) 30%)'
        >
          <Box fontWeight='bold' fontSize={30} maxWidth={350}>
            <Text>
              Show Out Your Skills with Wonderful Portfolio
            </Text>
          </Box>
          <Image src={webDev} height={"50%"} width='50%' />
        </Flex>
        <Flex
          pl={100}
          pr={250}
          py={50}
          alignItems='center'
          justifyContent='space-between'
          direction='row-reverse'
        >
          <Box fontWeight='bold' fontSize={30} maxWidth={300}>
            <Text>
              Solving the Hiring Employee Problems with Us
            </Text>
          </Box>
          <Image src={solve} height={"50%"} width='50%' />
        </Flex>
      </Box>
    </>
  );
}

const Arrow = createIcon({
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z'
      fill='currentColor'
    />
  ),
});

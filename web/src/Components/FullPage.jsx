import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import BTHButton from "./BTHButton";
import { AnimatedPage } from "./AnimatedPage";

function FullPage({ children, nobackbtn = false, ...props }) {
  return (
    <Flex w="100vw" h="100dvh" {...props} flexDirection="column" alignItems={"center"} justifyContent={"center"} p="1">
      <Box w="100%" maxW="sm" h="100dvh" border="1px" borderColor={"white"} rounded={"lg"} bgColor={"blackAlpha.500"}>
        <Flex flexDir={"column"} h="full" w="full">
          <Box h="full" flex="1" overflowY={"auto"}><AnimatedPage>{children}</AnimatedPage></Box>
          {!nobackbtn && <BTHButton />}
        </Flex>
      </Box>
    </Flex>
  );
}

export { FullPage };

import React, { useEffect, useRef } from "react";
import { FullPage } from "../Components/FullPage";
import { Button, Divider, Flex, Input, InputGroup, Text } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";

function Chat() {
  const { emit, chat } = useAuth();
  useEffect(() => {
    emit("joinchat");
    return () => {
      emit("leavechat");
    };
  });

  const [tempChat, setTempChat] = React.useState("");
  const handleSend = (e) => {
    e.preventDefault()
    emit("sendchat", tempChat);
    setTempChat("");
  };

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  return (
    <FullPage>
      <Flex w="full" h="full" flexDir={"column"}>
        <Text fontSize={"xl"} mt="2" mx="2">
          Chat with other detectives
        </Text>
        <Divider />
        <Flex flexGrow={1} overflowY={"auto"} flexDir={"column"} gap={1}>
          {chat.map(({ group, message }) => {
            return (
              <Flex
                ref={scrollRef}
                maxW="75%"
                shadow={"md"}
                border={"1px"}
                borderColor="blackAlpha.400"
                rounded={"md"}
                p="1"
                px="2"
                mx="2"
                mt="1"
                alignSelf="flex-start"
                bg="purple.500"
                flexDir={"column"}
                alignItems={"flex-start"}
              >
                <Text>Detective #{group}: {message}</Text>
              </Flex>
            );
          })}
        </Flex>
        <form onSubmit={handleSend}>

        <InputGroup>
          <Input value={tempChat} onChange={(e) => setTempChat(e.target.value)} placeholder="Send a message..."></Input>
          <Button type="submit">Send</Button>
        </InputGroup>
        </form>
      </Flex>
    </FullPage>
  );
}

export default Chat;

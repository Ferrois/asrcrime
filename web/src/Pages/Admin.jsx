import React from "react";
import { FullPage } from "../Components/FullPage";
import { Box, Button, Flex, Heading, Input, InputGroup, Text } from "@chakra-ui/react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { emit } = useAuth();
  const handleLogin = () => {
    emit("admin-login", inputcode);
  };
  const [inputcode, setInputcode] = React.useState("");
  const navigate = useNavigate()
  return (
    <FullPage nobackbtn>
      <Flex w="100%" h="100%" p="3" flexDir="column" justifyContent={"center"} gap={"5"}>
        <Box>
          <Heading color={"red.400"}>ADMIN Interface</Heading>
          <Text>ASR Crime Scene, Gamemasters</Text>
        </Box>
        <InputGroup>
          <Input placeholder="Admin Code" value={inputcode} onChange={(e) => setInputcode(e.target.value)}></Input>
          <Button onClick={handleLogin}>Unlock</Button>
        </InputGroup>
        <Button onClick={() => navigate("/")} size={"sm"}>Detective interface</Button>
      </Flex>
    </FullPage>
  );
}

export default Admin;

import { Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import React from "react";
import { FullPage } from "../../Components/FullPage";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function Root() {
  const { emit } = useAuth();
  const handleLogin = () => {
    emit("login", inputcode);
  };
  const [inputcode, setInputcode] = React.useState("");
  const navigate = useNavigate();
  return (
    <FullPage nobackbtn>
      <Flex w="100%" h="100%" p="3" flexDir="column" justifyContent={"center"} gap={"5"}>
        <Box>
          <Heading color="blue.100">Detective, Ready?</Heading>
          <Text>Crime Scene @ ASR STEM (best cca)</Text>
        </Box>
        <InputGroup>
          <Input placeholder="Input Code" value={inputcode} onChange={(e) => setInputcode(e.target.value)}></Input>
          {/* <InputRightElement> */}
          <Button onClick={handleLogin} colorScheme="messenger">Unlock</Button>
          {/* </InputRightElement> */}
        </InputGroup>
        <Button onClick={() => navigate("/admin")} size={"sm"}>Gamemasters admin interface</Button>
      </Flex>
    </FullPage>
  );
}

export default Root;

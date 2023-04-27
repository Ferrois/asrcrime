import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function PhoneHead() {
  const { logout,group } = useAuth();
  return (
    <Flex alignItems={"center"}>
      <Button onClick={() => logout()} colorScheme="red" m="2">Logout</Button>
      <Text>Detectives #{group}, we need your help!</Text>
    </Flex>
  );
}

export default PhoneHead;

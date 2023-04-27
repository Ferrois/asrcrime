import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function BTHButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  return (
    <Flex w="full" justifyContent={"center"} p={1} borderTop={"2px"} borderColor={"blackAlpha.400"}>
      <Button onClick={()=>handleClick()}>O</Button>
    </Flex>
  );
}

export default BTHButton;

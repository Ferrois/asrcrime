import { Button, Input, InputGroup, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function ModifyInput({ group, score }) {
  const { emit } = useAuth();
  const [value, setValue] = useState(score);
  const handleSave = () => {
    emit("admin-modify-score", { group:group, score: value });
  };

  return (
    <Tr>
      <Td>{group}</Td>
      <Td>{score}</Td>
      <Td>
        <InputGroup>
          <Input
            type="number"
            width={"75px"}
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></Input>
          <Button colorScheme="linkedin" onClick={handleSave}>
            Save
          </Button>
        </InputGroup>
      </Td>
    </Tr>
  );
}

export default ModifyInput;

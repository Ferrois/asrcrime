import React, { useEffect, useState } from "react";
import { FullPage } from "../Components/FullPage";
import { useAuth } from "../Context/AuthContext";
import { Button, Flex, Heading, Input, InputGroup, Table, TableContainer, Td, Text, Th, Tr } from "@chakra-ui/react";
import ModifyInput from "../Components/ModifyInput";

function Interface() {
  const { emit, adminTeams, gamename, logout, token } = useAuth();
  useEffect(() => {
    emit("admin-request");
  }, [token]);
  return (
    <FullPage nobackbtn>
        <Button colorScheme="red" m="2" onClick={()=>logout("/admin")}>Logout</Button>
      <Heading mx="2">Modify Scores</Heading>
      <Text ml="2">
        Game name: <b>{gamename}</b>
      </Text>
      <TableContainer>
        <Table variant={"simple"}>
          <Tr>
            <Th>Group</Th>
            <Th>Score</Th>
            <Th>Modify</Th>
          </Tr>
          {adminTeams.map(({ group, score }) => {
            return (
              <ModifyInput group={group} score={score} />
            );
          })}
        </Table>
      </TableContainer>
      {/* {JSON.stringify(inputtedScores)}
      <Flex justifyContent={"flex-end"} p="1">
        <Button colorScheme="linkedin">Update Scores</Button>
      </Flex> */}
    </FullPage>
  );
}

export default Interface;

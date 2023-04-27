import React, { useEffect } from "react";
import { FullPage } from "../Components/FullPage";
import { useAuth } from "../Context/AuthContext";
import { Heading, Table, TableContainer, Td, Text, Th, Tr } from "@chakra-ui/react";

function Score() {
  const { emit, score } = useAuth();
  useEffect(() => {
    emit("getscore");
  }, []);
  return (
    <FullPage>
      <Heading m="2">Your Scores</Heading>
      <TableContainer>
        <Table>
          <Tr>
            <Th>Game</Th>
            <Th>Score</Th>
          </Tr>
          {score.list?.map(({ game, score }) => {
            return (
              <Tr>
                <Td>{game}</Td>
                <Td>{score}</Td>
              </Tr>
            );
          })}
          <Th>Total</Th>
          <Td fontWeight={"bold"}>{score.totalScore}</Td>
        </Table>
      </TableContainer>
    </FullPage>
  );
}

export default Score;

import { Flex, Table, TableContainer, Td, Text, Th, Tr } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";

function AdminView() {
  const { emit, adminview } = useAuth();
  useEffect(() => {
    emit("adminview-request");
  }, []);
  useEffect(() => {
    console.log(adminview);
  }, [adminview]);
  return (
    <Flex h="100dvh" w="100dwh">
      <TableContainer>
        <Table>
          <Tr>
            <Th>Group</Th>
            <Th>Game 1</Th>
            <Th>Game 2</Th>
            <Th>Game 3</Th>
            <Th>Game 4</Th>
            <Th>Game 5</Th>
            <Th>Game 6</Th>
            <Th>Game 7</Th>
            <Th>Total</Th>
          </Tr>
          {adminview &&
            adminview?.map(({ group, games, totalScore }) => (
              <Tr key={group}>
                <Td>
                  <Text>{group}</Text>
                </Td>
                <Td>
                  <Text>{games["1"].score}</Text>
                </Td>
                <Td>
                  <Text>{games["2"].score}</Text>
                </Td>
                <Td>{games["3"].score}</Td>
                <Td>{games["4"].score}</Td>
                <Td>{games["5"].score}</Td>
                <Td>{games["6"].score}</Td>
                <Td>{games["7"].score}</Td>

                <Td>{totalScore}</Td>
              </Tr>
            ))}
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default AdminView;

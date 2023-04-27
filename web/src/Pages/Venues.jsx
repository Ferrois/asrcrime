import React from "react";
import { FullPage } from "../Components/FullPage";
import { Table, TableContainer, Td, Th, Tr } from "@chakra-ui/react";

function Venues() {
  return (
    <FullPage>
      <TableContainer>
        <Table>
          <Tr>
            <Th>Game</Th>
            <Th>Activity</Th>
            <Th>Venue</Th>
          </Tr>
          <Tr>
            <Td>1</Td>
            <Td>Chemistry</Td>
            <Td>Elementz</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Math & Riddles</Td>
            <Td>134</Td>
          </Tr>
          <Tr>
            <Td>3</Td>
            <Td>Techno</Td>
            <Td>133</Td>
          </Tr>
          <Tr>
            <Td>4</Td>
            <Td>Forensics</Td>
            <Td>1322</Td>
          </Tr>
          <Tr>
            <Td>5</Td>
            <Td>Astronomy</Td>
            <Td>135</Td>
          </Tr>
          <Tr>
            <Td>6</Td>
            <Td>Physics</Td>
            <Td>Playpen</Td>
          </Tr>
          <Tr>
            <Td>7</Td>
            <Td>Bio Analysis</Td>
            <Td>Playpen</Td>
          </Tr>
        </Table>
      </TableContainer>
    </FullPage>
  );
}

export default Venues;

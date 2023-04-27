import React, { useEffect } from "react";
import { FullPage } from "../Components/FullPage";
import { useAuth } from "../Context/AuthContext";
import { Box, Button, Card, CardBody, Divider, Flex, Grid, Heading, Text } from "@chakra-ui/react";

function Clues() {
  const { emit, score, clues } = useAuth();
  useEffect(() => {
    emit("getclues");
    emit("getscore");
  }, []);
  return (
    <FullPage>
      {/* {JSON.stringify(clues)} */}
      <Box>
        <Heading mx="2" my="1">Your Score: {score.totalScore}</Heading>
        <Divider/>
        {clues.map(({ disc, tf, score }, index) => {
          return (
            
            <Card m={2} bgColor={tf == "true" ? "green" : tf == "false" ? "red" : "gray.700"}>
              <CardBody>
                <Heading fontSize={"2xl"}>Clue {index + 1}</Heading>
                <Divider />
                <Text fontSize={"xl"}>{disc}</Text>
                <Divider />
                <Flex alignItems={"center"} justifyContent={"space-between"} fontSize="sm">
                  <Text>True/False: {tf}</Text>
                  <Text>{score} Score to Uncover</Text>
                </Flex>
              </CardBody>
            </Card>
          );
        })}
      </Box>
    </FullPage>
  );
}

export default Clues;

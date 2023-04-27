import React from "react";
import { FullPage } from "../Components/FullPage";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";

function Info() {
  return (
    <FullPage>
      <Box p="3" bgColor="gray.800" rounded="md" m="2">
        <Heading mb="2">Lore</Heading>
        <Divider />
        <Text color="red.300">
          Detective Ferrdog stood at the edge of the crime scene, his eyes scanning the area with a mixture of disbelief and
          horror. The victim, a young man in his teens, lay motionless on the ground, a pool of blood spreading around her body.
          The air was thick with the scent of death, and Ferrdog's stomach turned as he took in the gruesome scene before him.
          <br />
          <br /> As he surveyed the area, Ferrdog couldn't help but wonder who could have committed such a heinous act. The victim
          appeared to have been stabbed multiple times, his once-beautiful face now twisted in agony. A faint trail of footprints
          led away from the scene, but other than that, there was no evidence of the perpetrator.
          <br />
          <br /> Ferrdog knew that he had his work cut out for him, but he also knew that he would stop at nothing to find the
          person responsible for this senseless murder. With a deep breath, he stepped forward, his mind already racing with
          possible leads and suspects. The hunt for the killer had begun.
        </Text>
        <Divider/>
        <Heading>Go on, detective. Solve the case!</Heading>
      </Box>
    </FullPage>
  );
}

export default Info;

import {
  Container,
  Grid,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { Navbar, StatsCard } from "~/components";

import variablesPLC from "~/assets/variables-api";

const booleanToString = (bool: boolean) => {
  return bool ? "ON" : "OFF";
};

export default function Configuration({}) {
  const [variables, setVariables] = useState({
    dp1: true,
    dc1: false,
    dp2: false,
    dc2: true,
  });

  return (
    <>
      <Head>
        <title>Monitoring | Projet Industriel</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <Heading textAlign={"center"} fontSize={"4xl"} py={10}>
          Monitoring
        </Heading>
        <Container
          maxW="7xl"
          mx={"auto"}
          pt={5}
          px={{ base: 2, sm: 12, md: 17 }}
        >
          <Grid templateColumns="repeat(3, 1fr)" gap={6} pb={10}>
            <StatsCard title={"DP1"} stat={booleanToString(variables.dc1)} />
            <StatsCard title={"DC1"} stat={booleanToString(variables.dp1)} />
            <StatsCard title={"DP2"} stat={booleanToString(variables.dc1)} />
            <StatsCard title={"DC2"} stat={booleanToString(variables.dc1)} />
          </Grid>
          <TableContainer>
            <Table variant="striped">
              <TableCaption>Variables du PLC</TableCaption>
              <Thead>
                <Tr>
                  <Th>Nom</Th>
                  <Th>Adresse sur le PLC</Th>
                  <Th>Valeur actuelle</Th>
                  <Th>Description</Th>
                </Tr>
              </Thead>
              <Tbody>
                {variablesPLC.map((variable) => (
                  <Tr key={variable.address}>
                    <Th>{variable.name}</Th>
                    <Th>{variable.address}</Th>
                    <Th>{variable.value}</Th>
                    <Th>{variable.description}</Th>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </>
  );
}

import { Container, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar, StatsCard } from "~/components";

import variablesPLC from "~/assets/variables-api";

const booleanToString = (bool: boolean) => {
  return bool ? "ON" : "OFF";
};

export default function Configuration({}) {
  const [variables, setVariables] = useState({});

  const getVariables = async () => {
    const res = await fetch("/api/tags/get/last/all", {
      method: "POST",
    });
    const data = await res.json();
    console.log(data);

    // setVariables(data);
  };

  useEffect(() => {
    getVariables();
  }, []);

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
            {variablesPLC.map((v) => {
              return (
                <StatsCard
                  key={v.name}
                  title={v.longname ? v.longname : v.name}
                  stat={booleanToString(
                    variables[v.name as keyof typeof variables]
                  )}
                />
              );
            })}
            {/* <StatsCard title={"DP1"} stat={booleanToString(variables.dc1)} />
            <StatsCard title={"DC1"} stat={booleanToString(variables.dp1)} />
            <StatsCard title={"DP2"} stat={booleanToString(variables.dc1)} />
            <StatsCard title={"DC2"} stat={booleanToString(variables.dc1)} /> */}
          </Grid>
        </Container>
      </main>
    </>
  );
}

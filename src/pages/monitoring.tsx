import { Container, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar, StatsCard } from "~/components";

// import tagsPLC from "~/assets/variables-api";

const booleanToString = (bool: boolean) => {
  return bool ? "ON" : "OFF";
};

const formatString = (value: string | number | boolean) => {
  if (typeof value === "boolean") return booleanToString(value);
  if (typeof value === "string" && (value === "0" || value === "1"))
    return booleanToString(value === "1");
};

interface Tag {
  name: string;
  value: string | number | boolean;
  show: boolean;
  date: string;
}

const tagsName = {
  dc1: "DC1",
  dp1: "DP1",
  dc2: "DC2",
};

export default function Configuration({}) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [update, setUpdate] = useState(false);

  const getVariables = async () => {
    const res = await fetch("/api/tags/get/all", {
      method: "POST",
    });
    const data = await res.json();

    if (data.length === 0) return;

    var equalsArray = true;
    for (var i = 0; i < data.length; i++) {
      if (data[i].value !== tags[i]?.value || data[i].show !== tags[i]?.show) {
        equalsArray = false;
        break;
      }
    }

    if (equalsArray === false) {
      setTags(data);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate(!update);
    }, 1000);
    return () => clearInterval(timer);
  }, [update]);

  useEffect(() => {
    getVariables();
  }, [update]);

  const showTags = (tags: Tag[]) => {
    return tags.map((tag: Tag) => {
      if (tag.show === false) return null;
      return (
        <StatsCard
          key={tag.name}
          title={tagsName[tag.name as keyof typeof tagsName] || tag.name}
          stat={formatString(tag.value) || "N/A"}
        />
      );
    });
  };

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
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            gap={6}
            pb={10}
          >
            {showTags(tags)}
          </Grid>
        </Container>
      </main>
    </>
  );
}

import { Container, Flex, Grid, Heading, Icon } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navbar, StatsCard } from "~/components";
import { FaCircle } from "react-icons/fa";
import { Tag } from "~/assets/types";
import { tagsConfig } from "~/assets/tags";
import { requireAuthentification } from "~/server/requireAuthentification";
import { InferGetServerSidePropsType } from "next";
import { getTagsShowed } from "~/server/getTags";

const booleanToString = (bool: boolean) => {
  return bool ? "ON" : "OFF";
};

const formatString = (value: string | number | boolean) => {
  if (typeof value === "boolean") return booleanToString(value);
  if (typeof value === "string" && (value === "0" || value === "1"))
    return booleanToString(value === "1");
};

export default function Configuration(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate(!update);
    }, 1000);
    return () => clearInterval(timer);
  }, [update]);

  useEffect(() => {
    getTagsShowed().then((tags) => {
      setTags(tags);
    });
  }, [update]);

  const showTags = (tags: Tag[]) => {
    return tags.map((tag: Tag) => {
      return (
        <StatsCard
          key={tag.name}
          title={tag.displayName || tag.name}
          tagName={tag.name}
          stat={formatString(tag.value) || tag.value.toString()}
          icon={
            tag.value === "1" || tag.value === "0" ? (
              formatString(tag.value) === "ON" ? (
                <Icon as={FaCircle} color="green.500" />
              ) : (
                <Icon as={FaCircle} color="red.500" />
              )
            ) : null
          }
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
          <Flex flexWrap={"wrap"} gap={6} pb={10}>
            {showTags(tags)}
          </Flex>
        </Container>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return requireAuthentification(
    context,
    () => {
      return {
        props: {},
      };
    },
    ["ADMIN", "TECH"]
  );
}

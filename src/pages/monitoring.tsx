// Importation des composants nécessaires depuis les modules
import { Container, Flex, Heading, Icon } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Navbar, StatsCard } from "~/components";
import { FaCircle } from "react-icons/fa";
import { Tag } from "~/assets/types";
import { requireAuthentification } from "~/server/requireAuthentification";
import { InferGetServerSidePropsType } from "next";
import { getTagsShowed } from "~/server/getTags";

// Fonction pour convertir une valeur booléenne en chaîne de caractères
const booleanToString = (bool: boolean) => {
  return bool ? "ON" : "OFF";
};

// Fonction pour formater une valeur en chaîne de caractères
const formatString = (value: string | number | boolean) => {
  if (typeof value === "boolean") return booleanToString(value);
  if (typeof value === "string" && (value === "0" || value === "1"))
    return booleanToString(value === "1");
};

// Définition du composant Configuration
export default function Configuration(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  // Déclaration des états du composant
  const [tags, setTags] = useState<Tag[]>([]);
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState("0");

  // Effet pour mettre à jour le composant toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setUpdate(!update);
    }, 1000);
    return () => clearInterval(timer);
  }, [update]);

  // Effet pour récupérer les tags à afficher
  useEffect(() => {
    getTagsShowed().then((tags) => {
      setTags(tags);
    });
  }, [update]);

  // Fonction pour afficher les tags
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

  // Rendu du composant
  return (
    <>
      <Head>
        <title>Monitoring | Projet Industriel</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
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

// Fonction pour récupérer les propriétés du serveur
export async function getServerSideProps(context: any) {
  return requireAuthentification(
    context,
    () => {
      return {
        props: {},
      };
    },
    ["ADMIN", "TECH"] // Seuls les utilisateurs avec les rôles "ADMIN" et "TECH" sont autorisés
  );
}

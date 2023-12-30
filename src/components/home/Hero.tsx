// Importation des composants nécessaires depuis les bibliothèques correspondantes
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Définition du composant HeroHome
export default function HeroHome() {
  // Utilisation du hook useSession pour obtenir la session actuelle
  const { data: session } = useSession();

  // Rendu du composant
  return (
    <Stack
      minH={"calc(100vh - 4rem)"} // Hauteur minimale du composant
      direction={{ base: "column", md: "row" }} // Direction du stack en fonction de la taille de l'écran
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: useColorModeValue("blue.200", "blue.400"),
                zIndex: -1,
              }}
            >
              Projet industriel
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Dans l'ère actuelle de l'industrie, notre défi est aussi stimulant
            que nécessaire : extraire en toute sécurité des données cruciales
            d'un automate et les rendre accessibles aux utilisateurs via une
            interface web, tout en maintenant un niveau de sécurité inégalé.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              as={Link}
              href={
                ["ADMIN", "TECH"].includes(session?.user.role || "")
                  ? "/monitoring"
                  : "/auth/signin"
              }
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Monitoring
            </Button>
            <Button
              as={Link}
              href={
                session?.user.role === "ADMIN"
                  ? "/configuration"
                  : "/auth/signin"
              }
              rounded={"full"}
            >
              Configuration
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex
        maxH={"calc(100vh - 4rem)"}
        justify={"end"}
        flex={1}
        display={{ base: "none", md: "flex" }}
      >
        <Image
          alt={"Home page image"}
          width={"100%"}
          objectFit={"cover"}
          src={"/hero-banner.png"}
        />
      </Flex>
    </Stack>
  );
}

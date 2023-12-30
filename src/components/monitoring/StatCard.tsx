// Importation des composants nécessaires depuis les modules correspondants
import {
  Box,
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

// Définition des propriétés attendues par le composant
interface StatsCardProps {
  title: string; // Titre de la carte
  stat: string; // Statistique à afficher
  icon?: ReactNode; // Icône à afficher (optionnelle)
  tagName: string; // Nom du capteur
}

// Définition du composant StatsCard
export default function StatsCard({
  title,
  stat,
  icon,
  tagName,
}: StatsCardProps) {
  // Retourne le composant StatCard
  return (
    <Stat
      minW={"300px"} // Largeur minimale de la carte
      px={2} // Padding horizontal
      py={"5"} // Padding vertical
      shadow={"xl"} // Ombre de la carte
      border={"1px solid"} // Bordure de la carte
      borderColor={useColorModeValue("gray.800", "gray.500")} // Couleur de la bordure en fonction du mode de couleur
      rounded={"lg"} // Arrondissement des coins de la carte
    >
      <Flex justifyContent={"space-between"}>
        {/* Conteneur flexible pour aligner les éléments horizontalement */}
        <Box pl={{ base: 2, md: 4 }}>
          {" "}
          {/* Conteneur pour le titre, la statistique et le nom du capteur */}
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
          <StatHelpText>
            Capteur : <i>{tagName}</i>
          </StatHelpText>
        </Box>
        <Box
          my={"auto"} // Centrage vertical de l'icône
          mx={{ base: 2, md: 4 }} // Marge horizontale de l'icône
          fontSize={"xl"} // Taille de l'icône
          alignContent={"center"} // Centrage horizontal de l'icône
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

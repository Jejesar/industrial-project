// Importation des composants et des hooks nécessaires depuis les modules
import {
  Button,
  Checkbox,
  Container,
  Heading,
  Icon,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { EditModal, Navbar } from "~/components";
import { requireAuthentification } from "~/server/requireAuthentification";
import { InferGetServerSidePropsType } from "next";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Tag } from "~/assets/types";
import { getTagsSorted } from "~/server/getTags";
import { CloseIcon } from "@chakra-ui/icons";

// Définition du composant Configuration
export default function Configuration({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Utilisation des hooks pour gérer l'état local
  const { isOpen, onOpen, onClose } = useDisclosure(); // Gestion de l'ouverture/fermeture du modal
  const [selectedTag, setSelectedTag] = useState<Tag>(); // Gestion du tag sélectionné
  const [tags, setTags] = useState<Tag[]>([]); // Gestion de la liste des tags
  const [selectedColor, setSelectedColor] = useState<string>("off"); // Gestion de la couleur sélectionnée

  // Fonction pour ouvrir le modal d'édition
  const openModal = (tag: Tag) => {
    setSelectedTag(tag); // Mise à jour du tag sélectionné
    console.log(tag);

    onOpen(); // Ouverture du modal
  };

  // Utilisation de l'effet pour récupérer les tags triés lors du montage du composant
  useEffect(() => {
    getTagsSorted().then((tags) => {
      setTags(tags); // Mise à jour de la liste des tags
    });
  }, []);

  // Fonction pour gérer l'allumage de la lumière
  const handleLight = async (light: string) => {
    const body = {
      color: light,
    };
    const res = await fetch("/api/color", {
      // Envoi de la requête à l'API
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json(); // Récupération de la réponse
    console.log(data);
  };

  // Fonction pour gérer le changement de la sélection de la couleur
  const handleSelectChange = (e: any) => {
    setSelectedColor(e.target.value); // Mise à jour de la couleur sélectionnée
    console.log(e.target.value);
  };

  return (
    <>
      <Head>
        {/* Définition du titre et de la description de la page */}
        <title>Configuration | Projet Industriel</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
      </Head>
      <header>
        {/* Affichage de la barre de navigation */}
        <Navbar />
      </header>
      <main>
        {/* Affichage du titre de la page */}
        <Heading textAlign={"center"} fontSize={"4xl"} pt={10}>
          Configuration
        </Heading>
        {/* Affichage d'un message d'information */}
        <Text
          textAlign={"center"}
          fontSize={"xl"}
          pb={10}
          pt={1}
          color={"gray"}
        >
          Pour une meilleure expérience, veuillez utilisez un écran large.
        </Text>

        <Container maxW={"7xl"}>
          {/* Création d'un formulaire pour la sélection de la couleur */}
          <Stack direction={"column"} justify={"center"} flexWrap={"wrap"}>
            <Select
              placeholder="Sélectionner la couleur"
              onChange={handleSelectChange} // Gestion du changement de la sélection
            >
              {/* Options de la sélection */}
              <option value="off">Lampe éteinte</option>
              <option value="red">Rouge</option>
              <option value="green">Verte</option>
              <option value="blue">Bleue</option>
              <option value="white">Blanche</option>
              <option value="rainbow">Rainbow</option>
            </Select>
            {/* Bouton pour envoyer la couleur sélectionnée */}
            <Button
              colorScheme="green"
              onClick={() => handleLight(selectedColor)} // Gestion du clic sur le bouton
            >
              Envoyer
            </Button>
          </Stack>
        </Container>

        {/* Création d'un tableau pour la configuration des tags */}
        <TableContainer
          maxW="7xl"
          mx={"auto"}
          pt={5}
          px={{ base: 2, sm: 5, md: 10 }}
        >
          <Table variant="striped">
            <TableCaption>Configuration des tags</TableCaption>
            <Thead>
              {/* En-têtes du tableau */}
              <Tr>
                <Th>Tag</Th>
                <Th>Nom affiché</Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th>Visible</Th>
                <Th>Edition</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Lignes du tableau, générées à partir de la liste des tags */}
              {tags.map((tag) => (
                <Tr key={tag?.name}>
                  <Td>{tag?.name}</Td>
                  <Td>{tag?.displayName || tag?.name}</Td>
                  <Td>{tag?.type}</Td>
                  <Td>{tag?.description}</Td>
                  <Td>
                    {/* Affichage de l'état de visibilité du tag */}
                    {tag?.show ? (
                      <Checkbox isReadOnly defaultChecked colorScheme="green" />
                    ) : (
                      <Checkbox
                        isReadOnly
                        defaultChecked
                        colorScheme="red"
                        icon={<Icon as={CloseIcon} />}
                      />
                    )}
                  </Td>
                  <Td>
                    {/* Bouton pour ouvrir le modal d'édition du tag */}
                    <Button onClick={() => openModal(tag)} colorScheme="teal">
                      <Icon as={FaEdit} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Modal d'édition du tag */}
        <EditModal
          isOpen={isOpen} // Etat d'ouverture du modal
          onOpen={onOpen} // Fonction pour ouvrir le modal
          onClose={onClose} // Fonction pour fermer le modal
          tag={selectedTag} // Tag à éditer
        />
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  // Vérification de l'authentification de l'utilisateur
  return requireAuthentification(
    context,
    () => {
      return {
        props: {},
      };
    },
    ["ADMIN"] // Seuls les utilisateurs avec le rôle "ADMIN" sont autorisés
  );
}

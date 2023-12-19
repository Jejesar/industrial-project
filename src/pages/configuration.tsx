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
  useColorModeValue,
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
import { useSession } from "next-auth/react";

export default function Configuration({}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("off");

  const openModal = (tag: Tag) => {
    setSelectedTag(tag);
    console.log(tag);

    onOpen();
  };

  useEffect(() => {
    getTagsSorted().then((tags) => {
      setTags(tags);
    });
  }, []);

  const handleLight = async (light: string) => {
    const body = {
      color: light,
    };
    const res = await fetch("/api/color", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
  };

  const handleSelectChange = (e: any) => {
    setSelectedColor(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Configuration | Projet Industriel</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <Heading textAlign={"center"} fontSize={"4xl"} pt={10}>
          Configuration
        </Heading>
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
          <Stack direction={"column"} justify={"center"} flexWrap={"wrap"}>
            <Select
              placeholder="Sélectionner la couleur"
              onChange={handleSelectChange}
            >
              <option value="off">Lampe éteinte</option>
              <option value="red">Rouge</option>
              <option value="green">Verte</option>
              <option value="blue">Bleue</option>
              <option value="white">Blanche</option>
              <option value="rainbow">Rainbow</option>
            </Select>
            <Button
              colorScheme="green"
              onClick={() => handleLight(selectedColor)}
            >
              Envoyer
            </Button>

            {/* <Button colorScheme="red" onClick={() => handleLight("red")}>
                Turn on Red Light
              </Button>
              <Button colorScheme="green" onClick={() => handleLight("green")}>
                Turn on Green Light
              </Button>
              <Button
                colorScheme="yellow"
                onClick={() => handleLight("yellow")}
              >
                Turn on Yellow Light
              </Button>
            </Stack>
            <Stack direction={"row"} justify={"center"} flexWrap={"wrap"}>
              <Button
                color={useColorModeValue("gray.800", "white")}
                variant="outline"
                borderWidth={2}
                onClick={() => handleLight("white")}
              >
                Turn on White Light
              </Button>
              <Button colorScheme="gray" onClick={() => handleLight("off")}>
                Turn off Light
              </Button>
              <Button
                colorScheme="gray"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
                color="white"
                onClick={() => handleLight("rainbow")}
              >
                RAINBOW TIME
              </Button> */}
          </Stack>
        </Container>

        <TableContainer
          maxW="7xl"
          mx={"auto"}
          pt={5}
          px={{ base: 2, sm: 5, md: 10 }}
        >
          <Table variant="striped">
            <TableCaption>Configuration des tags</TableCaption>
            <Thead>
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
              {tags.map((tag) => (
                <Tr key={tag?.name}>
                  <Td>{tag?.name}</Td>
                  <Td>{tag?.displayName || tag?.name}</Td>
                  <Td>{tag?.type}</Td>
                  <Td>{tag?.description}</Td>
                  <Td>
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
                    <Button onClick={() => openModal(tag)} colorScheme="teal">
                      <Icon as={FaEdit} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <EditModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          tag={selectedTag}
        />
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
    ["ADMIN"]
  );
}

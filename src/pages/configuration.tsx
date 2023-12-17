import {
  Button,
  Checkbox,
  Heading,
  Icon,
  Skeleton,
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
import { useSession } from "next-auth/react";

export default function Configuration({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session, status } = useSession();

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

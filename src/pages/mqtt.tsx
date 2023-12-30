// Importation des composants nécessaires depuis les modules "@chakra-ui/react", "mqtt", "react", "~/server/requireAuthentification" et "next"
import {
  Button,
  Container,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import mqtt from "mqtt";
import React, { useEffect, useState } from "react";
import { requireAuthentification } from "~/server/requireAuthentification";
import { InferGetServerSidePropsType } from "next";

// Définition du composant Mqtt
const Mqtt = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // Déclaration des états du composant
  const [messages, setMessages] = useState([{ message: "", topic: "" }]);
  const [lastMessage, setLastMessage] = useState({
    message: "",
    topic: "",
  });
  const [value, setValue] = useState("0");

  // Connexion au serveur MQTT
  const client = mqtt.connect("ws://helhatechniquecharleroi.xyz", {
    port: 9001,
    username: "groupe2",
    password: "groupe2",
    keepalive: 60,
  });

  // Effet pour ajouter le dernier message à la liste des messages
  useEffect(() => {
    setMessages((messages) => [...messages, lastMessage]);
    console.log("lastMessage: ", lastMessage);
  }, [lastMessage]);

  // Effet pour gérer la connexion et la réception des messages
  useEffect(() => {
    client.on("connect", () => {
      client.subscribe("/groupe2/#");
    });

    client.on("message", (topic, message) => {
      // message is Buffer
      setLastMessage({ message: message.toString(), topic: topic });
      console.log("lastMessage: ", lastMessage);
    });

    return () => {
      client.unsubscribe("/groupe2/#");
    };
  }, []);

  // Fonction pour publier un message MQTT
  const publishMQTT = () => {
    client.publish("/groupe2/dc1", value);
    setValue(value === "0" ? "1" : "0");
  };

  // Rendu du composant
  return (
    <Container maxW={"7xl"}>
      <Stack spacing={4} py={4} direction={"row"}>
        <Button onClick={() => setMessages([])}>Clear</Button>
        <Button onClick={publishMQTT}>Toggle DC1 ({value})</Button>
      </Stack>
      <Heading>Received Messages: </Heading>
      <UnorderedList>
        {messages.map((m, key) => {
          if (m.message === "") return;
          return (
            <ListItem key={key}>
              ({m.topic}): {m.message}
            </ListItem>
          );
        })}
      </UnorderedList>
    </Container>
  );
};

export default Mqtt;

// Fonction pour récupérer les propriétés du serveur
export const getServerSideProps = async (context: any) => {
  return requireAuthentification(
    context,
    () => {
      return {
        props: {},
      };
    },
    ["ADMIN"] // Seuls les utilisateurs avec le rôle "ADMIN" sont autorisés
  );
};

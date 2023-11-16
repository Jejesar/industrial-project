import { Button, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import mqtt from "mqtt";
import React, { useEffect, useState } from "react";

const Mqtt = ({}) => {
  const [messages, setMessages] = useState([{ message: "", topic: "" }]);
  const [lastMessage, setLastMessage] = useState({
    message: "",
    topic: "",
  });

  const client = mqtt.connect("ws://helhatechniquecharleroi.xyz", {
    port: 9001,
    username: "groupe2",
    password: "groupe2",
    keepalive: 60,
  });

  useEffect(() => {
    setMessages((messages) => [...messages, lastMessage]);
    console.log("lastMessage: ", lastMessage);
  }, [lastMessage]);

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

  return (
    <div>
      {/* <button onClick={addMessage}>addMessage</button> */}
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
      <Button onClick={() => setMessages([])}>Clear</Button>
      <Button onClick={() => client.publish("/groupe2/test", "Test message")}>
        Publish Test Message
      </Button>
    </div>
  );
};

export default Mqtt;

// import { useState, useRef } from "react";
// import type { MqttClient } from "mqtt";
// import useMqtt from "~/hooks/useMqtt";
// import { Box, Button, Heading, Text } from "@chakra-ui/react";

// export default function Mqtt({}) {
//   const [incommingMessages, setIncommingMessages] = useState<any[]>([]);
//   const addMessage = (message: any) => {
//     setIncommingMessages((incommingMessages) => [
//       ...incommingMessages,
//       message,
//     ]);
//   };
//   const clearMessages = () => {
//     setIncommingMessages(() => []);
//   };

//   const incommingMessageHandlers = useRef([
//     {
//       topic: "/groupe2/#",
//       handler: (msg: string) => {
//         addMessage(msg);
//       },
//     },
//   ]);

//   const mqttClientRef = useRef<MqttClient | null>(null);
//   const setMqttClient = (client: MqttClient) => {
//     mqttClientRef.current = client;
//   };
//   useMqtt({
//     uri: process.env.NEXT_PUBLIC_MQTT_URI || "",
//     options: {
//       port: Number(process.env.NEXT_PUBLIC_MQTT_PORT),
//       username: process.env.NEXT_PUBLIC_MQTT_USERNAME,
//       password: process.env.NEXT_PUBLIC_MQTT_PASSWORD,
//       clientId: process.env.NEXT_PUBLIC_MQTT_CLIENTID,
//     },
//     topicHandlers: incommingMessageHandlers.current,
//     onConnectedHandler: (client) => setMqttClient(client),
//   });

//   const publishMessages = (client: any) => {
//     if (!client) {
//       console.log("(publishMessages) Cannot publish, mqttClient: ", client);
//       return;
//     }

//     client.publish("/groupe2/#", "1st message from component");
//   };

//   return (
//     <Box>
//       <Heading>Subscribed Topics</Heading>
//       {incommingMessageHandlers.current.map((i) => (
//         <Text key={Math.random()}>{i.topic}</Text>
//       ))}
//       <Heading>Incomming Messages:</Heading>
//       {incommingMessages.map((m) => (
//         <Text key={Math.random()}>{m.payload.toString()}</Text>
//       ))}
//       <Button onClick={() => publishMessages(mqttClientRef.current)}>
//         Publish Test Messages
//       </Button>
//       <Button onClick={() => clearMessages()}>Clear Test Messages</Button>
//     </Box>
//   );
// }

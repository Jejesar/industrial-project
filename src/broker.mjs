// Importation des modules nécessaires
import mqtt from "mqtt";
import { env } from "./env.mjs";
import { PrismaClient } from "@prisma/client";

// Initialisation du client Prisma pour interagir avec la base de données
const db = new PrismaClient();

// Connexion au broker MQTT avec les informations d'authentification et le port spécifiés dans les variables d'environnement
export const mqttClient = mqtt.connect(env.MQTT_URI, {
  username: env.MQTT_USERNAME,
  password: env.MQTT_PASSWORD,
  port: Number(env.MQTT_PORT),
});

// Lorsque le client est connecté au broker MQTT, il s'abonne à tous les topics commençant par "/groupe2/"
mqttClient.on("connect", () => {
  mqttClient.subscribe("/groupe2/#");
  console.log("Connected to MQTT broker");
});

// Lorsque le client reçoit un message d'un des topics auxquels il est abonné
mqttClient.on("message", async (topic, message) => {
  // Suppression du préfixe "/groupe2/" du topic
  topic = topic.replace("/groupe2/", "");
  // Conversion du message en string et division en sous-chaînes séparées par "/"
  var messageString = message.toString().split("/");
  // Si le message contient plus d'une sous-chaîne, on ignore le message
  if (messageString.length > 1) return;
  console.log(topic, messageString[0]);
  // Mise à jour ou création d'un tag dans la base de données avec le nom du topic et la valeur du message
  await db.tags.upsert({
    where: {
      name: topic,
    },
    create: {
      name: topic,
      value: message.toString(),
      date: new Date(),
    },
    update: {
      value: message.toString(),
      date: new Date(),
    },
  });
});

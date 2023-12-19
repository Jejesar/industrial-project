import mqtt from "mqtt";
import { env } from "./env.mjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const mqttClient = mqtt.connect(env.MQTT_URI, {
  username: env.MQTT_USERNAME,
  password: env.MQTT_PASSWORD,
  port: Number(env.MQTT_PORT),
});

mqttClient.on("connect", () => {
  mqttClient.subscribe("/groupe2/#");
  console.log("Connected to MQTT broker");
});

mqttClient.on("message", async (topic, message) => {
  topic = topic.replace("/groupe2/", "");
  var messageString = message.toString().split("/");
  if (messageString.length > 1) return;
  console.log(topic, messageString[0]);
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

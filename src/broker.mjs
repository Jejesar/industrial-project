import mqtt from "mqtt";
import { env } from "./env.mjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const client = mqtt.connect(env.MQTT_URI, {
  username: env.MQTT_USERNAME,
  password: env.MQTT_PASSWORD,
  port: Number(env.MQTT_PORT),
});

client.on("connect", () => {
  client.subscribe("/groupe2/#");
});

client.on("message", async (topic, message) => {
  topic = topic.replace("/groupe2/", "");
  console.log(topic, message.toString());
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

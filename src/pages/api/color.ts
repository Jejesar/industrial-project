import { NextApiRequest, NextApiResponse } from "next";
import { mqttClient } from "~/broker.mjs";
import { db } from "~/server/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // const { color } = req.body;
    console.log(JSON.parse(req.body));
    const color = JSON.parse(req.body).color || null;

    try {
      console.log("color", color);

      // Green :
      // GreenTruck2

      // Red :
      // RedTruck2

      // Blue :
      // BlueTruck2

      // White :
      // RedTruck2
      // GreenTruck2
      // BlueTruck2

      switch (color) {
        case "red":
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "1");
          break;
        case "green":
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/YellowTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "1");
          break;
        case "blue":
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "1");
          break;
        case "white":
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "1");
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "1");
          mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "1");
          break;
        case "rainbow":
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "0");
          for (let index = 0; index < 3; index++) {
            mqttClient.publish(`/groupe2/lamp/RedTruck2`, "1");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            mqttClient.publish(`/groupe2/lamp/RedTruck2`, "0");
            mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "1");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "0");
            mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "1");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "0");
          }
          break;
        default:
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "0");
          break;
      }
      res.status(200).json({ message: "Color changed" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

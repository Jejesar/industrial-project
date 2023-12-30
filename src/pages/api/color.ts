// Importation des types nécessaires depuis les modules "next" et "~/broker.mjs"
import { NextApiRequest, NextApiResponse } from "next";
import { mqttClient } from "~/broker.mjs";

// Définition de la fonction de gestion des requêtes API
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification si la méthode de la requête est POST
  if (req.method === "POST") {
    // Extraction de la couleur de la requête
    const color = JSON.parse(req.body).color || null;

    try {
      console.log("color", color);

      // En fonction de la couleur reçue, publie des messages MQTT pour contrôler les lampes
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
          // Pour la couleur "rainbow", publie des messages MQTT pour faire clignoter les lampes en séquence
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
          // Si aucune couleur n'est spécifiée, éteint toutes les lampes
          mqttClient.publish(`/groupe2/lamp/RedTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/GreenTruck2`, "0");
          mqttClient.publish(`/groupe2/lamp/BlueTruck2`, "0");
          break;
      }
      // Renvoie une réponse avec le statut 200 et un message de confirmation
      res.status(200).json({ message: "Color changed" });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse avec le statut 500 et un message d'erreur
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Si la méthode de la requête n'est pas POST, renvoie une réponse avec le statut 405 et un message d'erreur
    return res.status(405).json({ message: "Method not allowed" });
  }
}

// Importation des types NextApiRequest et NextApiResponse depuis le module "next"
// Importation de la base de données depuis "~/server/db"
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";

// Définition de la fonction de gestion de la requête API
export default async function handle(
  req: NextApiRequest, // La requête reçue
  res: NextApiResponse // La réponse à envoyer
) {
  // Vérification si la méthode de la requête est POST
  if (req.method === "POST") {
    // Extraction du nom depuis les paramètres de la requête
    const { name } = req.query;
    // Extraction des données depuis le corps de la requête
    const { displayName, show, description } = req.body;

    try {
      // Tentative de mise à jour de la variable dans la base de données
      await db.tags.update({
        where: {
          name: name as string, // Spécification de la variable à mettre à jour
        },
        data: {
          displayName: displayName || name, // Mise à jour du nom d'affichage
          show, // Mise à jour de l'état d'affichage
          description, // Mise à jour de la description
        },
      });

      // Envoi d'une réponse avec le statut 200 et un message de succès
      return res.status(200).json({ message: "Variable updated" });
    } catch (error) {
      // En cas d'erreur, envoi d'une réponse avec le statut 500 et un message d'erreur
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Si la méthode de la requête n'est pas POST, envoi d'une réponse avec le statut 405 et un message d'erreur
    return res.status(405).json({ message: "Method not allowed" });
  }
}

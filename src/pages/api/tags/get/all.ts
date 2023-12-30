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
    // Initialisation d'un tableau vide pour stocker les variables
    var variables = [];

    try {
      // Tentative de recherche de toutes les variables dans la base de données
      variables = await db.tags.findMany();

      // Si aucune variable n'a été trouvée, envoi d'une réponse avec le statut 404 et un message d'erreur
      if (variables.length === 0) {
        return res.status(404).json({ message: "Variable not found" });
      }

      // Si des variables ont été trouvées, envoi d'une réponse avec le statut 200 et les variables
      return res.status(200).json(variables);
    } catch (error) {
      // En cas d'erreur, envoi d'une réponse avec le statut 500 et un message d'erreur
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Si la méthode de la requête n'est pas POST, envoi d'une réponse avec le statut 405 et un message d'erreur
    return res.status(405).json({ message: "Method not allowed" });
  }
}

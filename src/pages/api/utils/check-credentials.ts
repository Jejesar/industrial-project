// Importation des types nécessaires depuis les modules "next" et "~/assets/types"
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { Credentials } from "~/assets/types";

// Définition de la fonction de gestion des requêtes API
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérification si la méthode de la requête est POST
  if (req.method === "POST") {
    // Extraction des informations d'identification de la requête
    const credentials: Credentials = req.body;
    var user = null;
    try {
      // Tentative de recherche de l'utilisateur dans la base de données
      user = await db.user.findUnique({
        where: {
          name: credentials.username,
        },
      });
    } catch (error) {
      // En cas d'erreur, renvoie une réponse avec le statut 500 et un message d'erreur
      res.status(500).json({ message: "Internal server error" });
    }

    // Si l'utilisateur est trouvé et que le mot de passe correspond, renvoie une réponse avec le statut 200 et les informations de l'utilisateur
    if (user && user.password === credentials.password) {
      return res.status(200).json({
        id: user.id,
        name: user.name,
        role: user.role,
      });
    }
    // Si les informations d'identification sont invalides, renvoie une réponse avec le statut 401 et un message d'erreur
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    // Si la méthode de la requête n'est pas POST, renvoie une réponse avec le statut 405 et un message d'erreur
    return res.status(405).json({ message: "Method not allowed" });
  }
}

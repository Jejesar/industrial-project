// Importation de la fonction getSession depuis le module "next-auth/react"
import { getSession } from "next-auth/react";

// Définition de la fonction requireAuthentification
export const requireAuthentification = async (
  context: any, // Le contexte de la requête
  callback: any, // La fonction à appeler si l'utilisateur est authentifié
  role: string | string[] = "" // Le ou les rôles requis pour accéder à la ressource
) => {
  // Obtention de la session de l'utilisateur
  const session = await getSession(context);

  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page d'accueil
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Si un rôle est requis et que l'utilisateur n'a pas ce rôle, on le redirige vers la page d'accueil
  if (
    role !== "" &&
    session.user.role !== role &&
    !role.includes(session.user.role)
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Si l'utilisateur est authentifié et a le rôle requis, on appelle la fonction callback
  return callback();
};

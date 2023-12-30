// Importation du client Prisma depuis le module "@prisma/client"
import { PrismaClient } from "@prisma/client";

// Importation des variables d'environnement depuis le module "~/env.mjs"
import { env } from "~/env.mjs";

// Définition d'une variable globale pour Prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialisation du client Prisma
// Si un client Prisma existe déjà dans la variable globale, on l'utilise
// Sinon, on crée un nouveau client Prisma
// En mode développement, le client Prisma loggue les requêtes, les erreurs et les avertissements
// En mode production, le client Prisma loggue seulement les erreurs
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Si on n'est pas en mode production, on stocke le client Prisma dans la variable globale
// Cela permet de réutiliser le même client Prisma pour toutes les requêtes, ce qui améliore les performances
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

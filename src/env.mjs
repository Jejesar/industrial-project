import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Création de l'environnement de l'application
export const env = createEnv({
  // Spécification du schéma des variables d'environnement côté serveur
  // Cela permet de s'assurer que l'application n'est pas construite avec des variables d'environnement invalides
  server: {
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "Vous avez oublié de changer l'URL par défaut"
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    NEXTAUTH_URL: z.preprocess(
      (str) => process.env.VERCEL_URL ?? str,
      process.env.VERCEL ? z.string() : z.string().url()
    ),
    MQTT_URI: z.string(),
    MQTT_USERNAME: z.string(),
    MQTT_PASSWORD: z.string(),
    MQTT_PORT: z.string(),
  },

  // Spécification du schéma des variables d'environnement côté client
  client: {},

  // Destruction manuelle de `process.env` car on ne peut pas le déstructurer comme un objet normal dans les environnements d'exécution Next.js
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MQTT_URI: process.env.MQTT_URI,
    MQTT_USERNAME: process.env.MQTT_USERNAME,
    MQTT_PASSWORD: process.env.MQTT_PASSWORD,
    MQTT_PORT: process.env.MQTT_PORT,
  },

  // Exécution de `build` ou `dev` avec `SKIP_ENV_VALIDATION` pour sauter la validation de l'environnement
  // C'est particulièrement utile pour les constructions Docker
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  // Traitement des chaînes vides comme indéfinies
  // `SOME_VAR: z.string()` et `SOME_VAR=''` lanceront une erreur
  emptyStringAsUndefined: true,
});

// Importation des types nécessaires depuis les modules "next-auth" et "next/app"
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

// Importation des composants nécessaires pour le style de l'application
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Importation des styles globaux
import "~/styles/globals.css";

// Importation des polices de caractères Poppins avec différents poids
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

// Extension du thème par défaut de Chakra UI pour utiliser la police Poppins
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

// Définition du composant MyApp qui enveloppe toutes les pages de l'application
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // Fournit la session à tous les composants enfants via le contexte
    <SessionProvider session={session}>
      {/* Fournit le thème à tous les composants enfants via le contexte */}
      <ChakraProvider theme={theme}>
        {/* Rend le composant de la page actuelle avec ses propriétés */}
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

// Exportation du composant MyApp comme composant par défaut du module
export default MyApp;

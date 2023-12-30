// Importation des composants nécessaires depuis les modules
import Head from "next/head";
import { HeroHome, Navbar } from "~/components";

// Définition du composant Home
export default function Home({}) {
  return (
    <>
      <Head>
        {/* Définition du titre et de la description de la page */}
        <title>Projet Industriel | Groupe 2</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
        {/* Définition de l'icône de la page */}
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header>
        {/* Affichage de la barre de navigation */}
        <Navbar />
      </header>
      <main>
        {/* Affichage du composant HeroHome */}
        <HeroHome />
      </main>
    </>
  );
}

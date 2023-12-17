import Head from "next/head";
import { HeroHome, Navbar } from "~/components";

export default function Home({}) {
  return (
    <>
      <Head>
        <title>Projet Industriel | Groupe 2</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        <HeroHome />
      </main>
    </>
  );
}

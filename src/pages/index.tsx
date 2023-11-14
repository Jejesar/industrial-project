import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { HeroHome, Navbar } from "~/components";

export default function Home({}) {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Projet Industriel | Groupe 2</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
        <link rel="icon" href="/favicon.ico" />
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

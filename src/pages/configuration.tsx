import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navbar } from "~/components";

export default function Configuration({}) {
  const { data: session, status } = useSession();
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") {
        router.push("/");
      } else {
        setShowContent(true);
      }
    } else {
      router.push("/");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Configuration | Projet Industriel</title>
        <meta
          name="description"
          content="Site web du projet industriel des 3BINI de la HELHa."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
      {showContent && <main>Config</main>}
    </>
  );
}

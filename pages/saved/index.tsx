import Link from "next/link";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Saved() {
  return (
    <div className={`${inter.className}`}>
      <Head>
        <title>Saved | Animetsu</title>
        <meta name="description" content="All your favourites are here..." />
      </Head>
      Saved
    </div>
  );
}

{
  /* <Link
href="/saved"
className="text-white hover:text-blue-400 transition-colors ease-in-out"
>
Saved
</Link> */
}

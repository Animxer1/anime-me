import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}recent-release`);
  const recents = await res.json();
  return { props: { recents }, revalidate: 2 };
};

const Recent = ({ recents }: { recents: Anime[] }) => {
  return (
    <div className={inter.className}>
      <Head>
        <title>Recents | Animetsu</title>
        <meta name="description" content="All your favourites are here..." />
      </Head>
      <h1 className="text-center text-base sm:text-lg md:text-xl mb-4">
        Recent Releases
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {recents.map((anime) => (
          <li
            key={anime.animeId}
            className="mb-2 cursor-pointer"
            title={anime.animeTitle}
          >
            <Link href={`/watch/${anime.episodeId.replace("episode", "ep")}`}>
              <Image
                src={anime.animeImg}
                alt={anime.animeTitle}
                width={250}
                height={450}
                loading="lazy"
                style={{ objectFit: "cover" }}
                className="mx-auto mb-2 rounded-md w-40 h-64 lg:w-64 lg:h-96"
              />
              <div className="text-center text-xs md:text-sm">
                {anime.animeId === "oshi-no-ko"
                  ? "Oshi no ko"
                  : anime.animeId === "oshi-no-ko-dub"
                  ? "Oshi no ko (Dub)"
                  : anime.animeTitle}
              </div>
              <div className="text-center text-xs md:text-sm opacity-50">
                Episode {anime.episodeNum}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recent;

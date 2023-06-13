import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetStaticPaths } from "next/types";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.API_URL}popular`);
  const popular = await res.json();
  return { props: { popular } };
};

export const getStaticPaths: GetStaticPaths<{
  episodeId: string;
}> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Popular = ({ popular }: { popular: Anime[] }) => {
  return (
    <>
      <Head>
        <title>Popular | Animetsu</title>
        <meta name="description" content="All your favourites are here..." />
      </Head>
      <h1 className="text-center text-base sm:text-lg md:text-xl mb-4">
        Popular this season
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
        {popular.map((anime) => (
          <li
            key={anime.animeId}
            className="mb-2 cursor-pointer"
            title={anime.animeTitle}
          >
            <Link href={`/${anime.animeId}`}>
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
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Popular;

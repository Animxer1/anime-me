import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (context: {
  params: { animeId: string };
}) => {
  const animeId = context.params.animeId;
  const res = await fetch(`${process.env.API_URL}anime-details/${animeId}`);
  const animeInfo = await res.json();
  return { props: { animeInfo } };
};

const AnimeId = ({ animeInfo }: { animeInfo: AnimeInfo }) => {
  const longSynopsis = animeInfo.synopsis.length > 100;
  return (
    <>
      <Head>
        <title>{animeInfo.animeTitle} | Animetsu</title>
        <meta name="description" content="All your favourites are here..." />
      </Head>
      <div className={`${inter.className} mx-1 sm:mx-4 lg:mx-6`}>
        <div id="info" className="flex flex-col lg:flex-row">
          <Image
            className="rounded-md w-auto md:h-96 mb-6 hidden md:block lg:mb-0"
            src={animeInfo.animeImg}
            alt={animeInfo.animeTitle}
            loading="lazy"
            width={300}
            height={600}
            style={{ objectFit: "cover" }}
          />
          <div className="ml-4">
            <h2 className="text-2xl sm:text-4xl font-bold mb-0 sm:mb-1">
              {animeInfo.animeTitle}
            </h2>
            <span className="opacity-50">{animeInfo.type}</span>
            <p
              className={`opacity-50 my-3 ${
                longSynopsis ? "text-xs sm:text-sm" : "text-sm sm:text-md"
              }`}
            >
              {animeInfo.synopsis}
            </p>
            <p className="text-sm sm:text-base">
              Genre:{" "}
              <span className="opacity-50">
                {animeInfo.genres.map((g, i) => (
                  <>
                    {g}
                    {animeInfo.genres.length === i + 1 || ", "}
                  </>
                ))}
              </span>
            </p>
            <p className="my-1 text-sm sm:text-base">
              Status: <span className="opacity-50">{animeInfo.status}</span>
            </p>
            <p className="text-sm sm:text-base">
              {animeInfo.totalEpisodes !== "1" ? "Episodes: " : "Episode: "}
              <span className="opacity-50">{animeInfo.totalEpisodes}</span>
            </p>
            <p className="my-1 text-sm sm:text-base">
              Released:{" "}
              <span className="opacity-50">{animeInfo.releasedDate}</span>
            </p>
            {animeInfo.otherNames === "" || (
              <p className="text-sm sm:text-base">
                Other Names:{" "}
                <span className="opacity-50">{animeInfo.otherNames}</span>
              </p>
            )}
          </div>
        </div>
        {(animeInfo.totalEpisodes !== "0" && animeInfo.type === "Movie") ||
        animeInfo.type === "Special" ? (
          <div className="my-8">
            <Link
              href={`/watch/${animeInfo.episodesList[0].episodeId.replace(
                "episode",
                "ep"
              )}`}
              className="link-btn px-6"
            >
              Watch {animeInfo.type}
            </Link>
          </div>
        ) : (
          <div
            className={`mt-8 mb-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4`}
          >
            {animeInfo.episodesList.map(
              (e) =>
                e.episodeNum === "0" || (
                  <Link
                    key={e.episodeId}
                    className="link-btn"
                    href={`/watch/${e.episodeId.replace("episode", "ep")}`}
                  >
                    {e.episodeNum}
                  </Link>
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AnimeId;

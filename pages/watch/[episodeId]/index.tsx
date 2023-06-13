import Link from "next/link";
import Head from "next/head";
import { GetStaticPaths } from "next/types";
import VideoPlayer from "@/components/VideoPlayer";

export const getStaticProps = async (context: {
  params: { episodeId: string };
}) => {
  const episodeId = context.params.episodeId;
  const epRes = await fetch(
    `${process.env.API_URL}vidcdn/watch/${episodeId.replace("ep", "episode")}`
  );
  const epData = await epRes.json();
  let animeId = episodeId.split("-ep-")[0];
  if (animeId === "dr-stone-new-world") {
    animeId = "dr-stone-3rd-season";
  }
  const animeRes = await fetch(
    `${process.env.API_URL}anime-details/${animeId}`
  );
  const animeInfo = await animeRes.json();
  if (animeId === "dr-stone-3rd-season") {
    animeId = "dr-stone-new-world";
  }
  return { props: { episodeId, epData, animeId, animeInfo } };
};

export const getStaticPaths: GetStaticPaths<{
  episodeId: string;
}> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

const Watch = ({
  episodeId,
  epData,
  animeId,
  animeInfo,
}: {
  episodeId: string;
  epData: EpisodeInfo;
  animeId: string;
  animeInfo: AnimeInfo;
}) => {
  const episodeNum: number = Number.parseInt(episodeId.split("-ep-")[1]);
  const ifNotLastEpisode =
    episodeNum !== Number.parseInt(animeInfo.totalEpisodes);
  return (
    <>
      <Head>
        <title>
          {animeInfo.animeTitle} Episode {episodeNum} | Animetsu
        </title>
        <meta name="description" content="All your favourites are here..." />
      </Head>
      <div>
        <h2 className="text-sm xs:text-base sm:text-lg md:text-xl text-center">
          Playing, <b>{animeInfo.animeTitle}</b>{" "}
          {animeInfo.totalEpisodes !== "1" && `Episode ${episodeNum}`}
        </h2>
        <div className="flex justify-center">
          {/* <iframe
            className="my-4 aspect-video w-80 h-64 sm:w-[400px] sm:h-[225px] md:w-[600px] md:h-[340px]"
            width="600"
            src={epData.Referer}
            allowFullScreen
            scrolling="no"
          /> */}
          <VideoPlayer
            src={
              ifNotLastEpisode || animeInfo.status !== "Ongoing"
                ? epData.sources_bk[0].file
                : epData.sources[0].file
            }
            className="my-4 aspect-video w-80 h-44 sm:w-[400px] sm:h-[225px] md:w-[600px] md:h-[340px]"
          />
        </div>
        <p className="text-sm sm:text-base text-center py-2">
          Reload the site if video not loaded
        </p>
        <div className="flex justify-center">
          {episodeNum !== 1 && (
            <Link
              className={`link-btn px-6 ${ifNotLastEpisode && "mr-4"}`}
              href={`/watch/${animeId}-ep-${episodeNum - 1}`}
              key={episodeNum}
            >
              Prev
            </Link>
          )}
          {ifNotLastEpisode && (
            <Link
              className="link-btn px-6"
              href={`/watch/${animeId}-ep-${episodeNum + 1}`}
            >
              Next
            </Link>
          )}
        </div>
        {animeInfo.totalEpisodes !== "1" && (
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

export default Watch;

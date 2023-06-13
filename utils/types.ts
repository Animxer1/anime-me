type Anime = {
  animeId: string;
  animeTitle: string;
  animeImg: string;
  episodeId: string;
  episodeNum: string;
};

type Episode = {
  episodeId: string;
  episodeNum: string;
};

type AnimeInfo = {
  animeId: string;
  animeTitle: string;
  type: string;
  animeImg: string;
  status: string;
  releasedDate: string;
  genres: string[];
  totalEpisodes: string;
  otherNames: string;
  synopsis: string;
  episodesList: Episode[];
};

type EpisodeSrc = {
  file: string;
};

type EpisodeInfo = {
  Referer: string;
  sources: EpisodeSrc[];
  sources_bk: EpisodeSrc[];
};

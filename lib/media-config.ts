export const mediaConfig = {
  movies: {
    title: "Movies",

    description:
      "Discover blockbuster hits, timeless classics and cinematic masterpieces.",

    type: "movie",

    sections: [
      {
        title: "Trending Now",
        category: "trending",
      },
      {
        title: "Popular Movies",
        category: "popular",
      },
      {
        title: "Top Rated",
        category: "top_rated",
      },
      {
        title: "Now Playing",
        category: "now_playing",
      },
      {
        title: "Upcoming",
        category: "upcoming",
      },
    ],

    categoryTitles: {
      trending: "Trending Movies",
      popular: "Popular Movies",
      top_rated: "Top Rated Movies",
      now_playing: "Now Playing",
      upcoming: "Upcoming Movies",
    },
  },

  tvShows: {
    title: "TV Shows",

    description:
      "Trending series, top-rated dramas, binge-worthy thrillers and more.",

    type: "tv",

    sections: [
      {
        title: "Trending Now",
        category: "trending",
      },
      {
        title: "Popular Shows",
        category: "popular",
      },
      {
        title: "Top Rated",
        category: "top_rated",
      },
      {
        title: "Airing Today",
        category: "airing_today",
      },
      {
        title: "Currently Airing",
        category: "on_the_air",
      },
    ],

    categoryTitles: {
      trending: "Trending Shows",
      popular: "Popular Shows",
      top_rated: "Top Rated Shows",
      airing_today: "Airing Today",
      on_the_air: "Currently Airing",
    },
  },
} as const;

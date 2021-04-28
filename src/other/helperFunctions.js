import * as rssParser from "react-native-rss-parser";

export const FilterSearch = (library, searchTerm, limit) => {
  const searchResult = limit
    ? library
        .filter(
          (el) =>
            el.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        )
        .slice(0, limit)
    : library.filter(
        (el) => el.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );

  return searchResult;
};

export const FetchPodcastFromRSS = async (url) => {
  const response = await fetch(url)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      return rss;
    });
    console.log('DONE')
    return response
};

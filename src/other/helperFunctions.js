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
  var myHeaders = new Headers();
  myHeaders.append("pragma", "no-cache");
  myHeaders.append("cache-control", "no-cache");
  var myInit = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(url, myInit)
    .then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      return rss;
    });
    // console.log('DONE', response)
    return response
};




// PAN EXAMPLE
//  const [panX, setPanX ] = useState(0)
//   const [panXOnRelease, setPanXOnRelease] = useState(0)

//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pan.setOffset({
//           x: pan.x._value,
//           y: pan.y._value,
//         });
//       },
//       // onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {useNativeDriver: false}),
//        onPanResponderMove: (e, gestureState) => {setPanX(gestureState.dx), Animated.event([null, { dx: pan.x, dy: pan.y }], {useNativeDriver: false})},
//       onPanResponderRelease: (e, gestureState) => {
//         setPanXOnRelease(gestureState.dx);
//         pan.flattenOffset();
//       },
//     })
//   ).current;
  
//   useEffect(() => {
//     // dispatch(OpenRssPlayer({data: {episode: {...episode}, podcast: {...podcast}}, state: true}))
//     console.log(panXOnRelease);
//     if(panXOnRelease > 150) {
//       setPanXOnRelease(400);
//       setPlaying(false);
//       setRunningEpisode(false)
//       stopSound()
//     } else {
//       setPanX(0)
//     }
//   }, [panXOnRelease]);
  
  // useEffect(() => {
  //   console.log(pan);
  // }, [pan])
  // console.log(panXOnRelease)
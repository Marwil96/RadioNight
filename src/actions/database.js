import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER, CREATE_PODCAST, FETCH_ALL_USER_DATA } from "./constables";
import firebase from "firebase";
import { firebaseConfig } from "../../firebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
let user = firebase.auth();
let storage = firebase.storage();

const getTimeEpoch = () => {
  return new Date().getTime().toString();
};


export const FetchAllUserData = () => {
  return (dispatch) => {
    dispatch({type: FETCH_ALL_USER_DATA, payload: {loading: true}})
    db.collection('users').doc(user.currentUser.uid).get().then((doc) => {
      const data = doc.data();
      console.log(data)
      dispatch({type: FETCH_ALL_USER_DATA, payload: {loading: false, user_data: data }})
    })
  }
}

export const FetchYourPodcasts = async (podcast_ids) => {
  const result = await Promise.all(
  await podcast_ids.map(async (id) => {
    const response = await db.collection('podcasts').doc(id).get().then((doc) => {
      const data = doc.data();
      return data
    })

    return response
  })
  )

  return result;
}

export const CreatePodcast = ({data}) => {

  // const allEpisodes = data.items.map((episode) => { 
  //   return (
  //     {
  //       title: episode.title, 
  //       subtitle: data.title, 
  //       published: episode.published,
  //       duration: episode.itunes.duration, 
  //       summary: episode.itunes.summary !== undefined ? episode.itunes.summary : '', 
  //       image: episode.itunes.image !== undefined ? episode.itunes.image : data.image.url, 
  //       sound_file: {url: episode.enclosures[0].url, length: episode.enclosures[0].length, mimeType: episode.enclosures[0].mimeType} 
  //     } 
  //   )
  // })

  const podcastId = getTimeEpoch();

  return (dispatch) => { 
    dispatch({ type: CREATE_PODCAST, payload: { loading: true, podcast_created: true } });
    db.collection("podcasts").doc(podcastId).set({
      title: data.title,
      desc: data.description,
      image: data.image.url,
      authors: data.authors,
      categories: data.categories,
      id: podcastId,
      rss_url: data.rss_url
      // episodes: allEpisodes
    }).then(() => {
    db.collection("users").doc(user.currentUser.uid).set({
      owned_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId)
    }, {merge: true});
    
    dispatch({type: CREATE_PODCAST, payload: {loading: false, podcast_created: true}})
  })
  }
};

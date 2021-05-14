import { CREATE_USER, LOGIN_USER, SIGN_OUT_USER, CREATE_PODCAST, FETCH_ALL_USER_DATA, FETCH_EPISODE, GET_CHAT_MESSAGES} from "./constables";
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
    db.collection('users').doc(user.currentUser.uid).onSnapshot((doc) => {
      const data = doc.data();

      dispatch({type: FETCH_ALL_USER_DATA, payload: {loading: false, user_data: data }})
    })
  }
}

export const UpdateUserData = async ({data}) => {
  console.log(data.user_image)
  const url = data.user_image.uri !== undefined ? await UploadImage({file:data.user_image, userId: user.currentUser.uid, fileName:'profile_image'}) : data.user_image;
  console.log('URL', url)
   const response = await db.collection("users").doc(user.currentUser.uid).set({...data, user_image: url}, {merge: true}).then(() => { 
    return true
   }).catch((error) => false);

   return response
}

export const SchedulePodcastPremiere = async (data) => {
  const episodeId = getTimeEpoch();
  const result = await Promise.all(
    db.collection("scheduled_episodes").doc(episodeId).set({...data, episode_id:episodeId }).then(() => { 
      return true
    }).catch((error) => {
      return false
    })
  )

  return result
}

export const AddEpisodePremiere = async (data) => {
  const episodeId = getTimeEpoch();
  const result = await db.collection("episodes").doc(episodeId).set({...data, episode_id:episodeId }).then(() => { 
      return {success: true, episodeId: episodeId}
    }).catch((error) => {
      return {success: false, episodeId: false}
    })
  
  return result
}

export const AddChatMessage = async ({message, episodeId, messageAuthor}) => {
  const chatId = getTimeEpoch();
  console.log("ADD CHAT MESSAGE", message, episodeId, messageAuthor, chatId);
  const result = await db.collection("episodes").doc(episodeId).collection('chat').doc(chatId).set({message, message_author: messageAuthor, chat_id:chatId, time_stamp: chatId }).then(() => { 
      return true
    }).catch((error) => {
      return false
    })
    
  return result
}

export const GetChatMessages = ({episodeId}) => {
  console.log('GETCHATMESSAGE', episodeId )
  return (dispatch) => {
    dispatch({type: GET_CHAT_MESSAGES, payload: {loading: true, chat_messages: []}})
    db.collection('episodes').doc(episodeId).collection('chat').onSnapshot((querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      console.log(messages)

      dispatch({type: GET_CHAT_MESSAGES, payload: {loading: false, chat_messages: messages }})
    })
  }
}

export const GetPodcastPremieres = async (id) => {
  const result = await Promise.all(
  await db.collection("episodes").where("podcast_id", "==", id)
    .get()
    .then((querySnapshot) => {
      const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const currentDate = new Date();
            const episodeGoesLive = new Date(data.start_date);
            const episodeIsDone = new Date(data.start_date).setSeconds(episodeGoesLive.getSeconds() + data.duratation);
   
              if(currentDate > episodeIsDone) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if(currentDate > episodeGoesLive && currentDate < episodeIsDone) {
                liveEpisodes.push({ ...data, episode_state: 'live' });
                // return 'live'
              } else {
                upcomingEpisodes.push({...data, episode_state: 'upcoming'});
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2], allEpisode: [...result[0], ...result[1], ...result[2]]}
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

export const UpdatePodcastDetails = async ({data, podcastId}) => {
   const response = await db.collection("podcasts").doc(podcastId).set({...data}, {merge: true}).then(() => { 
    return true
   }).catch((error) => false);

   return response;
}

export const FetchEpisode = (episodeId) => {
  return(dispatch) => {
    dispatch({
      type: FETCH_EPISODE,
      payload: { data: {}, loading: true },
    });
   db.collection("episodes")
    .doc(episodeId)
    .onSnapshot((doc) => {

    const data = doc.data();
    dispatch({
      type: FETCH_EPISODE,
      payload: { data: data, loading: false },
    });
    });

  }

  return data
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

export const StartFollowingPodcast = (podcastId) => {
  db.collection("users").doc(user.currentUser.uid).set({
    followed_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId)
  }, {merge: true});
}

export const StopFollowingPodcast = (podcastId) => {
  db.collection("users").doc(user.currentUser.uid).set({
    followed_podcasts: firebase.firestore.FieldValue.arrayRemove(podcastId)
  }, {merge: true});
}


export const GetAllPodcasts = async () => {
  const result = await Promise.all( 
    await db
    .collection("podcasts")
    .get()
    .then((querySnapshot) => {
      const podcasts = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data()
        podcasts.push(data);
      });

      return podcasts;
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      return false
    })
  )
  return result
};

export const GetFollowedPremieres = async (followed_podcasts) => {
  const result = await Promise.all(
  await db.collection("episodes").where("podcast_id", "in", followed_podcasts)
    .get()
    .then((querySnapshot) => {
      const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();

              if(data.episode_ended === true) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if (data.stream_started.state === true) {
                liveEpisodes.push({ ...data, episode_state: "live" });
                // return 'live'
              } else {
                upcomingEpisodes.push({ ...data, episode_state: "upcoming" });
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2], allEpisodes: [...result[0], ...result[1], ...result[2]]}
}

export const GetCurrentlyLiveEpisodes = async (followed_podcasts) => {
  const result = await Promise.all(
  await db.collection("episodes").where("podcast_id", "not-in", followed_podcasts)
    .get()
    .then((querySnapshot) => {
     const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();
            const currentDate = new Date();
            const episodeGoesLive = new Date(data.start_date);
            const episodeIsDone = data.episode_done === true;
 
              if(episodeIsDone) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if (currentDate > episodeGoesLive && data.episode_done !== true) {
                liveEpisodes.push({ ...data, episode_state: "live" });
                // return 'live'
              } else {
                upcomingEpisodes.push({ ...data, episode_state: "upcoming" });
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2]}
}


export const DownloadImage = async (ref) => {
  console.log(ref);
  const storageRef = storage.refFromURL(
    `gs://memorycollector-3e5de.appspot.com/${ref}`
  );
  return storageRef.getDownloadURL().then((url) => {
    return url;
  });
};



export const UploadImage = async ({
  file,
  fileName,
  userId,
}) => {
  
   const response = await fetch(file.uri);
  const blob = await response.blob();
  // dispatch({type: UPLOAD_IMAGE, payload: {ImageUploaded: false}})
  var uploadedImage = storage.ref(userId).child(`${fileName}.jpg`);

  await uploadedImage.put(blob).then((snapshot) => {
  });

  return await storage.ref(userId).child(`${fileName}.jpg`).getDownloadURL().then(url => {
    return url
  })
};

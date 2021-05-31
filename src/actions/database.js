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

export const FetchUserData = async (userId) => {
  const response = await db.collection("users").doc(userId).get().then((doc) => {
    const data = doc.data();
    return data
  })


  return response
}

export const FetchPodcastData= async (podcastId) => {
  const response = await db.collection("podcasts").doc(podcastId).get().then((doc) => {
    const data = doc.data();
    return data
  })


  return response
}

export const UpdateUserData = async ({data}) => {
  console.log(data.user_image)
  const url = data.user_image !== undefined ? await UploadImage({file:data.user_image, userId: user.currentUser.uid, fileName:'profile_image'}) : data.user_image;
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

export const FetchBannedUsers = async (bannedUsers) => {
  const result = await Promise.all(
    await bannedUsers.map(async (id) => {
      const response = await db.collection("users").doc(id).get().then((doc) => {
        const data = doc.data();
        return data
      })

      return response
    })
  )

  return result;
}

export const RemoveUserFromBanList = async (invitationData) => {
  const response = await db.collection(invitationData.collection).doc(invitationData.podcast_id).set({banned_users: firebase.firestore.FieldValue.arrayRemove(invitationData.user_id)}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  return response;
}

export const AddUserToBanList = async (invitationData) => {
  const response = await db.collection(invitationData.collection).doc(invitationData.podcast_id).set({banned_users: firebase.firestore.FieldValue.arrayUnion(invitationData.user_id)}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  return response;
}


export const FetchAllFollowers = async (podcastId) => {
  const allFollowers = await db.collection('users').where("followed_podcasts", "array-contains", podcastId).get().then((querySnapshot) => {
    const followers = [];
     querySnapshot.forEach((doc) => { 
       followers.push(doc.data())
     })
     return followers
  })

  return allFollowers;
}

export const FetchMods = async (mods) => {
  const result = await Promise.all(
    await mods.map(async (id) => {
      const response = await db.collection("users").doc(id).get().then((doc) => {
        const data = doc.data();
        return data
      })

      return response
    })
  )

  return result;
}

export const RemoveAsMod = async (invitationData) => {
  const response = await db
    .collection(invitationData.collection)
    .doc(invitationData.podcast_id)
    .set(
      {
        mods: firebase.firestore.FieldValue.arrayRemove(
          invitationData.user_id
        ),
      },
      { merge: true }
    )
    .then(() => {
      return true;
    })
    .catch((error) => false);

  return response;
};

export const AcceptInvitationToMod = async ({official_broadcast, collection, podcast_title, podcast_id }) => {
  const response = await db.collection(collection).doc(podcast_id).set({mods: firebase.firestore.FieldValue.arrayUnion(user.currentUser.uid)}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  if(response) {
    await db.collection("users").doc(user.currentUser.uid).set({invited_to_mod: firebase.firestore.FieldValue.arrayRemove({official_broadcast, podcast_title, podcast_id})}, {merge: true});
    return true
  } else {
    return false
  }
}

export const DeclineInvitationToMod = async ({official_broadcast, collection, podcast_title, podcast_id }) => {
  const response = await db.collection("users").doc(user.currentUser.uid).set({invited_to_mod: firebase.firestore.FieldValue.arrayRemove({official_broadcast, podcast_title, podcast_id})}, {merge: true}).then(()  => {
    return true
  }).catch((error) => false);

  return response
}

export const InviteUserToMod = async ({userName, podcastId, podcastTitle, officialBroadcast}) => {
  console.log(userName, podcastId, podcastTitle, officialBroadcast)
  const userId = await db.collection('users').where("user_name", "==", userName).get().then((querySnapshot) => {
    const users = [];
     querySnapshot.forEach((doc) => { 
       users.push(doc.data())
     })
     return users
  })

  if(userId.length > 0) {
    const response = await db.collection('users').doc(userId[0].user_id).set({invited_to_mod: firebase.firestore.FieldValue.arrayUnion({podcast_title: podcastTitle, podcast_id: podcastId, official_broadcast: officialBroadcast})}, {merge: true}).then(()  => {
      return true
    }).catch((error) => false);
    return response
  } else {
    return false
  }

  // return response
}

export const AddChatMessage = async ({isMod, message, episodeId, messageAuthor}) => {
  const chatId = getTimeEpoch();

  const result = await db.collection("episodes").doc(episodeId).collection('chat').doc(chatId).set({isMod, message, message_author: messageAuthor, chat_id:chatId, time_stamp: chatId }).then(() => { 
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


export const CheckIfRSSFeedIsInUse = async (rss_feed) => {
  const result = await db
      .collection("podcasts")
      .get()
      .then((querySnapshot) => {
        const podcasts = [];
        let rssFeedExists = false;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          if(rss_feed === data.rss_url) {
            rssFeedExists = true;
            podcasts.push(data);
          }
        });

        return {rssFeedExists: rssFeedExists, podcastData: podcasts[0]};
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        return false;
      })

  console.log(result)
  return result;
}


export const CreatePodcast = ({ title, description, image, authors, categories, lang, rss_url, official, itunes, explicit}) => {
  const podcastId = getTimeEpoch();

  return (dispatch) => {
    dispatch({
      type: CREATE_PODCAST,
      payload: { loading: true, podcast_created: true },
    });
    db.collection("podcasts")
      .doc(podcastId)
      .set({
        title: title,
        desc: description,
        image: image.url,
        authors: authors,
        explicit: explicit === 'yes' ? true : false,
        categories: categories,
        lang: lang,
        id: podcastId,
        mods: official ? [user.currentUser.uid] : [],
        banned_users: [],
        owner: official ? user.currentUser.uid : false,
        rss_url: rss_url,
        verified_ownership: false,
        official: official,
        official_email: itunes.owner.email,
        // episodes: allEpisodes
      })
      .then(() => {
        if(official) {
          db.collection("users")
            .doc(user.currentUser.uid)
            .set(
              {
                owned_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId),
                followed_podcasts: firebase.firestore.FieldValue.arrayUnion(podcastId),
              },
              { merge: true }
            );
        }

        if (official) {
          var formdata = new FormData();
          formdata.append("podcast_id", podcastId);
          // formdata.append("email", data.itunes.owner.email);
          formdata.append("email", "william_martinsson@hotmail.com");
          formdata.append("podcast_name", title);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(
            "http://radionight.receptsamlingen.website/sendmail",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }

        dispatch({
          type: CREATE_PODCAST,
          payload: { loading: false, podcast_created: true },
        });
      });
  };
};

export const AddOwnershipToPodcast = ({ title, description, image, authors, categories, rss_url, official, itunes, podcast_id}) => {

  return (dispatch) => {
    dispatch({
      type: CREATE_PODCAST,
      payload: { loading: true, podcast_created: true },
    });
    db.collection("podcasts")
      .doc(podcast_id)
      .set({
        title: title,
        desc: description,
        image: image.url,
        authors: authors,
        categories: categories,
        id: podcast_id,
        mods: official ? [user.currentUser.uid] : [],
        banned_users: [],
        owner: official ? user.currentUser.uid : false,
        rss_url: rss_url,
        verified_ownership: false,
        official: official,
        official_email: itunes.owner.email,
        // episodes: allEpisodes
      })
      .then(() => {
        if(official) {
          db.collection("users")
            .doc(user.currentUser.uid)
            .set(
              {
                owned_podcasts:
                  firebase.firestore.FieldValue.arrayUnion(podcast_id),
              },
              { merge: true }
            );
        }

        if (official) {
          var formdata = new FormData();
          formdata.append("podcast_id", podcast_id);
          // formdata.append("email", data.itunes.owner.email);
          formdata.append("email", "william_martinsson@hotmail.com");
          formdata.append("podcast_name", title);

          var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
          };

          fetch(
            "http://radionight.receptsamlingen.website/sendmail",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
        }

        dispatch({
          type: CREATE_PODCAST,
          payload: { loading: false, podcast_created: true },
        });
      });
  };
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

export const FetchYourCommunityPremieres = async () => {
  const result = await Promise.all(
   await db.collection("episodes").where("owner", "==", user.currentUser.uid).get().then((querySnapshot) => {

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
      });
      return [upcomingEpisodes, pastEpisodes, liveEpisodes];
    
   })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2]}
}

export const GetFollowedPremieres = async (followed_podcasts) => {
  const result = await Promise.all(
  await db.collection("episodes").where("podcast_id", "in", followed_podcasts)
    .get()
    .then((querySnapshot) => {
      const upcomingEpisodes = [];
      const pastEpisodes = [];
      const liveEpisodes = [];
      const liveOfficialEpisodes = [];
      const liveCommunityEpisodes = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = doc.data();

              if(data.episode_ended === true && data.official === true) {
                pastEpisodes.push({ ...data, episode_state: 'past' });
                // return 'past'
              } else if (data.stream_started.state === true && data.episode_ended !== true) {
                liveEpisodes.push({ ...data, episode_state: "live" });
                if(data.official === true) {
                  liveOfficialEpisodes.push({ ...data, episode_state: "live", official: true });
                } else {
                  liveCommunityEpisodes.push({ ...data, episode_state: "live", official: false });
                }
                // return 'live'
              } else {
                if(data.official === true) {
                  upcomingEpisodes.push({ ...data, episode_state: "upcoming" });
                }
                // return 'upcoming'
              }

            // const theEpisodeState = episodeState();
            // episodes.push({...data, episode_state: theEpisodeState});
        });
        return [upcomingEpisodes, pastEpisodes, liveEpisodes, liveOfficialEpisodes, liveCommunityEpisodes];
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    })
  )
  return {upcomingEpisodes: result[0], pastEpisodes: result[1], liveEpisodes: result[2], allEpisodes: [...result[0], ...result[1], ...result[2]], liveOfficialEpisodes: result[3], liveCommunityEpisodes: result[4]}
}

export const GetCurrentlyLiveEpisodes = async (followed_podcasts) => {
  const result = await Promise.all(
  await db.collection("episodes").where("podcast_id", "not-in", followed_podcasts.length > 0 ? followed_podcasts : ['3131231'])
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
              } else if (data.stream_started.state === true && data.episode_ended !== true) {
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
  
   const response = await fetch(file);
  const blob = await response.blob();
  // dispatch({type: UPLOAD_IMAGE, payload: {ImageUploaded: false}})
  var uploadedImage = storage.ref(userId).child(`${fileName}.jpg`);

  await uploadedImage.put(blob).then((snapshot) => {
  });

  return await storage.ref(userId).child(`${fileName}.jpg`).getDownloadURL().then(url => {
    return url
  })
};

export const UploadMp3File = async ({file, fileName}) => {
  const response = await fetch(file);
  const blob = await response.blob();
  // dispatch({type: UPLOAD_IMAGE, payload: {ImageUploaded: false}})
  var metadata = {
    contentType: "audio/mpeg",
  };
  
  // Upload the file and metadata
  var uploadTask = storage.ref(user.currentUser.uid).child(`${fileName}`);

  await uploadTask.put(blob, metadata).then((snapshot) => {});

  return await storage
    .ref(user.currentUser.uid)
    .child(`${fileName}`)
    .getDownloadURL()
    .then((url) => {
      return url;
    });
};

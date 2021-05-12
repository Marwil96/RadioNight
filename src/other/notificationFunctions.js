import * as Notifications from "expo-notifications";

export const PushRSSPlayer = async ({title, subtitle}) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Media Controls for ${title} 📻`,
      body: `${subtitle}`,
      categoryIdentifier: "rssplayer",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
};

export const PushStreamPlayer = async ({ title, subtitle }) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Media Controls for ${title} 📻`,
      body: `${subtitle}`,
      categoryIdentifier: "streamplayer",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
};


// export const pauseStreamNotification = async () => {
//   await Notifications.presentLocalNotificationAsync({
//     title: "...",
//     body: "...",
//     categoryId: "welcome",
//   });
// };

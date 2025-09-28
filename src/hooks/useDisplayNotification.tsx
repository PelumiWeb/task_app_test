import notifee from '@notifee/react-native';

export const useDisplayNotification = () => {
  async function onDisplayNotification(title: string, body: string) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        sound: 'default',
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return { onDisplayNotification };
};

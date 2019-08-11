import { AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

const KEY_DAILY_NOTIFICATION = "KEY_DAILY_NOTIFICATION";

const createNotificationBody = () => {
    return {
        title: "Remind your memory💡",
        body: "🥰 Hey! Don't forget to check this out!",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true
        }
    };
};

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(KEY_DAILY_NOTIFICATION).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
};

export const createNotification = () => {
    AsyncStorage.getItem(KEY_DAILY_NOTIFICATION)
        .then(JSON.parse)
        .then(data => {
            if (!data) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(
                    ({ status = "null" }) => {
                        if (status === Permissions.PermissionStatus.GRANTED) {
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(8);
                            tomorrow.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotificationBody(),
                                {
                                    time: tomorrow,
                                    repeat: "day"
                                }
                            );

                            AsyncStorage.setItem(
                                KEY_DAILY_NOTIFICATION,
                                JSON.stringify(true)
                            );
                        }
                    }
                );
            }
        });
};

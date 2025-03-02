import messaging from "@react-native-firebase/messaging";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider"; // 🔥 Import GlobalProvider

// 🔹 **Yêu cầu quyền nhận thông báo**
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  } catch (error) {
    console.error("❌ Error requesting permission:", error);
    return false;
  }
};

// 🔹 **Lấy FCM Token**
export const getFCMToken = async () => {
  try {
    return await messaging().getToken();
  } catch (error) {
    console.error("❌ Error fetching FCM token:", error);
    return null;
  }
};

// 🔹 **Hook để quản lý thông báo trong Context**
export const usePushNotifications = () => {
  const { addNotification } = useGlobalContext();

  useEffect(() => {
    // Nhận thông báo khi app đang mở (foreground)
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log("🔔 New foreground message:", remoteMessage);
      Alert.alert(
        "📩 New Notification",
        remoteMessage.notification?.body || "You have a new message!"
      );
      addNotification(remoteMessage); // 🔥 Lưu vào GlobalContext
    });

    // Xử lý khi người dùng nhấn vào thông báo lúc app đang chạy nền
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log("🔔 User clicked notification in background:", remoteMessage);
        if (remoteMessage) {
          addNotification(remoteMessage); // 🔥 Đảm bảo thông báo được lưu
          Alert.alert(
            "📩 Opened Notification",
            remoteMessage.notification?.body || "You have a new message!"
          );
        }
      }
    );

    // Xử lý khi app bị tắt hoàn toàn và người dùng mở lại từ thông báo
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("🚀 App opened from quit state via notification:", remoteMessage);
          addNotification(remoteMessage); // 🔥 Lưu thông báo khi app mở từ trạng thái bị tắt
          Alert.alert(
            "📩 Opened Notification",
            remoteMessage.notification?.body || "You have a new message!"
          );
        }
      })
      .catch((error) => console.error("❌ Error getting initial notification:", error));

    // Xử lý thông báo khi app đang chạy ở background hoặc bị kill
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("📩 Background Notification:", remoteMessage);
      addNotification(remoteMessage);
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };
  }, []);
};

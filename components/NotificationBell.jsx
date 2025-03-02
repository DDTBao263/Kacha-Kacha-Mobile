import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import {
  usePushNotifications,
  requestUserPermission,
  getFCMToken,
} from "../lib/usePushNoti";
import { icons } from "../constants";
import NotifiPost from "./NotifiPost";

const NotificationBell = () => {
  const [fcmToken, setFcmToken] = useState();
  const { notifications, addNotification } = useGlobalContext();
  const [panel, setPanel] = useState(false);

  // Animation hiệu ứng chấm đỏ nhấp nháy
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (notifications.length > 0) {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.5,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacityAnim, {
              toValue: 0.3,
              duration: 600,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    }
  }, [notifications.length]);

  usePushNotifications();
  useEffect(() => {
    const initializeFCM = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        const token = await getFCMToken();
        setFcmToken(token);
      }
    };
    initializeFCM();
  }, []);

  // Animation panel thông báo
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const togglePanel = () => {
    if (panel) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 250,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setPanel(false);
        addNotification("");
      });
    } else {
      setPanel(true);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

        
    }
  };

  return (
    <View>
      {/* Bell Icon */}
      <TouchableOpacity onPress={togglePanel} className="relative">
        <Image source={icons.bell} className="w-10 h-10" />

        {/* Dấu chấm đỏ nhấp nháy khi có thông báo */}
        {notifications.length > 0 && (
          <View className="absolute -top-1 right-1 w-3 h-3">
            <View className="absolute w-full h-full bg-red-500 rounded-full" />
            <Animated.View
              className="absolute w-full h-full bg-red-500 rounded-full"
              style={{
                transform: [{ scale: pulseAnim }],
                opacity: opacityAnim,
              }}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* Notification Modal */}
      <Modal
        visible={panel}
        transparent={true}
        animationType="fade"
        onRequestClose={togglePanel}
      >
        {panel && (
          <Pressable className="absolute inset-0 z-10" onPress={togglePanel}>
            <Animated.View
              className="absolute top-20 right-4 w-72 bg-white shadow-lg p-4 rounded-lg border border-gray-300 z-50 elevation-5"
              style={{
                transform: [{ translateY: slideAnim }],
                opacity: fadeAnim,
              }}
            >
              <Text className="text-lg font-bold mb-2">Notifications</Text>
              <ScrollView
                style={{ maxHeight: 150 }}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
              >
                {notifications.length === 0 ? (
                  <Text className="text-gray-500 text-center">
                    No new notifications
                  </Text>
                ) : (
                  notifications.map((item, index) => (
                    <NotifiPost
                      key={item.id || index}
                      id={item.id}
                      title={item.notification?.title}
                      mainReason={item.notification?.body}
                      dateTime={item.sentTime}
                    />
                  ))
                )}
              </ScrollView>
            </Animated.View>
          </Pressable>
        )}
      </Modal>
    </View>
  );
};

export default NotificationBell;

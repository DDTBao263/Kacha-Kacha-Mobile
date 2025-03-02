import { Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import dayjs from "dayjs";

const NotifiPost = ({ id, title, mainReason, dateTime }) => {
    // Chuyển đổi sentTime từ timestamp sang định dạng DD:MM:YYYY HH:mm
    const formattedTime = dateTime
    ? dayjs(dateTime).format("DD:MM:YYYY HH:mm")
    : "N/A";

  return (
    <LinearGradient
      colors={["#ffffff", "#f0f9ff"]} // Màu sáng hơn
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-lg shadow flex-row items-center z-10 border-b-2 border-gray-200 p-3"
    >
      {/* Icon thông báo */}
      <View className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Image source={icons.bell} className="w-7 h-7 tint-blue-500" resizeMode="contain" />
      </View>

      {/* Nội dung thông báo */}
      <View className="ml-4 flex-1">
        <Text className="font-semibold text-gray-900">{title}</Text>
        <Text 
          className="text-sm text-gray-700"
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {mainReason}
        </Text>
        <Text className="text-xs text-gray-500">{formattedTime}</Text>
      </View>
    </LinearGradient>
  );
};

export default NotifiPost;

import { Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

const NotifiPost = ({ id, title, mainReason, dateTime }) => {
  return (
    <LinearGradient
      colors={["#ffffff", "#f0f9ff"]} // Màu sáng hơn
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-lg p-3 mb-2 shadow-md flex-row items-center border border-gray-200"
    >
      {/* Icon thông báo */}
      <View className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
        <Image source={icons.bell} className="w-5 h-5 tint-blue-500" />
      </View>

      {/* Nội dung thông báo */}
      <View className="flex-1">
        <Text className="font-semibold text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-700">{mainReason}</Text>
        <Text className="text-xs text-gray-500">{dateTime}</Text>
      </View>
    </LinearGradient>
  );
};

export default NotifiPost;

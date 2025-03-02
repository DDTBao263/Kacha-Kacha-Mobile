
import { Text, View, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from "../constants";

const Event = ({ id, avatar, title, mainReason, dateTime }) => {
  return (
    <LinearGradient
      colors={parseInt(id) % 2 === 0 ? ["#c087e5", "#e02f73"] : ["#56CCF2", "#2F80ED"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        { borderRadius: 20 },
      ]}
      className="p-4 my-2 flex-row items-center rounded-lg w-[240px]"
    >
      <Image
        source={avatar}
        className="w-12 h-12 rounded-full mr-3"
        resizeMode="cover"
      />
      <View>
        <Text className="text-white font-bold text-base">{title}</Text>
        <Text className="text-white text-sm mt-1">{mainReason}</Text>
        <Text className="text-gray-300 text-xs mt-1">{dateTime}</Text>
      </View>
      <View className="ml-auto">
        <Image
          source={icons.birthday_cake}
          className="w-8 h-8"
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

export default Event;

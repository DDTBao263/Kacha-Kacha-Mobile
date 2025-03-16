import { Text, View, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { icons, images } from "../constants";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const Event = ({ id, avatar, title, mainReason, dateTime }) => {
  const formattedDate = dayjs(dateTime).utc().utcOffset(7).format('DD/MM/YYYY - HH:mm');

  return (
    <LinearGradient
      colors={parseInt(id) % 2 === 0 ? ["#c087e5", "#e02f73"] : ["#56CCF2", "#2F80ED"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ borderRadius: 20, overflow: 'hidden' }}
      className="p-4 my-2 flex-row items-center rounded-lg w-[240px] max-w-[240px]"
    >
      <Image
        source={images.profile}
        className="w-12 h-12 rounded-full mr-3"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text 
          className="text-white font-bold text-base truncate" 
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        <Text 
          className="text-white text-sm mt-1 truncate"
          numberOfLines={1} 
          ellipsizeMode="tail"
        >
          {mainReason}
        </Text>

        <Text className="text-gray-300 text-xs mt-1">
          {formattedDate}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Event;

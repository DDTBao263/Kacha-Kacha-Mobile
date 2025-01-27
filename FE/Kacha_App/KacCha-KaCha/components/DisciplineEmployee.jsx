import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DisciplineEmployee = ({ num, borderColor, textColor, title }) => {
  const formattedNum = num.toString().padStart(2, "0");
  
  return (
    <View className={`bg-red-100 border-t-2 ${borderColor} rounded-2xl p-4 w-48 h-20 flex`}>
      <Text className={`${textColor} text-2xl font-bold`}>{formattedNum}</Text>
      <Text className={`${textColor} text-sm font-medium`}>{title}</Text>
    </View>
  )
}

export default DisciplineEmployee
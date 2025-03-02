import React from "react";
import { Text, View } from "react-native";

const ShiftEmployee = ({ id, date, clockIn, clockOut, totalHrs, status }) => {
  return (
    <View className="border border-gray-300 p-4 mt-4 bg-white rounded-xl shadow-xl">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-gray-800">{date}</Text>

        <View
          className={`px-4 py-1 rounded-full ${
            status === "Present"
              ? "bg-green"
              : status === "Absent"
              ? "bg-red-500"
              : "bg-gray-400"
          }`}
        >
          <Text className="text-sm font-medium text-white">{status}</Text>
        </View>
      </View>

      <View className="flex flex-row justify-between">
        <View className="flex items-center">
          <Text className="text-sm font-medium text-gray-500">Clock In</Text>
          <Text className="text-green-600 text-lg font-bold">{clockIn}</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-sm font-medium text-gray-500">Clock Out</Text>
          <Text className="text-red-600 text-lg font-bold">{clockOut}</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-sm font-medium text-gray-500">Total Hrs</Text>
          <Text className="text-blue-600 text-lg font-bold">{totalHrs}</Text>
        </View>
      </View>
    </View>
  );
};

export default ShiftEmployee;

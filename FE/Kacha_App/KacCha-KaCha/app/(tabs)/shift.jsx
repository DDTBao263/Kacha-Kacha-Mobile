import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { ShiftEmployee } from "../../components";
import { icons } from "../../constants";

dayjs.extend(isoWeek);

const ShiftScreen = () => {
  const [shifts, setShifts] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("isoWeek")); 

  console.log("Week: ",currentWeek.format("ddd, DD MMM"))

  // Hàm tạo ca làm việc cho tuần
  const generateWeeklyShifts = (weekStartDate) => {
    const weekShifts = Array.from({ length: 7 }, (_, i) => {
      const currentDay = weekStartDate.add(i, "day");
      const isRestDay = currentDay.isoWeekday() === 7; 

      console.log("Day: ",currentDay.format("ddd, DD MMM"))

      return {
        id: i.toString(),
        date: currentDay.format("ddd, DD MMM"),
        clockIn: isRestDay ? "--:--" : "09:00",
        clockOut: isRestDay ? "--:--" : "18:00",
        totalHrs: isRestDay ? "--:--" : "9:00",
        status: isRestDay
          ? "Day Off"
          : Math.random() > 0.8 
          ? "Absent"
          : "Present",
      };
     
    });

   

    setShifts(weekShifts);
  };

  useEffect(() => {
    generateWeeklyShifts(currentWeek);
  }, [currentWeek]);

  const goToPreviousWeek = () => {
    setCurrentWeek((prev) => prev.subtract(1, "week"));
  };

  const goToNextWeek = () => {
    setCurrentWeek((prev) => prev.add(1, "week"));
  };

  return (
    <SafeAreaView className="bg-gray-50 flex-1">
      {/* Header */}
      <View className="bg-primary_1-100 py-4 px-5 rounded-b-xl shadow-lg">
        <Text className="text-white text-2xl font-bold">
          My Week's Shift
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between items-center bg-white px-5 py-3 mt-4 mx-4 rounded-lg shadow-md">
        <TouchableOpacity
          onPress={goToPreviousWeek}
          className="flex-row items-center gap-2"
        >
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-5 h-5"
          />
          <Text className="text-blue-600 font-semibold">Previous</Text>
        </TouchableOpacity>
        <Text className="text-gray-800 text-lg font-bold">
          {currentWeek.format("DD MMM")} -{" "}
          {currentWeek.add(6, "day").format("DD MMM")}
        </Text>
        <TouchableOpacity
          onPress={goToNextWeek}
          className="flex-row items-center gap-2"
        >
          <Text className="text-blue-600 font-semibold">Next</Text>
          <Image
            source={icons.leftArrow}
            resizeMode="contain"
            className="w-5 h-5 rotate-180"
          />
        </TouchableOpacity>
      </View>

      {/* Shift List */}
      <FlatList
        data={shifts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ShiftEmployee
            id={item.id}
            date={item.date}
            clockIn={item.clockIn}
            clockOut={item.clockOut}
            totalHrs={item.totalHrs}
            status={item.status}
          />
        )}
        className="mt-4 px-4"
        refreshControl={<RefreshControl refreshing={false} />}
      />

      {/* Footer */}
      <View className="bg-gray-200 p-4 mt-auto">
        <Text className="text-center text-gray-600">Rest Day: Sunday</Text>
      </View>
    </SafeAreaView>
  );
};

export default ShiftScreen;

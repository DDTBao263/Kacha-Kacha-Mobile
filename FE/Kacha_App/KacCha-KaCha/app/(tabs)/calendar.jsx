import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "Attendance", "Early Leave", "Late in", "Absents"];

  // Tạo danh sách ngày trong tháng hiện tại và lọc các ngày trong tương lai
  const today = dayjs();
  const daysInMonth = Array.from(
    { length: currentMonth.daysInMonth() },
    (_, i) => currentMonth.add(i, "day")
  )
    .filter((day) => day.isBefore(today, "day"))
    .reverse();

  // Chuyển sang tháng trước
  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  // Chuyển sang tháng sau
  const handleNextMonth = () => {
    if (currentMonth.isBefore(today.startOf("month"), "month")) {
      setCurrentMonth(currentMonth.add(1, "month"));
    }
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          padding: "10",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#3880ee",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text className="text-3xl font-medium text-white dark:text-white">
          My Attendance
        </Text>
      </View>
      {/* Navigation */}
      <View className="flex-row justify-around items-center p-4">
        <TouchableOpacity onPress={handlePrevMonth}>
          <Image
            source={icons.leftArrow}
            className="w-6 h-6"
            resizeMode="contain"
            tintColor={"#3880ee"}
          />
        </TouchableOpacity>
        <View className="flex-row items-center ">
          <Text className="text-lg text-primary_1 font-bold mr-4">
            {currentMonth.format("MMMM YYYY")}
          </Text>
          <Image
            source={icons.calendar}
            className="w-6 h-6"
            resizeMode="contain"
            tintColor={"#3880ee"}
          />
        </View>
        <TouchableOpacity
          onPress={handleNextMonth}
          disabled={!currentMonth.isBefore(today.startOf("month"), "month")}
        >
          <Image
            source={icons.rightArrow}
            className="w-6 h-6"
            resizeMode="contain"
            tintColor={
              currentMonth.isBefore(today.startOf("month"), "month")
                ? "#3880ee"
                : "#ccc"
            }
          />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View className="flex-row justify-around p-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                className={`mx-1 px-4 py-2 rounded-full border ${
                  selectedFilter === filter
                    ? "bg-white border-primary_1"
                    : "bg-white border-gray-100"
                }`}
              >
                <Text
                  className={`font-medium ${
                    selectedFilter === filter
                      ? "text-primary_1"
                      : "text-gray-100"
                  }`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Attendance List */}
      <FlatList
        data={daysInMonth}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: day, index }) => (
          <View
            key={index}
            className="bg-white p-4 m-2 rounded-lg shadow flex-col"
          >
            <View className="flex-row justify-between mt-4">
              <View className="rounded-[10] px-4 py-2 border flex justify-center items-center">
                <Text className="text-3xl font-bold text-gray-800">
                  {day.format("DD")}
                </Text>
                <Text className="text-gray-500">{day.format("ddd")}</Text>
              </View>
              <View className="flex justify-center items-center">
                <Image
                  source={icons.clock_in}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="text-gray-800 font-bold text-center">
                  09:00
                </Text>
                <Text className="text-gray-400">Clock In</Text>
              </View>
              <View className="flex justify-center items-center">
                <Image
                  source={icons.clock_out}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="text-gray-800 font-bold text-center">
                  06:00
                </Text>
                <Text className="text-gray-400">Clock Out</Text>
              </View>
              <View className="flex justify-center items-center">
                <Image
                  source={icons.total_hour}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="text-gray-800 font-bold text-center">
                  09:00
                </Text>
                <Text className="text-gray-400">Total hrs</Text>
              </View>
              <View className="justify-center items-center">
                <Text className="text-sm font-medium text-green-500">
                  Full Day
                </Text>
              </View>
            </View>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={false} />}
      />
    </SafeAreaView>
  );
};

export default Calendar;

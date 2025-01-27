import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, Event, DisciplineEmployee } from "../../components"; 
import { icons, images } from "../../constants";

const Home = () => {
  const [colorButton, setColorButton] = useState(["#3880ee", "#c087e5"]);
  const [able, setAble] = useState(false);
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [clockState, setClockState] = useState("Clock In");
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: "1",
      avatar: images.profile,
      title: "Happy Birthday 1",
      mainReason: "Neha Singh",
      dateTime: "March 22",
    },
    {
      id: "2",
      avatar: images.profile,
      title: "Happy Anniversary 2",
      mainReason: "John Doe",
      dateTime: "April 5",
    },
    {
      id: "3",
      avatar: images.profile,
      title: "Happy Anniversary 3",
      mainReason: "Thien Nguyen",
      dateTime: "October 14",
    },
    {
      id: "4",
      avatar: images.profile,
      title: "Happy Anniversary 4",
      mainReason: "An DHT",
      dateTime: "August 21",
    },
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClockState = () => {
    dayjs.extend(customParseFormat);
    if (clockState === "Clock In") {
      setClockIn(currentTime.format("HH:mm"));
      setClockState("Clock Out");
      setColorButton(["#c087e5", "#e02f73"]);
    } else if (clockState === "Clock Out") {
      const clockOutTime = currentTime.format("HH:mm");
      setClockOut(clockOutTime);
      if (clockIn) {
        const start = dayjs(clockIn, "HH:mm");
        const end = dayjs(clockOutTime, "HH:mm");
        const duration = end.diff(start, "minute");
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        const formatTime = (val) => String(val).padStart(2, "0");
        setTotalHours(`${formatTime(hours)}:${formatTime(minutes)}`);
        setColorButton(["#ccc", "#828282"]);
        setAble(true);
      } else {
        console.error("Clock In value is invalid.");
      }
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#161622" style="light" />

        {/* Personal Title */}
        <View className="bg-blue-500 h-44 p-6 w-full">
          <View className="flex-row items-center">
            <Image
              source={images.profile}
              className="w-20 h-20 rounded-full border-2 border-white"
              resizeMode="contain"
            />
            <View className="ml-4">
              <Text className="text-white text-base">Mr. Raman Kumar</Text>
              <Text className="text-white font-bold text-lg">
                Mark Your Attendance!
              </Text>
            </View>
          </View>
        </View>

        {/* CheckIn and CheckOut */}
        <View className="relative top-[-40px] bg-white w-11/12 mx-auto rounded-xl shadow-md">
          <View className="justify-center items-center p-5">
            <Text className="text-4xl font-bold text-black">
              {currentTime.format("hh:mm A")}
            </Text>
            <Text className="text-xl text-gray-500 mt-2">
              {currentTime.format("MMMM DD, YYYY - dddd")}
            </Text>
          </View>
          
          {/* Button Checkin Checkout */}
          <View className="mt-4 justify-center items-center">
            <CustomButton
              title={clockState}
              handlePress={handleClockState}
              containerStyles="w-40 h-40 justify-center items-center rounded-full"
              textStyles="text-white font-bold text-xl"
              gradientColors={colorButton}
              icon={icons.tap}
              isLoading={able}
              iconStyles="w-16 h-16"
            />
          </View>
          {/* Time CheckIn CheckOut */}
          <View className="w-11/12 mx-auto flex-row items-center justify-center gap-5 mt-3">
            <View className="w-[80px] flex-col gap-2 items-center justify-center">
              <Image
                source={icons.clock_in}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="font-psemibold text-xl">
                {clockIn === "" ? "--:--" : clockIn}
              </Text>
              <Text className="font-plight">Clock In</Text>
            </View>

            <View className="w-[80px] flex-col gap-2 items-center justify-center">
              <Image
                source={icons.clock_out}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="font-psemibold text-xl">
                {clockOut === "" ? "--:--" : clockOut}
              </Text>
              <Text className="font-plight">Clock Out</Text>
            </View>

            <View className="w-[80px] flex-col gap-2 items-center justify-center">
              <Image
                source={icons.total_hour}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="font-psemibold text-xl">
                {totalHours === "" ? "--:--" : totalHours}
              </Text>
              <Text className="font-plight">Total Hrs</Text>
            </View>
          </View>
        </View>

        {/* Information */}
        {/* Discipline Personal Employee */}
        <View className="w-11/12 mx-auto">
          <View className="flex gap-1 ml-4 mb-5">
            <Text className="font-pbold text-xl">Attendance</Text>
            <Text className="font-plight text-base">Current Month</Text>
          </View>

          <View className="flex-row flex-wrap gap-4 justify-center">
            <DisciplineEmployee
              num={8}
              title="Attendance"
              borderColor="border-[#297fbb]"
              textColor="text-[#297fbb]"
            />
            <DisciplineEmployee
              num={3}
              title="Leaves"
              borderColor="border-[#6c5de8]"
              textColor="text-[#6c5de8]"
            />
            <DisciplineEmployee
              num={4}
              title="Late In"
              borderColor="border-[#f52b2f]"
              textColor="text-[#f52b2f]"
              colorPrimary="f52b2f"
            />
            <DisciplineEmployee
              num={9}
              title="Early Leave"
              borderColor="border-[#ee922a]"
              textColor="text-[#ee922a]"
            />
          </View>
        </View>

        {/* Event Setups */}
        <View className="w-11/12 mx-auto mt-10">
          <View className="flex-row justify-between mb-2">
            <Text className="text-lg font-bold">Upcoming Events</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Event
                id={item.id}
                avatar={item.avatar}
                title={item.title}
                mainReason={item.mainReason}
                dateTime={item.dateTime}
              />
            )}
            horizontal
            ItemSeparatorComponent={() => <View className="w-2" />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

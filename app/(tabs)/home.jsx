import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  View,
  Text,
  Image,
  RefreshControl,
  FlatList,
} from "react-native";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CustomButton,
  Event,
  DisciplineEmployee,
  NotificationBell,
} from "../../components";
import { icons, images } from "../../constants";
import {
  apiGetCurrentHour,
  apiGetEvent,
  apiPostAttendance,
  apiGetShiftToday,
  apiPutAttendance,
  apiGetAttendanceToday,
} from "../../api";
import useApiAxios from "../../lib/useApiAxios";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useGlobalContext } from "../../context/GlobalProvider";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const Home = () => {
  const { user } = useGlobalContext();
  const { data: serverTime } = useApiAxios(apiGetCurrentHour);
  const { data: postApi } = useApiAxios(apiGetEvent);
  const { data: shiftToday } = useApiAxios(() =>
    apiGetShiftToday({ employee_id: user.employee_id })
  );

  const { data: attendanceToday } = useApiAxios(() =>
    apiGetAttendanceToday({ employee_id: user.employee_id })
  );

  // console.log(attendanceToday)

  const [colorButton, setColorButton] = useState(["#3880ee", "#c087e5"]);
  const [able, setAble] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    dayjs(serverTime).utc().utcOffset(7)
  );
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [clockState, setClockState] = useState("Clock In");
  const [refreshing, setRefreshing] = useState(false);

  const [formDataPost, setFormDataPost] = useState({
    employeeId: user.employee_id,
    checkIn: "",
    checkOut: "",
    breakTime: shiftToday?.breakDuration,
    note: "",
    date: shiftToday?.date,
    shiftId: shiftToday?.shiftId,
  });

  useEffect(() => {
    if (shiftToday) {
      setFormDataPost((prevData) => ({
        ...prevData,
        breakTime: shiftToday?.breakDuration,
        shiftId: shiftToday?.shiftId,
        date: shiftToday?.date,
      }));
    }
  }, [shiftToday]);

  useEffect(() => {
    if (attendanceToday?.CheckInTime && !attendanceToday?.CheckOutTime) {
      const checkInTime = dayjs(attendanceToday?.CheckInTime)
        .utc()
        .utcOffset(7);
      setClockIn(checkInTime.format("HH:mm"));
      setClockState("Clock Out");
    } else if (attendanceToday?.CheckOutTime && attendanceToday?.CheckInTime) {
      const checkInTime = dayjs(attendanceToday?.CheckInTime)
        .utc()
        .utcOffset(7);
      const checkOutTime = dayjs(attendanceToday?.CheckOutTime)
        .utc()
        .utcOffset(7);

      setClockIn(checkInTime.format("HH:mm"));
      setClockOut(checkOutTime.format("HH:mm"));

      const duration = checkOutTime.diff(checkInTime, "minute");

      if (duration < 0) {
        console.error("Invalid time duration detected.");
        return;
      }

      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      const formatTime = (val) => String(val).padStart(2, "0");

      setTotalHours(`${formatTime(hours)}:${formatTime(minutes)}`);
      setColorButton(["#ccc", "#828282"]);
      setAble(true);
    }
  }, [attendanceToday]);

  const [formDataPut, setFormDataPut] = useState({
    checkOut: `${(dayjs(currentTime).utc().utcOffset(7))}`,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  useEffect(() => {
    if (serverTime) {
      setCurrentTime(dayjs(serverTime).utc().utcOffset(7));
    }
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => prevTime.add(1, "second"));
    }, 1000);

    return () => clearInterval(timer);
  }, [serverTime]);

  const handleClockState = () => {
    const updatedTime = dayjs(currentTime).utc().utcOffset(7);
    if (clockState === "Clock In") {
      setClockIn(updatedTime.format("HH:mm"));
      setClockState("Clock Out");
      setColorButton(["#c087e5", "#e02f73"]);

      const updatedFormDataPost = {
        ...formDataPost,
        checkIn: updatedTime,
        date: shiftToday?.date,
      };

      const CallApiPostAttendance = async () => {
        const response = await apiPostAttendance({
          formData: updatedFormDataPost,
        });
      };
      CallApiPostAttendance();
    } else if (clockState === "Clock Out") {
      const clockOutTime = updatedTime.format("HH:mm");
      setClockOut(clockOutTime);

      const updatedFormDataPut = {
        ...formDataPut,
        checkOut: updatedTime,
      };

      const CallApiPutAttendance = async () => {
        const response = await apiPutAttendance({
          attendanceId: attendanceToday.AttendanceId,
          formData: updatedFormDataPut,
        });
      }; 
      CallApiPutAttendance();

      if (clockIn) {
        const start = dayjs(clockIn, "HH:mm");
        const end = dayjs(clockOutTime, "HH:mm");
        const duration = end.diff(start, "minute");

        if (duration < 0) {
          console.error("Invalid time duration detected.");
          return;
        }

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
    <SafeAreaView className="flex-1 bg-slate-100 z-10">
      <StatusBar backgroundColor="#161622" style="light" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        {/* Personal Title */}
        <View className="bg-blue-500 h-44 p-6 w-full">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={images.profile}
                className="w-20 h-20 rounded-full border-2 border-white"
                resizeMode="contain"
              />
              <View className="ml-4">
                <Text className="text-white text-base">Raman Kumar</Text>
                <Text className="text-white font-bold text-lg">
                  Mark Your Attendance!
                </Text>
              </View>
            </View>
            {/* Bell Notifications */}
            <NotificationBell />
          </View>
        </View>

        {/* Current Shifttoday */}
        <View className="relative top-[-40px] bg-white h-fit py-2 w-11/12 mx-auto rounded-xl shadow-md">
          <View className="flex-col">
            <Text className="ml-4 font-pbold text-xl">
              Shift Today - Shift A1
            </Text>
            <View>
              <View className="w-11/12 p-3 mx-auto flex-row items-center justify-center gap-5 mt-3 border border-gray-200 rounded-xl">
                <View className="w-[80px] flex-col items-center justify-center">
                  <Image
                    source={icons.clock_in}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                  <Text className="font-plight text-green">Clock In</Text>
                  <Text className="font-psemibold text-xl">
                    {dayjs(shiftToday?.startTime)
                      .utc()
                      .utcOffset(7)
                      .format("HH:mm")}
                  </Text>
                </View>

                <View className="w-[80px] flex-col items-center justify-center mx-3">
                  <Image
                    source={icons.clock_out}
                    className="w-10 h-10"
                    resizeMode="contain"
                  />
                  <Text className="font-plight text-red-600">Clock Out</Text>
                  <Text className="font-psemibold text-xl">
                    {dayjs(shiftToday?.endTime)
                      .utc()
                      .utcOffset(7)
                      .format("HH:mm")}
                  </Text>
                </View>

                <View className="w-[80px] flex-col items-center justify-center">
                  <Image
                    source={icons.coffee_break}
                    className="w-8 h-8 mb-2"
                    resizeMode="contain"
                  />
                  <Text className="font-plight text-blue-600">Breaktime</Text>
                  <Text className="font-psemibold text-xl">1:30</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* CheckIn and CheckOut */}
        <View className="bg-white w-11/12 mx-auto rounded-xl shadow-xl">
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
        <View className="w-11/12 mx-auto mt-3">
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
            data={postApi}
            keyExtractor={(item) => item.eventId}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <Event
                id={item.eventId}
                avatar={item.avatar}
                title={item.title}
                mainReason={item.content}
                dateTime={item.dateCreated}
              />
            )}
            horizontal
            ItemSeparatorComponent={() => <View className="w-2" />}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

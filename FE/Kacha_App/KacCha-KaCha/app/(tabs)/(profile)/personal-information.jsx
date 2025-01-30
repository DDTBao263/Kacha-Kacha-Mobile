import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";

const PersonalInformationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#e2e2e2]">
      <StatusBar backgroundColor="#161622" style="light" />
      <View>
        {/* Header */}
        <View className="px-10 bg-primary_1-100 h-[150px] pt-10">
          <TouchableOpacity
            className="flex-row items-center gap-3"
            onPress={() => navigation.goBack()}
          >
            <Image
              source={icons.leftArrow}
              className="w-5 h-5"
              resizeMode="contain"
              tintColor="white"
            />
            <Text className="text-lg text-white font-pbold">
              Personal Information
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card thông tin cá nhân */}
        <View className="relative top-[-70px] bg-white mx-5 mt-5 rounded-2xl shadow-lg p-5">
          <Text className="text-lg font-pbold mb-3">General Info</Text>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Full Name: <Text className="font-pregular">Raman Kumar</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300 mt-2">
            <Text className="font-psemibold">
              Phone Number: <Text className="font-pregular">087777xxxx</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300 mt-2">
            <Text className="font-psemibold">
              Email:{" "}
              <Text className="font-pregular">ThienntSE171341@fpt.edu.vn</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300 mt-2">
            <Text className="font-psemibold">
              Date of Birth: <Text className="font-pregular">14.10.2003</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300 mt-2">
            <Text className="font-psemibold">
              Address:{" "}
              <Text className="font-pregular">
                6, Street 6, Dai Phuc Residential Area
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;

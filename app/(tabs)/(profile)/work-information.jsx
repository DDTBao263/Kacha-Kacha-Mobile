import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../../constants";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";

const WorkInformationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-[#e2e2e2]">
      <StatusBar backgroundColor="#161622" style="light" />

      {/* Header */}
      <View className="px-6 bg-primary_1-100 h-[120px] pt-3 flex-row items-center justify-between">
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
          <Text className="text-lg text-white font-psemibold">
            Work Information
          </Text>
        </TouchableOpacity>
      </View>

      {/* Card Employee Information */}
      <View className="relative top-[-40px] bg-white mx-6 rounded-2xl shadow-xl p-6">
        <Text className="text-lg font-pbold mb-4">Company Info</Text>

        <View className="space-y-3">
          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Username: <Text className="font-pregular">KumanNR32</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Employee ID: <Text className="font-pregular">PZ102222</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Date of Joining: <Text className="font-pregular">14.11.2022</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Brand:{" "}
              <Text className="font-pregular">
                Kacha Kacha Hotpot, District 7 branch, Ton Dat Tien Street
              </Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Email:{" "}
              <Text className="font-pregular">ThienntSE171341@fpt.edu.vn</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Employee Contract Type: <Text className="font-pregular">Junior Staff</Text>
            </Text>
          </View>

          <View>
            <Text className="font-psemibold">
              Address:{" "}
              <Text className="font-pregular">
                13, Street Ton Dat Tien, District 7, Ward 13
              </Text>
            </Text>
          </View>
        </View>
      </View>

      {/* Bank Information */}
      <View className="bg-white mx-6 mt-2 rounded-2xl shadow-xl p-6">
        <Text className="text-lg font-pbold mb-4">Bank Info</Text>

        <View className="space-y-3">
          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Bank Name:{" "}
              <Text className="font-pregular">Vietnam International Bank</Text>
            </Text>
          </View>

          <View className="border-b pb-2 border-gray-300">
            <Text className="font-psemibold">
              Account Number: <Text className="font-pregular">1213123121122</Text>
            </Text>
          </View>

          <View>
            <Text className="font-psemibold">
              Account Holder: <Text className="font-pregular">Kuman Newman</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkInformationScreen;

import { View, Text, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { icons, images } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#e2e2e2]">
      <StatusBar backgroundColor="#005A9C" style="light" />

      {/* Header */}
      <View className="bg-primary_1-100 h-[230px] p-6 items-center rounded-b-2xl shadow-lg shadow-black-500">
        <Image source={images.profile} className="w-24 h-24 rounded-full border-4 border-white" />
        <Text className="text-xl font-bold text-white mt-3">Raman Kumar</Text>
        <Text className="text-md text-white opacity-80">Junior 3</Text>
      </View>

      {/* Stats */}
      <View className="relative top-[-40px] w-11/12 mx-auto bg-white rounded-2xl flex-row justify-around p-4 shadow-lg shadow-black-500">
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary_1-100">21</Text>
          <Text className="text-gray-600 text-center text-sm">Monthly {"\n"}Attendance</Text>
        </View>
        <View className="items-center border-l-2 border-r-2 border-gray-300 px-8">
          <Text className="text-2xl font-bold text-primary_1-100">2</Text>
          <Text className="text-gray-600 text-center text-sm">Monthly {"\n"}Leaves</Text>
        </View>
        <View className="items-center">
          <Text className="text-2xl font-bold text-primary_1-100">1</Text>
          <Text className="text-gray-600 text-center text-sm">Remaining {"\n"}Leaves</Text>
        </View>
      </View>

      {/* Menu */}
      <View className="w-11/12 mx-auto bg-white rounded-2xl shadow-lg">
        <Link href="/(profile)/personal-information" asChild>
          <TouchableOpacity className="p-5 border-b border-gray-200 flex-row items-center">
            <Image source={icons.user} className="w-6 h-6 mr-3" />
            <Text className="text-lg font-medium">Personal Information</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(profile)/work-information" asChild>
          <TouchableOpacity className="p-5 border-b border-gray-200 flex-row items-center">
            <Image source={icons.work} className="w-6 h-6 mr-3" />
            <Text className="text-lg font-medium">Work Information</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(profile)/change-password" asChild>
          <TouchableOpacity className="p-5 border-b border-gray-200 flex-row items-center">
            <Image source={icons.lock} className="w-6 h-6 mr-3" />
            <Text className="text-lg font-medium">Change Password</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sign-in" asChild>
          <TouchableOpacity className="p-5 flex-row items-center">
            <Image source={icons.logout} className="w-6 h-6 mr-3" />
            <Text className="text-lg font-medium text-red-500">Logout</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePasswordScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <StatusBar backgroundColor="#005A9C" style="light" />

      <Text className="text-xl font-bold mb-4">Change Password</Text>

      <TextInput className="border p-3 rounded mb-4" placeholder="Current Password" secureTextEntry />
      <TextInput className="border p-3 rounded mb-4" placeholder="New Password" secureTextEntry />
      <TextInput className="border p-3 rounded mb-4" placeholder="Confirm New Password" secureTextEntry />

      <TouchableOpacity className="bg-blue-500 p-3 rounded">
        <Text className="text-white text-center">Update Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

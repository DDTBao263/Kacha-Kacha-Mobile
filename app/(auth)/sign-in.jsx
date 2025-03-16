import { router } from "expo-router";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import { icons } from "../../constants";
import { CustomButton } from "../../components";
import { signInWithGoogle } from "../../lib/useGoogleFirebase";
import { requestUserPermission, getFCMToken } from "../../lib/usePushNoti";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [fcmToken, setFcmToken] = useState();
  const { setUser } = useGlobalContext();

  const handleGoogleSignIn = async () => {
    try {
      const userLogin = await signInWithGoogle();
      setUser(userLogin);

      router.replace("/home");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Alert.alert(
        "Error",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  useEffect(() => {
    const initializeFCM = async () => {
      const hasPermission = await requestUserPermission();
      if (hasPermission) {
        const token = await getFCMToken();
        setFcmToken(token);
        console.log("FCM Token: ", fcmToken);
      }
    };
    initializeFCM();
  });

  return (
    <SafeAreaView className="flex-1 bg-primary_1-200">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-6">
          <View className="flex-col items-center space-x-3 mb-6">
            <Image
              source={icons.hot_pot}
              className="w-40 h-40"
              resizeMode="contain"
            />
            <Text className="text-2xl font-semibold text-white mt-10">
              Kacha-Kacha Hot-pot
            </Text>
          </View>

          <CustomButton
            title="Sign In with Google"
            handlePress={handleGoogleSignIn}
            containerStyles="w-full bg-white flex-row items-center justify-center py-3 rounded-lg shadow-md active:bg-gray-200"
            textStyles="text-black text-lg font-medium"
            icon={icons.google}
            iconStyles="w-6 h-6 mr-3"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, Button } from "react-native";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import useGoogleFirebase from "../../lib/useGoogleFirebase"; // Import hook đăng nhập với Google

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const { user, signInWithGoogle } = useGoogleFirebase(); // Sử dụng hook Google login

  // Khi user đã đăng nhập, chuyển hướng về trang chủ
  if (user) {
    setUser(user);
    setIsLogged(true);
    router.replace("/home");
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Alert.alert("Success", "You are signed in with Google!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary_1-200 h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="flex-row items-center w-fit">
            <Image source={icons.hot_pot} resizeMode="contain" className="w-20 h-20" />
            <Text className="text-xl font-pregular text-white">
              Kacha-Kacha Hot-pot
            </Text>
          </View>

          <Text className="text-2xl text-white mt-10 font-psemibold">
            Log in to Kacha-Kacha
          </Text>

          <Button title="Sign In with Google" color="#4285F4" onPress={handleGoogleSignIn} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { icons } from "../constants";
import { images } from "../constants";
import { CustomButton } from "../components";
// import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  //   const { loading, isLogged } = useGlobalContext();

  //   if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary_1-200 h-full">
      <StatusBar backgroundColor="#161622" style="light" />
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="flex-row w-full justify-center items-center">
            <Image
              source={icons.hot_pot}
              className="w-[80px] h-[84px]"
              resizeMode="contain"
            />
            <Text className="w-[150px] text-white font-pregular text-2xl">Kacha kacha</Text>
          </View>

          <Image
            source={images.hot_pot_card}
            className="max-w-[380px] h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Welcome to Company{"\n"}
              Created by <Text className="text-secondary-200">Kacha Kacha</Text>
            </Text>
          </View>

          <CustomButton
            title="Continue with your account"
            handlePress={() => router.push("/home")}
            containerStyles="w-full mt-7 py-5 bg-white rounded-xl"
            textStyles="text-primary_1-100"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;

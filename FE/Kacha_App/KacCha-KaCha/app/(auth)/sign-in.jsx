import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images, icons } from "../../constants";
import { CustomButton, FormField } from "../../components";
// import { getCurrentUser, signIn } from "../../lib/appwrite";
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  // const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    employeeId: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      // await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
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
            <Image
              source={icons.hot_pot}
              resizeMode="contain"
              className="w-20 h-20"
            />
            <Text className="text-xl font-pregular text-white">
              Kacha-Kacha Hot-pot
            </Text>
          </View>

          <Text className="text-2xl text-white mt-10 font-psemibold">
            Log in to Kacha-Kacha
          </Text>

          <FormField
            title="Email"
            textStyles="text-white mt-2"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="EmployeeID"
            textStyles="text-white mt-2"
            value={form.employeeId}
            handleChangeText={(e) => setForm({ ...form, employeeId: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            textStyles="text-white mt-2"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7 rounded-xl py-3"
            // isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ProfileLayout = () => {

  return (
    <>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen 
          name="index" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="personal-information" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="change-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="work-information"
          options={{ headerShown: false }}
        />
      </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default ProfileLayout;

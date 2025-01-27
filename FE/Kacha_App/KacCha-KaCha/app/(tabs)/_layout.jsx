import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, styleSize }) => {
  return (
    <View className="flex items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-7 h-7 ${styleSize}`} // Tăng kích thước icon để rõ ràng hơn
      />
    </View>
  );
};

const TabLayout = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#007AFF", 
          tabBarInactiveTintColor: "#8E8E93", 
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F9F9F9", 
            borderTopWidth: 4,
            borderTopColor: "#E5E5EA", 
            height: 65, 
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon={icons.home}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="shift"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon={icons.shift}
                color={color}
                styleSize={"w-9 h-9"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon={icons.calendar}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="leave"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon={icons.time}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar style="dark" />
    </>
  );
};

export default TabLayout;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const leave = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />

      <View>
        <Text>leave</Text>
      </View>
    </SafeAreaView>
  );
};

export default leave;

const styles = StyleSheet.create({});

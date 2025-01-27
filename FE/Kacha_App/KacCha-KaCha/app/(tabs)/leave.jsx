import React, { useState } from "react";
import { Text, TouchableOpacity, View, FlatList, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FormLeave from "../../components/FormLeave";

const LeaveAnalytics = () => {
  const [activeTab, setActiveTab] = useState("Approvals");
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const chartData = [
    {
      name: "Medical Leave",
      population: 1,
      color: "#F0CA56",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Casual Leave",
      population: 2,
      color: "#5CCEF2",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Sick Leave",
      population: 3,
      color: "#c087e5",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Remaing Leave",
      population: 6,
      color: "#E0E0E0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  const approvalsData = [
    {
      id: "1",
      leaveType: "Medical Leave",
      applyDateFrom: "2023-10-01",
      applyDateTo: "2023-10-05",
      createDate: "2023-09-25",
      status: "Approved",
    },
    {
      id: "2",
      leaveType: "Sick Leave",
      applyDateFrom: "2023-10-05",
      applyDateTo: "2023-10-07",
      createDate: "2023-09-28",
      status: "Pending",
    },
    {
      id: "3",
      leaveType: "Casual Leave",
      applyDateFrom: "2023-10-10",
      applyDateTo: "2023-10-12",
      createDate: "2023-09-30",
      status: "Rejected",
    },
    {
      id: "4",
      leaveType: "Casual Leave",
      applyDateFrom: "2023-10-10",
      applyDateTo: "2023-10-12",
      createDate: "2023-09-30",
      status: "Rejected",
    },
    {
      id: "5",
      leaveType: "Casual Leave",
      applyDateFrom: "2023-10-10",
      applyDateTo: "2023-10-12",
      createDate: "2023-09-30",
      status: "Rejected",
    },
  ];

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-approved";
      case "Pending":
        return "bg-pending";
      case "Rejected":
        return "bg-rejected";
      default:
        return "bg-gray-100";
    }
  };

  const getLeaveTypeColor = (leaveType) => {
    switch (leaveType) {
      case "Medical Leave":
        return "#F0CA56";
      case "Sick Leave":
        return "#c087e5";
      case "Casual Leave":
        return "#5CCEF2";
      default:
        return "#BDBDBD";
    }
  };

  const approvedData = approvalsData.filter(
    (item) => item.status === "Approved"
  );

  return (
    <SafeAreaView className="bg-white dark:bg-primary flex-1">
    <StatusBar backgroundColor="#161622" style="light" />
      <View
        style={{
          flexDirection: "row",
          padding: "10",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#3880ee",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text className="text-3xl font-medium text-white dark:text-white">
          My Leave
        </Text>
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ddd",
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-outline" size={20} color="black" />
          <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
            Apply for leave
          </Text>
        </TouchableOpacity> */}
      </View>
      <View className="px-4 py-6 flex-1">
        <PieChart
          data={chartData}
          width={screenWidth - 40} // Adjust the width
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[0, 0]}
          absolute
        />
        {/* <View className="mt-4">
          {chartData.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between mb-2"
            >
              <View className="flex-row items-center">
                <View
                  style={{ backgroundColor: item.color }}
                  className="h-3 w-3 rounded-full mr-2"
                />
                <Text className="text-sm font-medium text-black dark:text-white">
                  {item.name}
                </Text>
              </View>
              <Text className="text-sm font-medium text-black dark:text-white">
                {item.population}%
              </Text>
            </View>
          ))}
        </View> */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              backgroundColor: activeTab === "Approvals" ? "#3880ee" : "#fff",
              borderRadius: 50,
            }}
            onPress={() => setActiveTab("Approvals")}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: activeTab === "Approvals" ? "white" : "black",
              }}
            >
              Approvals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              padding: 15,
              backgroundColor:
                activeTab === "Leave History" ? "#3880ee" : "#fff",
              borderRadius: 50,
            }}
            onPress={() => setActiveTab("Leave History")}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: activeTab === "Leave History" ? "white" : "black",
              }}
            >
              Leave History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={{ marginTop: 10, flex: 1 }}>
          {activeTab === "Approvals" ? (
            <FlatList
              data={approvalsData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  className={`flex-row mb-4 p-4 rounded-lg border-l border-b border-gray-300 p-4 justify-between`}
                >
                  <View className={`flex-1`}>
                    <View className="flex-row items-center">
                      <View
                        style={{
                          backgroundColor: getLeaveTypeColor(item.leaveType),
                        }}
                        className="h-3 w-3 rounded-full mr-2"
                      />
                      <Text className="text-lg font-bold text-black dark:text-white">
                        {item.leaveType}
                      </Text>
                    </View>
                    <Text className="text-sm font-medium text-black dark:text-white">
                      Applied from {item.applyDateFrom} to {item.applyDateTo}
                    </Text>
                    <Text className="text-sm font-medium text-black dark:text-white">
                      Create Date: {item.createDate}
                    </Text>
                  </View>
                  <View
                    className={`py-2 px-5 rounded-full self-center  ${getStatusBackgroundColor(
                      item.status
                    )}`}
                  >
                    <Text
                      className={`text-base font-bold text-white text-center`}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={approvedData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  className={`mb-4 p-4 rounded-lg border-l border-b border-gray-300 p-4`}
                >
                  <View className="flex-row items-center">
                    <View
                      style={{
                        backgroundColor: getLeaveTypeColor(item.leaveType),
                      }}
                      className="h-3 w-3 rounded-full mr-2"
                    />
                    <Text className="text-lg font-bold text-black dark:text-white">
                      {item.leaveType}
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-black dark:text-white">
                    Applied from {item.applyDateFrom} to {item.applyDateTo}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#ddd",
          padding: 15,
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={20} color="black" />
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
          Apply for leave
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
            }}
          >
            <FormLeave onClose={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LeaveAnalytics;

import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList, Modal, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FormLeave } from "../../components";
import { apiGetApplication } from "../../api";
import useApiAxios from "../../lib/useApiAxios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useGlobalContext } from "../../context/GlobalProvider";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const LeaveAnalytics = () => {
  const { user } = useGlobalContext();
  const { data: applicationss } = useApiAxios(() =>
    apiGetApplication({ employee_id: user.employee_id })
  );
  const [applications, setapplications] = useState(applicationss)
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("Approvals");
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const fetchApplications = async () => {
    setRefreshing(true);
    try {
      const applications = await apiGetApplication({ employee_id: user.employee_id });
      setapplications(applications.data)
    } catch (error) {
      console.error("Error fetching applications:", error);
      setapplications([])
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const generateChartData = (applications) => {
    const leaveTypeCounts = applications?.reduce((acc, app) => {
      acc[app.leaveType] = (acc[app.leaveType] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(leaveTypeCounts).map(([type, count]) => ({
      name: type,
      population: count,
      color:
        type === "MEDICAL_LEAVE"
          ? "#F0CA56"
          : type === "SICK_LEAVE"
          ? "#c087e5"
          : "#E0E0E0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));
  };

  const chartData = generateChartData(applications || []);

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-approved";
      case "PENDING":
        return "bg-pending";
      case "REJECTED":
        return "bg-rejected";
      default:
        return "bg-gray-100";
    }
  };

  const getLeaveTypeColor = (leaveType) => {
    switch (leaveType) {
      case "MEDICAL_LEAVE":
        return "#F0CA56";
      case "SICK_LEAVE":
        return "#c087e5";
      case "VACATION":
        return "#5CCEF2";
      default:
        return "#BDBDBD";
    }
  };

  const approvedData = applications?.filter(
    (item) => item.status === "APPROVED"
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
      </View>
      <View className="px-4 py-6 flex-1">
        <PieChart
          data={chartData}
          width={screenWidth - 40}
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
              data={applications}
              keyExtractor={(item) => item.applicationId}
              renderItem={({ item }) => (
                <View
                  className={`flex-row mb-4 p-4 rounded-lg border-l border-b border-gray-300 justify-between`}
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
                      Descripion: {item.description} {"\n"}
                      FROM{" "}
                      {`${dayjs(item.startDate)
                        .utc()
                        .utcOffset(7)
                        .format("DD/MM/YYYY HH:mm")}`}
                    </Text>
                    <Text className="text-sm font-medium text-black dark:text-white">
                      TO{" "}
                      {`${dayjs(item.endDate)
                        .utc()
                        .utcOffset(7)
                        .format("DD/MM/YYYY HH:mm")}`}
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
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchApplications} />}
            />
          ) : (
            <FlatList
              data={approvedData}
              keyExtractor={(item) => item.applicationId}
              renderItem={({ item }) => (
                <View
                  className={`mb-4 p-4 rounded-lg border-l border-b border-gray-300`}
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
                    Descripion: {item.description} {"\n"}
                    FROM{" "}
                    {`${dayjs(item.startDate)
                      .utc()
                      .utcOffset(7)
                      .format("DD/MM/YYYY HH:mm")}`}
                  </Text>
                  <Text className="text-sm font-medium text-black dark:text-white">
                    TO{" "}
                    {`${dayjs(item.endDate)
                      .utc()
                      .utcOffset(7)
                      .format("DD/MM/YYYY HH:mm")}`}
                  </Text>
                </View>
              )}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchApplications} />}
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

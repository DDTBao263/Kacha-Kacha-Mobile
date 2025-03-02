import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const FormLeave = ({ onClose }) => {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    onClose();
  };

  return (
    <ScrollView className="p-4 bg-white rounded-lg shadow">
      <Text className="text-xl font-bold text-gray-900 mb-4">
        Apply for Leave
      </Text>

      {/* Leave Type */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Leave Type</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-gray-900"
          value={leaveType}
          onChangeText={setLeaveType}
          placeholder="Enter leave type"
          placeholderTextColor="#9ca3af"
        />
      </View>

      {/* Leave From */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Leave From</Text>
        <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
          <View className="border border-gray-300 rounded-lg p-3 bg-gray-50">
            <Text className="text-gray-900">{startDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={handleStartDateChange}
          />
        )}
      </View>

      {/* Leave To */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">To</Text>
        <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
          <View className="border border-gray-300 rounded-lg p-3 bg-gray-50">
            <Text className="text-gray-900">{endDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={handleEndDateChange}
          />
        )}
      </View>

      {/* Buttons */}
      <View className="flex-row justify-between mt-6">
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex-1 bg-blue-500 py-3 rounded-lg mr-2"
        >
          <Text className="text-center text-white font-bold">Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 bg-gray-200 py-3 rounded-lg ml-2"
        >
          <Text className="text-center text-gray-700 font-bold">Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FormLeave;

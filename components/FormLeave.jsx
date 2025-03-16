import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { apiPostApplication } from "../api";
import { useGlobalContext } from "../context/GlobalProvider";

const FormLeave = ({ onClose }) => {
  const { user } = useGlobalContext();
  const [leaveType, setLeaveType] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: user.employee_id,
    applicationType: "",
    description: "",
    dateFrom: "",
    dateTo: "",
  });

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

  const handleSubmit = async () => {
    if (!leaveType) {
      alert("Please select a leave type.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }

    const updatedFormData = {
      applicationType: leaveType,
      description: description.trim(),
      dateFrom: startDate.toISOString(), 
      dateTo: endDate.toISOString(), 
    };

    try {
      const response = await apiPostApplication({
        employee_id: user.employee_id, 
        formData: updatedFormData,
      });
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("API error:", error.message);
      alert("Failed to submit application.");
    }

    onClose();
  };

  return (
    <ScrollView className="p-4 bg-white rounded-lg shadow">
      <Text className="text-xl font-bold text-gray-900 mb-4">
        Apply for Leave
      </Text>

      {/* Leave Type */}
      <View className="mb-4">
        <Text className="text-gray-600 font-medium mb-2">Leave Type</Text>
        <View className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
          <Picker
            selectedValue={leaveType}
            onValueChange={(value) => setLeaveType(value)}
            style={{ height: 50 }}
          >
            <Picker.Item label="Select Leave Type" value={null} />
            <Picker.Item label="Sick Leave" value="SICK_LEAVE" />
            <Picker.Item label="Medical Leave" value="MEDICAL_LEAVE" />
            <Picker.Item label="Vacation" value="VACATION" />
          </Picker>
        </View>
      </View>

      {/* Description Type */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 text-gray-900"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description"
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

import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
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
    <View className="p-5">
      <Text className="text-lg font-bold mb-2">Apply for Leave</Text>
      <Text style={{ marginBottom: 5 }}>Leave Type</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
        }}
        value={leaveType}
        onChangeText={setLeaveType}
        placeholder="Enter leave type"
      />
      <Text style={{ marginBottom: 5 }}>Leave From</Text>
      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 10,
          }}
          value={startDate.toDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      <Text style={{ marginBottom: 5 }}>To</Text>
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginBottom: 10,
          }}
          value={endDate.toDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
        />
      )}
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onClose} color="red" />
    </View>
  );
};

export default FormLeave;

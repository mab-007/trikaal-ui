import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileDetailScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  let handleEdit = () => {
    setIsEditing(true);
  };

  let handleSave = () => {
    setIsEditing(false);
  };

  let handleChangeName = (text) => {
  };

  let handleChangePhoneNumber = (text) => {
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Details</Text>
      {isEditing ? (
        <View>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value=''
            onChangeText={handleChangeName}
          />
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value=''
            onChangeText={handleChangePhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>Dummy</Text>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>Dummy Number</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  editButton: {
    fontSize: 18,
    color: 'blue',
  },
  saveButton: {
    fontSize: 18,
    color: 'green',
  },
});

export default ProfileDetailScreen;
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Profile from "../service/ProfileService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontFamily } from "../../GlobalStyles";

function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        showToast("error", "No authentication token found");
        return;
      }
      
      const response = await Profile(token);

      if (response.status === 200) {
        const userData = response.data; // Extract user data from the response
        setUser(userData); // Set user data
        showToast("success", "Profile fetched successfully");
      } else {
        showToast("error", "Failed to fetch profile");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "An error occurred while fetching profile");
    }
  };

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
    });
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.profileInfoContainer}>
          <Text style={styles.userInfo}>User ID: {user.id}</Text>
          <Text style={styles.userInfo}>User Name: {user.userName}</Text>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
          <Text style={styles.roleTitle}>Roles:</Text>
          <View style={styles.rolesContainer}>
            {user.roles.map((role) => (
              <Text key={role} style={styles.role}>
                {role}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
      <Toast autoHide={true} visibilityTime={2500} />
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileInfoContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width: "100%",
    alignItems: "flex-start",
  },
  userInfo: {
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: FontFamily.Arial, // Added Arial font
  },
  roleTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    fontFamily: FontFamily.Arial, // Added Arial font
  },
  rolesContainer: {
    marginLeft: 10,
  },
  role: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
    fontFamily: FontFamily.Arial, // Added Arial font
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    fontFamily: FontFamily.Arial, // Added Arial font
  },
});

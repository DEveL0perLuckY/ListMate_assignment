import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  Text,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message';

import { useAuth } from "../service/AuthContext";
import Login from "../service/LoginService";

const myToast = (type, title, message) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
  });
};

const SignInScreen = ({ navigation }) => {
  const { handleLogin } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const credentials = {
      userName: data.userName,
      password: data.password,
    };

    try {
      const response = await Login(credentials);
      if (response.data.token != null) {
        myToast("success", "Login Successful", "Success");
        await handleLogin(response.data.token);
        navigation.navigate('Tabs')
      } else {
        switch (response.data.message) {
          case "Invalid":
            myToast("error", "Invalid email or password", "Please try again");
            break;
          default:
            myToast("error", "Login Error", "Unknown error occurred");
            break;
        }
      }
    } catch (error) {
      myToast("error", "Error while logging in", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="User Name"
            placeholderTextColor={"gray"}
          />
        )}
        name="userName"
      />
      {errors.userName && (
        <Text style={styles.error}>User Name is required.</Text>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor={"gray"}

          />
        )}
        name="password"
      />
      {errors.password && (
        <Text style={styles.error}>Password is required.</Text>
      )}

      <View style={styles.checkboxContainer}>
        <Text style={{ color: "black" }}>Show Password</Text>
        <Switch
          value={showPassword}
          onValueChange={(value) => setShowPassword(value)}
          trackColor={{ false: "#ccc", true: "#4A90E2" }} // Track color when off and on
          thumbColor={showPassword ? "#007bff" : "#f4f3f4"} // Thumb color when on and off
        />
      </View>
      <TouchableOpacity
        style={[styles.button, isSubmitting && { backgroundColor: "#ccc" }]}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>


      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate("SignUp")}
      >
        Don't have an account? Sign Up
      </Text>
      {/* <Toast autoHide={true} visibilityTime={2500} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "#d9534f",
    marginBottom: 15,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  switchText: {
    fontSize: 14,
    color: "#007bff",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignInScreen;

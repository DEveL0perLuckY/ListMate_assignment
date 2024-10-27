import axios from "axios";

let BASE_URL = "http://192.168.29.104:9999";

// // Set the base URL based on the platform
// if (Platform.OS === "ios") {
//   // Localhost on iOS emulation
//   BASE_URL = "http://127.0.0.1:9999"; // or 'http://localhost:9999/api/sales'
// } else if (Platform.OS === "android") {
//   // Localhost on Android
//   BASE_URL = "http://10.0.2.2:9999"; // or 'http://localhost:9999/api/sales'
// } else {
//   // Default to specific IP addresses for local testing
//   BASE_URL = "http://10.0.2.2:9999"; // Android emulator
//   // BASE_URL = 'http://192.168.160.174:9999/api/sales'; // Specific IP for local network
// }

// // Use BASE_URL in your API requests

export const MYAXIOS = axios.create({
  baseURL: BASE_URL,
});

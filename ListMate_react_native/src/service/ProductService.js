// src/service/ProductService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MYAXIOS } from './Helper';

// Function to get the list of products
export const getProducts = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await MYAXIOS.get("/api/products/getProduct", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// Function to create a new product
export const createProduct = async (productData) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await MYAXIOS.post("/api/products", productData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// Function to delete a product by ID
export const deleteProduct = async (id) => {
  const token = await AsyncStorage.getItem("token");
  try {
    await MYAXIOS.delete(`/api/products/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return; 
  } catch (error) {
    throw error;
  }
};

// Function to update a product by ID
export const updateProduct = async (id, productData) => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await MYAXIOS.put(`/api/products/${id}`, productData, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

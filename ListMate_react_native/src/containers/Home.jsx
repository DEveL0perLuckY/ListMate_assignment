import React, { useEffect, useState, useCallback } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontFamily } from '../../GlobalStyles';
import { getProducts, deleteProduct } from '../service/ProductService';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productList = await getProducts();
      setProducts(productList);
      console.log('Fetched products:', productList);

      Toast.show({
        type: 'success',
        text1: 'Data Fetched',
        text2: 'Products were successfully fetched.',
      });
    } catch (error) {
      console.error('Error fetching products:', error);

      Toast.show({
        type: 'error',
        text1: 'Fetch Failed',
        text2: 'Failed to fetch products. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);

    Toast.show({
      type: 'info',
      text1: 'Refreshed',
      text2: 'Product list has been refreshed.',
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // Function to delete the product
  const handleDelete = async (productId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(productId);
              Toast.show({
                type: 'success',
                text1: 'Product Deleted',
                text2: 'The product was successfully deleted.',
              });
              await fetchProducts();
            } catch (error) {
              console.error('Error deleting product:', error);
              Toast.show({
                type: 'error',
                text1: 'Delete Failed',
                text2: 'Failed to delete the product. Please try again.',
              });
            }
          },
        },
      ]
    );
  };

  const handleUpdate = (product) => {
    navigation.navigate('Product', { product });
    Toast.show({
      type: 'info',
      text1: 'Update Product',
      text2: 'Navigating to product update page.',
    });
  };

  const handleAdd = () => {
    navigation.navigate('Product');
    Toast.show({
      type: 'info',
      text1: 'Add Product',
      text2: 'Navigating to add new product page.',
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00BFA6" style={styles.loadingIndicator} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#00BFA6']} />
        }
      >
        <View style={styles.header}>
          <Image style={styles.img} source={require('../assets/icon.png')} />
          <Text style={styles.title}>Welcome to List Mate</Text>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ Add New Product</Text>
        </TouchableOpacity>

        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productHeader}>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.actionIcons}>
                <TouchableOpacity onPress={() => handleUpdate(product)}>
                  <Ionicons name="create-outline" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(product.id)} style={styles.deleteIcon}>
                  <Ionicons name="trash-outline" size={24} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.productDescription}>{product.description}</Text>
            <View style={styles.productDetails}>
              <Text style={styles.productPrice}>${product.price}</Text>
              <Text style={styles.productCategory}>Category: {product.category}</Text>
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.text}>Status: {product.status}</Text>
              <Text style={styles.text}>In Stock: {product.quantityInStock}</Text>
              <Text style={styles.text}>Discount: {product.discount}%</Text>
              <Text style={styles.text}>Rating: {product.rating}</Text>
            </View>
            <Text style={styles.productTimestamp}>
              Added on: {new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              }).format(new Date(product.createdAt))}
            </Text>
            <Text style={styles.productTimestamp}>
              Last updated: {new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              }).format(new Date(product.updatedAt))}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F4F4F4',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  img: {
    width: 80,
    height: 80,
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontFamily: FontFamily.Arial,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4053',
  },
  actionIcons: {
    flexDirection: 'row',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27AE60',
  },
  productCategory: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  productInfo: {
    flexDirection: 'column',
    marginTop: 8,
  },
  productTimestamp: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 4,
    textAlign: 'right',
  },
  text: {
    color: 'gray',
  },
});

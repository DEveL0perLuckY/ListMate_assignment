import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { createProduct, updateProduct } from '../service/ProductService';

const Product = ({ route, navigation }) => {
  const { product } = route.params || {};
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price.toString());
      setValue('category', product.category);
      setValue('quantityInStock', product.quantityInStock.toString());
      setValue('status', product.status);
      setValue('discount', product.discount.toString());
      setValue('rating', product.rating.toString());
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    setLoading(true); 
    try {
      if (product) {
        await updateProduct(product.id, data);
        Toast.show({
          type: 'success',
          text1: 'Product Updated',
          text2: 'Product was updated successfully.',
        });
      } else {
        await createProduct(data);
        Toast.show({
          type: 'success',
          text1: 'Product Added',
          text2: 'Product was added successfully.',
        });
      }
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save product. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{product ? 'Edit Product' : 'Add Product'}</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: 'Product Name is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Product Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="description"
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholderTextColor={"gray"}
            placeholder="Enter Product Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
          />
        )}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}

      <Controller
        control={control}
        name="price"
        rules={{ required: 'Price is required', pattern: { value: /^\d+(\.\d+)?$/, message: 'Price must be a number' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Price"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}

      <Controller
        control={control}
        name="category"
        rules={{ required: 'Category is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Category"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}

      <Controller
        control={control}
        name="quantityInStock"
        rules={{ required: 'Quantity in stock is required', pattern: { value: /^\d+$/, message: 'Must be a whole number' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Quantity in Stock"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.quantityInStock && <Text style={styles.errorText}>{errors.quantityInStock.message}</Text>}

      <Controller
        control={control}
        name="status"
        rules={{ required: 'Status is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Status (e.g., Available, Out of Stock)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.status && <Text style={styles.errorText}>{errors.status.message}</Text>}

      <Controller
        control={control}
        name="discount"
        rules={{ required: 'Discount is required', pattern: { value: /^\d+(\.\d+)?$/, message: 'Discount must be a number' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Discount (%)"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.discount && <Text style={styles.errorText}>{errors.discount.message}</Text>}

      <Controller
        control={control}
        name="rating"
        rules={{ required: 'Rating is required', pattern: { value: /^[1-5]$/, message: 'Rating must be between 1 and 5' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={"gray"}
            placeholder="Enter Rating (1-5)"
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.rating && <Text style={styles.errorText}>{errors.rating.message}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading} // Disable the button when loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{product ? 'Update Product' : 'Add Product'}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#495057',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d9534f',
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#6c757d', // Gray color when disabled
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details by ID
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data); // Set product data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError('Error fetching product details');
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!product) {
    return <Text>No product found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Details Screen</Text>
      <Image style={styles.productImage} source={{ uri: product.thumbnail }} />
      <Text>{product.title}</Text>
      <Text>${product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => {/* Add product to cart logic */}} />
      <Button title="Go back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailsScreen;

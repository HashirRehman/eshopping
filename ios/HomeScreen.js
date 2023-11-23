// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import CartImage from '../assets/bag.png';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image style={styles.productImage} source={{ uri: item.thumbnail }} />
      <Text>{item.title}</Text>
      <Text>${item.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
      <Button
        title="View Details"
        onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
      />
    </View>
  );
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = selectedProducts.some((item) => item.id === product.id);

    if (!isProductInCart) {
      // If not in the cart, add it
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
      console.log('Product added to cart:', product);
    } else {
      console.log('Product is already in the cart');
    }
  };

  return (
    <View style={styles.container}>
      {/* Blue box */}
      <View style={styles.rectangle}>
        {/* Greeting and Cart Container */}
        <View style={styles.greetingCartContainer}>
          {/* Greeting Text */}
          <Text style={styles.greetingText}>Hey, Rahul</Text>

          {/* Cart Container with Navigation */}
          <TouchableWithoutFeedback onPress={() => { console.log('Cart Image Pressed'); navigation.navigate('Cart', { selectedProducts }); }}>
            <View style={styles.cartContainer}>
              {/* Cart Image */}
              <Image source={CartImage} style={styles.cartImage} />

              {/* Display cart count */}
              <Text style={styles.cartCountText}>{selectedProducts.length}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Inner rectangle */}
        <View style={styles.innerRectangle}>
          {/* Search Text */}
          <Text style={styles.searchText}>
            Search Products or store
          </Text>
        </View>

        {/* Delivery to Text */}
        <Text style={styles.deliveryToText}>
          Delivery to
        </Text>
        {/* Address Text */}
        <Text style={styles.AddressText}>
          Green Way 3000, Sylhet
        </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rectangle: {
    width: 376,
    height: 252,
    backgroundColor: 'rgba(43, 79, 163, 1)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Add this line to set the z-index
  },
  innerRectangle: {
    width: 335,
    height: 56,
    backgroundColor: 'rgba(8, 19, 46, 1)',
    borderRadius: 28,
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: [{ translateX: -167.5 }, { translateY: -28 }], // Adjust based on half of the width and height
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  greetingCartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  greetingText: {
    fontFamily: 'Manrope',
    fontSize: 22,
    fontWeight: '600',
    color: '#f7f7f8',
  },
  cartImage: {
    width: 18,
    height: 20,
  },
  productListContainer: {
    marginTop: 300, // Adjust this margin to position the product list below the blue box
    paddingHorizontal: 16,
  },
  productItem: {
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    zIndex: 0,
  },
  searchText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(136, 145, 166, 1)',
    marginLeft: 14, // Adjust as needed
  },
  deliveryToText: {
    fontFamily: 'Manrope',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.22,
    color: 'rgba(97, 125, 169, 1)',
    position: 'absolute',
    top: 180,  // Adjust this value to move it down
    left: 30,  // Adjust this value to move it left/right
  },
  AddressText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(97, 125, 169, 1)',
    position: 'absolute',
    top: 200,  // Adjust this value to move it down
    left: 30,  // Adjust this value to move it left/right
  },
  cartCountText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
    marginLeft: 8, // Adjust as needed
  },
});

export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CartScreen = ({ route }) => {
  const { selectedProducts } = route.params;

  const [quantities, setQuantities] = useState(
    selectedProducts.reduce((quantities, product) => {
      quantities[product.id] = 1; // Set default quantity to 1 for each product
      return quantities;
    }, {})
  );

  const incrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const decrementQuantity = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1), // Ensure quantity doesn't go below 1
    }));
  };

  const calculateSubtotal = (products, quantities) => {
    const subtotal = products.reduce((total, product) => {
      return total + product.price * quantities[product.id];
    }, 0);
    return subtotal.toFixed(2);
  };

  // Helper function to calculate total
  const calculateTotal = (products, quantities) => {
    const subtotal = calculateSubtotal(products, quantities);
    const deliveryFee = 2; // Fixed delivery fee
    const total = parseFloat(subtotal) + deliveryFee;
    return total.toFixed(2);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.cartHeader}>
        <Text style={styles.cartHeaderText}>Shopping Cart ({selectedProducts.length})</Text>
      </View>

      {/* Cart Items */}
      <View style={styles.cartItemsContainer}>
        {selectedProducts.map((product) => (
          <View key={product.id} style={styles.cartItem}>
            {/* Product Image */}
            <Image style={styles.productImage} source={{ uri: product.thumbnail }} />

            {/* Product Details */}
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{product.title}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
              <TouchableOpacity onPress={() => decrementQuantity(product.id)}>
                <Image source={require('../assets/Minus.png')} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantities[product.id]}</Text>
              <TouchableOpacity onPress={() => incrementQuantity(product.id)}>
                <Image source={require('../assets/Plus.png')} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Subtotal */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomLabel}>Subtotal</Text>
          {/* Calculate subtotal based on selected products and quantities */}
          <Text style={styles.bottomValue}>${calculateSubtotal(selectedProducts, quantities)}</Text>
        </View>

        {/* Delivery */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomLabel}>Delivery</Text>
          <Text style={styles.bottomValue}>$2</Text>
        </View>

        {/* Total */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomLabel}>Total</Text>
          {/* Calculate total (subtotal + delivery fee) */}
          <Text style={styles.bottomValue}>${calculateTotal(selectedProducts, quantities)}</Text>
        </View>

        {/* Proceed to Checkout Button */}
        <TouchableOpacity style={styles.proceedButton}>
          <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartHeader: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemsContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  bottomSection: {
    backgroundColor: '#f7f7f8',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bottomLabel: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#8c8c8e',
  },
  bottomValue: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#1b1b1e',
  },
  proceedButton: {
    backgroundColor: '#11337f',
    borderRadius: 20,
    paddingVertical: 12,
  },
  proceedButtonText: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CartScreen;

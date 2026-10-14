import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import { useWebSelection } from '../context/WebSelectionContext';
import { Ionicons } from '@expo/vector-icons';

type CartDropdownProps = {
  onClose: () => void;
  onCheckout: () => void;
};

export default function CartDropdown({
  onClose,
  onCheckout,
}: CartDropdownProps) {
  const {
    selection,
    increaseQuantity,
    decreaseQuantity,
    removeFromSelection,
    subtotal,
  } = useWebSelection();

  const serviceFee = subtotal * 0.10;
  const total = subtotal + serviceFee;

  return (
    <View style={styles.dropdownContainer}>
      <View style={styles.dropdown}>
        {/* Header */}
        <View style={styles.dropdownHeader}>
          <Text style={styles.dropdownTitle}>
            YOUR SELECTION
          </Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={20} color="#F5F1E8" />
          </Pressable>
        </View>

        {/* Items */}
        <ScrollView
          style={styles.itemsScroll}
          showsVerticalScrollIndicator={true}
        >
          {selection.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>
                Your selection is empty
              </Text>
            </View>
          ) : (
            selection.map(({ item, quantity }) => (
              <View key={item.id} style={styles.cartItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    R{item.price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.quantityControls}>
                  <Pressable
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantitySymbol}>−</Text>
                  </Pressable>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <Pressable
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantitySymbol}>+</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => removeFromSelection(item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="trash-outline" size={16} color="#D4AF37" />
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>

        {/* Summary */}
        {selection.length > 0 && (
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                R{subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service Fee (10%)</Text>
              <Text style={styles.summaryValue}>
                R{serviceFee.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalValue}>
                R{total.toFixed(2)}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                onClose();
                onCheckout();
              }}
              style={styles.checkoutButton}
            >
              <Text style={styles.checkoutButtonText}>
                PROCEED TO CHECKOUT
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#07130F"
                style={styles.checkoutArrow}
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 0,
    zIndex: 1000,
  },
  dropdown: {
    width: 380,
    maxHeight: 520,
    backgroundColor: '#0B100D',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)',
    backgroundColor: 'rgba(3, 10, 7, 0.95)',
  },
  dropdownTitle: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  closeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsScroll: {
    maxHeight: 320,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  emptyCart: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyCartText: {
    color: '#7D877F',
    fontSize: 13,
    letterSpacing: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(3, 10, 7, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.15)',
    borderRadius: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: '#F5F1E8',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#D4AF37',
    fontSize: 12,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantitySymbol: {
    color: '#D4AF37',
    fontSize: 16,
    lineHeight: 18,
  },
  quantity: {
    color: '#F5F1E8',
    fontSize: 13,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.2)',
    backgroundColor: 'rgba(3, 10, 7, 0.95)',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: '#A8B0AA',
    fontSize: 12,
  },
  summaryValue: {
    color: '#F5F1E8',
    fontSize: 12,
    fontWeight: '500',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  totalValue: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '700',
  },
  checkoutButton: {
    height: 48,
    backgroundColor: '#D4AF37',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonText: {
    color: '#07130F',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  checkoutArrow: {
    marginLeft: 10,
  },
});
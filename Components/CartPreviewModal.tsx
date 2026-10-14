import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from 'react-native';

import { MenuItem } from '../data/menuData';

type Props = {
  visible: boolean;
  onClose: () => void;
  selected: { [key: string]: number };
  menuItems: MenuItem[];
};

export default function CartPreviewModal({
  visible,
  onClose,
  selected,
  menuItems,
}: Props) {
  const selectedItems = menuItems.filter(
    item => selected[item.name]
  );

  const totalItems = Object.values(selected).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const subtotal = selectedItems.reduce(
    (total, item) =>
      total +
      item.price * selected[item.name],
    0
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        <View style={styles.modalCard}>

          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>
                Your Selection
              </Text>

              <Text style={styles.subtitle}>
                {totalItems}{' '}
                {totalItems === 1
                  ? 'item'
                  : 'items'} selected
              </Text>
            </View>
          </View>

          {/* ITEMS */}
          <ScrollView
            style={styles.itemsScroll}
            showsVerticalScrollIndicator={false}
          >
            {selectedItems.map(item => (
              <View
                key={item.id}
                style={styles.itemCard}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                />

                <View style={styles.itemInfo}>
                  <Text
                    style={styles.itemName}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text style={styles.itemPrice}>
                    R{item.price.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.quantityBadge}>
                  <Text style={styles.quantityText}>
                    ×{selected[item.name]}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* TOTAL */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Subtotal
            </Text>

            <Text style={styles.total}>
              R{subtotal.toFixed(2)}
            </Text>
          </View>

          {/* CLOSE */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              CLOSE CART
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  /* ==========================================================
     CHRISTOFFEL CART OVERLAY
  ========================================================== */

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  /* ==========================================================
     CART CARD
  ========================================================== */

  modalCard: {
    backgroundColor: '#0B100D',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#5A512D',
    padding: 18,
    maxHeight: '75%',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 15,
  },

  /* ==========================================================
     HEADER
  ========================================================== */

  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#30352F',
  },

  title: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: '400',
    letterSpacing: 0.2,
  },

  subtitle: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: 13,
    marginTop: 5,
  },

  /* ==========================================================
     ITEMS
  ========================================================== */

  itemsScroll: {
    marginTop: 14,
  },

  itemCard: {
    height: 72,
    backgroundColor: '#151D18',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#303B33',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 10,
  },

  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },

  itemName: {
    color: '#F5F1E8',
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '500',
  },

  itemPrice: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: 12,
    marginTop: 5,
  },

  /* ==========================================================
     QUANTITY
  ========================================================== */

  quantityBadge: {
    minWidth: 46,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 9,
  },

  quantityText: {
    color: '#080B09',
    fontSize: 13,
    fontWeight: '700',
  },

  /* ==========================================================
     TOTAL
  ========================================================== */

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#30352F',
    marginTop: 5,
    paddingTop: 16,
  },

  totalLabel: {
    color: '#C8C4BA',
    fontFamily: 'serif',
    fontSize: 14,
  },

  total: {
    color: '#D4AF37',
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '600',
  },

  /* ==========================================================
     CLOSE CART
  ========================================================== */

  closeButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  closeText: {
    color: '#080B09',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.3,
  },

});
import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useWebSelection } from '../context/WebSelectionContext';

const backgroundImage = require('../../assets/christoffel-background.png');

type SelectionWebProps = {
  onHome?: () => void;
  onStarters?: () => void;
  onMains?: () => void;
  onDesserts?: () => void;
  onDrinks?: () => void;
};

export default function SelectionWeb({
  onHome,
  onStarters,
  onMains,
  onDesserts,
  onDrinks,
}: SelectionWebProps) {
  const {
    selection,
    increaseQuantity,
    decreaseQuantity,
    removeFromSelection,
    totalItems,
  } = useWebSelection();

  const totalPrice = selection.reduce(
    (total, selectionItem) =>
      total +
      selectionItem.item.price * selectionItem.quantity,
    0
  );

  const clearAll = () => {
    selection.forEach(selectionItem => {
      removeFromSelection(selectionItem.item.id);
    });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={true}
      >
        {/* ============================================================
            CHRISTOFFEL HEADER
        ============================================================ */}
        <View style={styles.header}>
          <Pressable
            onPress={onHome}
            style={styles.logoContainer}
          >
            <Text style={styles.logoIcon}>♨</Text>

            <View>
              <Text style={styles.logoText}>
                CHRISTOFFEL
              </Text>

              <View style={styles.menuLogoRow}>
                <View style={styles.logoLine} />
                <Text style={styles.menuText}>MENU</Text>
                <View style={styles.logoLine} />
              </View>
            </View>
          </Pressable>

          <View style={styles.navigation}>
            <Pressable onPress={onHome}>
              <Text style={styles.navItem}>HOME</Text>
            </Pressable>

            <Pressable onPress={onStarters}>
              <Text style={styles.navItem}>STARTERS</Text>
            </Pressable>

            <Pressable onPress={onMains}>
              <Text style={styles.navItem}>MAINS</Text>
            </Pressable>

            <Pressable onPress={onDesserts}>
              <Text style={styles.navItem}>DESSERTS</Text>
            </Pressable>

            <Pressable onPress={onDrinks}>
              <Text style={styles.navItem}>DRINKS</Text>
            </Pressable>

            <Text style={[styles.navItem, styles.activeNav]}>
              SELECTION
            </Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.cartIcon}>🛒</Text>

            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {totalItems}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* ============================================================
            SELECTION CONTENT
        ============================================================ */}
        <View style={styles.selectionSection}>
          <Text style={styles.eyebrow}>
            CHRISTOFFEL MENU
          </Text>

          <Text style={styles.title}>
            Your Selection
          </Text>

          <Text style={styles.subtitle}>
            Review everything you've selected before continuing.
          </Text>

          <View style={styles.divider} />

          {selection.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>
                Your selection is empty
              </Text>

              <Text style={styles.emptyText}>
                Add something delicious from our menu to get started.
              </Text>

              <Pressable
                onPress={onStarters}
                style={styles.primaryButton}
              >
                <Text style={styles.primaryButtonText}>
                  EXPLORE MENU →
                </Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.selectionLayout}>
              <View style={styles.itemsColumn}>
                {selection.map(selectionItem => {
                  const { item, quantity } = selectionItem;
                  const itemTotal =
                    item.price * quantity;

                  return (
                    <View
                      key={item.id}
                      style={styles.itemCard}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.itemImage}
                      />

                      <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>
                          {item.name}
                        </Text>

                        <Text style={styles.itemDescription}>
                          {item.description}
                        </Text>

                        <Text style={styles.unitPrice}>
                          R{item.price.toFixed(2)} each
                        </Text>
                      </View>

                      <View style={styles.itemActions}>
                        <Text style={styles.itemTotal}>
                          R{itemTotal.toFixed(2)}
                        </Text>

                        <View style={styles.quantityRow}>
                          <Pressable
                            onPress={() =>
                              decreaseQuantity(item.id)
                            }
                            style={styles.quantityButton}
                          >
                            <Text style={styles.quantitySymbol}>
                              −
                            </Text>
                          </Pressable>

                          <Text style={styles.quantity}>
                            {quantity}
                          </Text>

                          <Pressable
                            onPress={() =>
                              increaseQuantity(item.id)
                            }
                            style={styles.quantityButton}
                          >
                            <Text style={styles.quantitySymbol}>
                              +
                            </Text>
                          </Pressable>

                          <Pressable
                            onPress={() =>
                              removeFromSelection(item.id)
                            }
                            style={styles.removeButton}
                          >
                            <Text style={styles.removeText}>
                              ×
                            </Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>
                  ORDER SUMMARY
                </Text>

                <View style={styles.summaryLine}>
                  <Text style={styles.summaryLabel}>
                    Items
                  </Text>

                  <Text style={styles.summaryValue}>
                    {totalItems}
                  </Text>
                </View>

                <View style={styles.summaryDivider} />

                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>
                    TOTAL
                  </Text>

                  <Text style={styles.totalValue}>
                    R{totalPrice.toFixed(2)}
                  </Text>
                </View>

                <Pressable
                  onPress={clearAll}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>
                    CLEAR ALL
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {/* ============================================================
            CHRISTOFFEL FOOTER
        ============================================================ */}
        <View style={styles.footer}>
          <View style={styles.footerMain}>
            <View style={styles.footerBrand}>
              <View style={styles.footerLogoRow}>
                <Text style={styles.footerLogoIcon}>♨</Text>

                <View>
                  <Text style={styles.footerLogoText}>
                    CHRISTOFFEL
                  </Text>

                  <View style={styles.footerMenuRow}>
                    <View style={styles.footerLogoLine} />
                    <Text style={styles.footerMenuText}>
                      MENU
                    </Text>
                    <View style={styles.footerLogoLine} />
                  </View>
                </View>
              </View>

              <Text style={styles.footerTagline}>
                GOOD FOOD • GREAT PEOPLE • ALWAYS HERE
              </Text>

              <Text style={styles.footerDescription}>
                At Christoffel, we believe great food brings
                people together. Fresh ingredients, incredible
                flavours, and a warm atmosphere — every visit
                feels like home.
              </Text>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerTitle}>
                QUICK LINKS
              </Text>

              <Pressable onPress={onHome}>
                <Text style={styles.footerLink}>Home</Text>
              </Pressable>

              <Pressable onPress={onStarters}>
                <Text style={styles.footerLink}>Starters</Text>
              </Pressable>

              <Pressable onPress={onMains}>
                <Text style={styles.footerLink}>Mains</Text>
              </Pressable>

              <Pressable onPress={onDesserts}>
                <Text style={styles.footerLink}>Desserts</Text>
              </Pressable>

              <Pressable onPress={onDrinks}>
                <Text style={styles.footerLink}>Drinks</Text>
              </Pressable>

              <Text style={styles.footerLink}>My Orders</Text>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerTitle}>
                CONTACT US
              </Text>

              <Text style={styles.contactText}>
                123 Restaurant Street
              </Text>

              <Text style={styles.contactText}>
                Durban, KZN 4001
              </Text>

              <Text style={styles.contactText}>
                South Africa
              </Text>

              <Text style={styles.contactText}>
                +27 31 123 4567
              </Text>

              <Text style={styles.contactText}>
                info@christoffel.co.za
              </Text>
            </View>

            <View style={styles.footerColumn}>
              <Text style={styles.footerTitle}>
                OPENING HOURS
              </Text>

              <Text style={styles.contactText}>
                Mon - Thu  10:00 - 22:00
              </Text>

              <Text style={styles.contactText}>
                Fri - Sat  10:00 - 23:00
              </Text>

              <Text style={styles.contactText}>
                Sunday    10:00 - 21:00
              </Text>
            </View>
          </View>

          <View style={styles.footerDivider} />

          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>
              © 2026 Christoffel. All rights reserved.
            </Text>

            <Text style={styles.footerBottomTagline}>
              GOOD FOOD • GREAT PEOPLE • ALWAYS HERE
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 700,
    backgroundColor: '#07130F',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(3, 12, 8, 0.72)',
  },

  scrollView: {
    flex: 1,
  },

  pageContent: {
    paddingBottom: 0,
  },

  header: {
    height: 82,
    paddingHorizontal: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(3, 10, 7, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.18)',
    zIndex: 100,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
  },

  logoIcon: {
    fontSize: 38,
    color: '#D4AF37',
    marginRight: 17,
  },

  logoText: {
    fontSize: 21,
    fontWeight: '400',
    letterSpacing: 4,
    color: '#F5F1E8',
  },

  menuLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },

  logoLine: {
    width: 34,
    height: 1,
    backgroundColor: '#D4AF37',
    opacity: 0.8,
  },

  menuText: {
    marginHorizontal: 10,
    fontSize: 9,
    letterSpacing: 3,
    color: '#D4AF37',
  },

  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
  },

  navItem: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 1.4,
    color: '#F5F1E8',
  },

  activeNav: {
    color: '#D4AF37',
  },

  headerRight: {
    width: 120,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'relative',
  },

  cartIcon: {
    fontSize: 22,
    color: '#F5F1E8',
  },

  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartBadgeText: {
    color: '#07130F',
    fontSize: 10,
    fontWeight: '700',
  },

  selectionSection: {
    width: '100%',
    maxWidth: 1250,
    alignSelf: 'center',
    paddingHorizontal: 70,
    paddingVertical: 90,
    minHeight: 650,
  },

  eyebrow: {
    color: '#D4AF37',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 16,
  },

  title: {
    color: '#F5F1E8',
    fontSize: 52,
    fontWeight: '400',
  },

  subtitle: {
    color: '#C0C5C0',
    fontSize: 16,
    marginTop: 10,
    lineHeight: 25,
  },

  divider: {
    width: 80,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 35,
  },

  selectionLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 28,
  },

  itemsColumn: {
    flex: 1,
    gap: 14,
  },

  itemCard: {
    minHeight: 145,
    padding: 15,
    backgroundColor: 'rgba(3, 12, 8, 0.88)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  itemImage: {
    width: 120,
    height: 110,
    borderRadius: 4,
  },

  itemInfo: {
    flex: 1,
  },

  itemName: {
    color: '#F5F1E8',
    fontSize: 21,
    fontWeight: '500',
  },

  itemDescription: {
    color: '#AEB6AF',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
    maxWidth: 500,
  },

  unitPrice: {
    color: '#D4AF37',
    fontSize: 13,
    marginTop: 10,
  },

  itemActions: {
    alignItems: 'flex-end',
    minWidth: 170,
  },

  itemTotal: {
    color: '#D4AF37',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantitySymbol: {
    color: '#D4AF37',
    fontSize: 20,
  },

  quantity: {
    width: 38,
    textAlign: 'center',
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '600',
  },

  removeButton: {
    width: 34,
    height: 34,
    marginLeft: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeText: {
    color: '#D4AF37',
    fontSize: 23,
    lineHeight: 25,
  },

  summaryBox: {
    width: 330,
    padding: 28,
    backgroundColor: 'rgba(3, 10, 7, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.35)',
  },

  summaryTitle: {
    color: '#D4AF37',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: 25,
  },

  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryLabel: {
    color: '#BFC5BF',
    fontSize: 14,
  },

  summaryValue: {
    color: '#F5F1E8',
    fontSize: 14,
    fontWeight: '600',
  },

  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    marginVertical: 22,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    color: '#F5F1E8',
    fontSize: 15,
    letterSpacing: 1.5,
    fontWeight: '700',
  },

  totalValue: {
    color: '#D4AF37',
    fontSize: 25,
    fontWeight: '700',
  },

  clearButton: {
    height: 48,
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearButtonText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  emptyBox: {
    minHeight: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(3, 12, 8, 0.82)',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.25)',
    padding: 50,
  },

  emptyTitle: {
    color: '#F5F1E8',
    fontSize: 28,
    fontWeight: '400',
  },

  emptyText: {
    color: '#AEB6AF',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  },

  primaryButton: {
    marginTop: 25,
    minWidth: 190,
    height: 48,
    backgroundColor: '#D4AF37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#07130F',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.3,
  },

  footer: {
    backgroundColor: '#020805',
    borderTopWidth: 1,
    borderTopColor: 'rgba(212, 175, 55, 0.18)',
  },

  footerMain: {
    paddingHorizontal: 70,
    paddingVertical: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 55,
  },

  footerBrand: {
    flex: 1.5,
    maxWidth: 420,
  },

  footerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerLogoIcon: {
    color: '#D4AF37',
    fontSize: 32,
    marginRight: 13,
  },

  footerLogoText: {
    color: '#F5F1E8',
    fontSize: 20,
    letterSpacing: 4,
  },

  footerMenuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },

  footerLogoLine: {
    width: 28,
    height: 1,
    backgroundColor: '#D4AF37',
  },

  footerMenuText: {
    color: '#D4AF37',
    fontSize: 8,
    letterSpacing: 3,
    marginHorizontal: 8,
  },

  footerTagline: {
    color: '#D4AF37',
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 22,
  },

  footerDescription: {
    color: '#858E87',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 15,
  },

  footerColumn: {
    flex: 1,
  },

  footerTitle: {
    color: '#D4AF37',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 17,
  },

  footerLink: {
    color: '#AEB5AF',
    fontSize: 12,
    marginBottom: 11,
  },

  contactText: {
    color: '#AEB5AF',
    fontSize: 12,
    lineHeight: 22,
    marginBottom: 4,
  },

  footerDivider: {
    height: 1,
    marginHorizontal: 70,
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
  },

  footerBottom: {
    minHeight: 70,
    paddingHorizontal: 70,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  copyright: {
    color: '#7E8780',
    fontSize: 11,
  },

  footerBottomTagline: {
    color: '#7E8780',
    fontSize: 9,
    letterSpacing: 2,
  },
});
